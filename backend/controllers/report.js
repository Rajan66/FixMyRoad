const Report = require("../models/report");
const Cluster = require("../models/cluster");
const { validationResult } = require("express-validator");

exports.createReport = async (req, res) => {
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
        error:
          "Invalid slider value. It must be 1 (Minor), 2 (Moderate), or 3 (Severe).",
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

    const cluster = await this.createOrUpdateCluster(savedReport, req, res);

    return res.status(201).json({
      message: "New cluster created with the report",
      report: savedReport,
      cluster: cluster,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message || "Failed to create report" });
  }
};

exports.getReportById = async (req, res) => {
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

exports.getAllReports = async (req, res) => {
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

exports.getReportsByAddress = async (req, res) => {
  try {
    const { area } = req.query;

    const filters = {};

    if (area) filters["address.area"] = area;
    filters["address.city"] = "Kathmandu";
    filters["address.country"] = "Nepal";
    filters["address.zip_code"] = "44600";

    const reports = await Report.find(filters);

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

exports.updateReport = async (req, res) => {
  try {
    const { reportId } = req.params;
    const updates = req.body;

    if (updates.sliderValue) {
      if (![1, 2, 3].includes(updates.sliderValue)) {
        return res.status(400).json({
          error:
            "Invalid slider value. It must be 1 (Minor), 2 (Moderate), or 3 (Severe).",
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

exports.deleteReport = async (req, res) => {
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
exports.getReportsNearLocation = async (req, res) => {
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

const mongoose = require("mongoose");

exports.createOrUpdateCluster = async (report, req, res) => {
  const { address, _id } = report;
  const area = address.area;

  try {
    let cluster = await Cluster.findOne({ location: area });

    if (cluster) {
      await Cluster.updateOne(
        { _id: cluster._id },
        {
          $addToSet: { reports: _id },
          $inc: { reportCount: 1 },
        }
      );

      cluster = await Cluster.findById(cluster._id); // Re-fetch updated cluster

      return cluster;
    } else {
      const newCluster = new Cluster({
        location: area,
        reports: [_id],
        reportCount: 1,
        isValid: false,
      });

      await newCluster.save();
      return newCluster;
    }
  } catch (error) {
    console.error(error);
       throw new Error("Error creating or updating cluster: " + error.message);

  }
};
