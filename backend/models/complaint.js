const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    // --- reports holds the reportId of similar reports ---
    // --- similarity of reports is decided through address ---
    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
        required: true,
      },
    ],
    status: {
      type: String,
      enum: ["unresolved", "pending", "resolved"],
    },
    sent_at: {
      type: Date,
      default: Date.now, // TODO not decided whether to set the sent date after vote ends or after creation of all reports
    },
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;
