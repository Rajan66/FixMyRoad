const Report = require("../models/report");
const Cluster = require("../models/cluster");
const { validationResult } = require("express-validator");

exports.createReport = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        var {
            image,
            description,
            severity,
            sliderValue,
            location,
            address,
            yesVotes,
            noVotes,
            totalVotes,
        } = req.body;
        const user = req.auth._id;
        if (![1, 2, 3].includes(sliderValue)) {
            return res.status(400).json({
                error: "Invalid slider value. It must be 1 (Minor), 2 (Moderate), or 3 (Severe).",
            });
        }

        severity = mapSliderToSeverity(sliderValue);

        if (location) {
            if (!location.coordinates || location.coordinates.length !== 2) {
                return res.status(400).json({ error: "Invalid location format" });
            }
            if (!location.type || location.type !== "Point") {
                return res.status(400).json({ error: "Location type must be 'Point'" });
            }
        }

        isValid = isValidVote(yesVotes, noVotes);
        totalVotes = yesVotes + noVotes;
        const newReport = new Report({
            user,
            image,
            description,
            severity,
            location,
            address,
            totalVotes,
            yesVotes,
            noVotes,
            isValid,
        });

        const savedReport = await newReport.save();

        // await this.createOrUpdateCluster(savedReport, req, res);

        res.status(201).json({
            message: "Report created successfully",
            report: savedReport,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message || "Failed to create report" });
    }
};

exports.getReportById = async(req, res) => {
    try {
        const { reportId } = req.params;
        const report = await Report.findById(reportId).populate(
            "user",
            "name email"
        );

        if (!report) {
            return res.status(404).json({ error: "Report not found" });
        }

        res.status(200).json(report);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message || "Failed to retrieve report" });
    }
};

exports.getAllReports = async(req, res) => {
    try {
        const reports = await Report.find().populate("user", "name email");
        res.status(200).json(reports);
    } catch (err) {
        console.log(err);
        res
            .status(500)
            .json({ error: err.message || "Failed to retrieve reports" });
    }
};

// TODO giving issues idk why
exports.getReportsByAddress = async(req, res) => {
    try {
        const { area } = req.query;

        const addressFilters = {};

        if (area) addressFilters["address.area"] = area;
        addressFilters["address.city"] = "Kathmandu";
        addressFilters["address.country"] = "Nepal";
        addressFilters["address.zip_code"] = "44600";

        const reports = await Report.find(addressFilters);

        if (!reports || reports.length === 0) {
            return res.status(404).json({
                error: "No reports found for the specified address",
            });
        }

        res.status(200).json({
            message: "Reports retrieved successfully",
            reports,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || "Failed to retrieve reports by address",
        });
    }
};

exports.updateReport = async(req, res) => {
    try {
        const { reportId } = req.params;
        const updates = req.body;

        if (updates.sliderValue) {
            if (![1, 2, 3].includes(updates.sliderValue)) {
                return res.status(400).json({
                    error: "Invalid slider value. It must be 1 (Minor), 2 (Moderate), or 3 (Severe).",
                });
            }
            updates.severity = mapSliderToSeverity(updates.sliderValue);
            delete updates.sliderValue;
        }

        if (updates.yesVotes !== undefined || updates.noVotes !== undefined) {
            const yesVotes = updates.yesVotes || 0;
            const noVotes = updates.noVotes || 0;
            updates.isValid = isValidVote(yesVotes, noVotes); // Recalculate validity
            updates.totalVotes = yesVotes + noVotes; // Update total votes
        }

        const updatedReport = await Report.findByIdAndUpdate(reportId, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedReport) {
            return res.status(404).json({ error: "Report not found" });
        }

        res.status(200).json({
            message: "Report updated successfully",
            report: updatedReport,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message || "Failed to update report" });
    }
};

exports.deleteReport = async(req, res) => {
    try {
        const deletedReport = await Report.findByIdAndDelete(req.params.reportId);

        if (!deletedReport) {
            return res.status(404).json({ error: "Report not found" });
        }

        res.status(200).json({ message: "Report deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message || "Error deleting report" });
    }
};

// might be useful
exports.getReportsNearLocation = async(req, res) => {
    try {
        const { longitude, latitude, distance } = req.query;

        const reports = await Report.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(longitude), parseFloat(latitude)],
                    },
                    $maxDistance: parseInt(distance) || 5000, // default to 5 km
                },
            },
        });

        res.status(200).json(reports);
    } catch (err) {
        console.log(err);
        res
            .status(500)
            .json({ error: err.message || "Failed to retrieve reports" });
    }
};

// ---- helper function ----
const isValidVote = (yesVotes, noVotes) => {
    if (yesVotes > noVotes) {
        return true;
    } else if (noVotes > yesVotes) {
        return false;
    } else {
        return false; // if the vote is tie, then defaults to not a pothole
    }
};

const mapSliderToSeverity = (sliderValue) => {
    if (sliderValue === 1) {
        return "minor";
    } else if (sliderValue === 2) {
        return "moderate";
    } else if (sliderValue === 3) {
        return "severe";
    }
};



exports.createOrUpdateCluster = async(report, req, res) => {
    const { location, reportId } = report;

    try {
        let cluster = await Cluster.findOne({ location });

        if (cluster) {
            if (!cluster.reports.includes(reportId)) {
                cluster.reports.push(reportId);
                cluster.reportCount += 1;
            }

            // Optionally update the aggregated severity or perform other updates
            // Example of updating aggregated severity (this part depends on your logic)
            // cluster.aggregatedSeverity = calculateAggregatedSeverity(cluster.reports);

            await cluster.save();
            return res.status(200).json({
                message: "Cluster updated with new report",
                cluster,
                report
            });
        } else {
            // If no cluster exists for the location, create a new one
            const newCluster = new Cluster({
                location,
                reports: [reportId],
                reportCount: 1,
                isValid: false, // forgot why i used this
            });

            await newCluster.save();
            return res.status(201).json({
                message: "New cluster created with the report",
                report: report,
                cluster: newCluster,
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error creating or updating cluster",
            error: error.message,
        });
    }
};