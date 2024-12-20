const Report = require("../models/report");
const { validationResult } = require("express-validator");

exports.createReport = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { image, description, severity, location, address, vote } = req.body;
    const user = req.auth._id;
    if (location) {
      if (!location.coordinates || location.coordinates.length !== 2) {
        return res.status(400).json({ error: "Invalid location format" });
      }
      if (!location.type || location.type !== "Point") {
        return res.status(400).json({ error: "Location type must be 'Point'" });
      }
    }

    const newReport = new Report({
      user,
      image,
      description,
      severity,
      location,
      address,
      vote,
    });

    const savedReport = await newReport.save();

    res.status(201).json({
      message: "Report created successfully",
      report: savedReport,
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
    res.status(500).json({ error: err.message || "Failed to retrieve report" });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().populate("user", "name email");
    res.status(200).json(reports);
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message || "Failed to retrieve reports" });
  }
};

exports.getReportsByAddress = async (req, res) => {
  try {
    const { area_name } = req.query;

    const addressFilters = {};

    if (area_name) addressFilters["address.area_name"] = area_name;
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
    res.status(500).json({
      error: err.message || "Failed to retrieve reports by address",
    });
  }
};

exports.updateReport = async (req, res) => {
  try {
    const { reportId } = req.params;
    const updates = req.body;

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
    res
      .status(500)
      .json({ error: err.message || "Failed to retrieve reports" });
  }
};
