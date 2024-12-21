const Complaint = require("../models/complaint");

exports.createComplaint = async (req, res) => {
  try {
    const { reports, status, sent_at } = req.body;

    if (!reports || reports.length === 0) {
      return res.status(400).json({ error: "Reports are required" });
    }

    const newComplaint = new Complaint({
      reports,
      status,
      sent_at,
    });

    await newComplaint.save();

    res.status(201).json({
      message: "Complaint created successfully",
      complaint: newComplaint,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create complaint" });
  }
};

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json({ complaints });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve complaints" });
  }
};

exports.getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params._id);
    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }
    res.status(200).json({ complaint });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve complaint" });
  }
};

exports.updateComplaint = async (req, res) => {
  try {
    const { reports, status, sent_at } = req.body;

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params._id,
      { reports, status, sent_at },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.status(200).json({
      message: "Complaint updated successfully",
      complaint: updatedComplaint,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update complaint" });
  }
};

exports.deleteComplaint = async (req, res) => {
  try {
    const deletedComplaint = await Complaint.findByIdAndDelete(req.params._id);
    if (!deletedComplaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }
    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete complaint" });
  }
};
