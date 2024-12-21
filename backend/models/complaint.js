const mongoose = require("mongoose");

// Create complaint after creating clusters and add the location from cluster
const complaintSchema = new mongoose.Schema({
  clusters: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Cluster",
    },
  ],
  location: {
    type: String,
    required: true,
  },
  submittedTo: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "unresolved", "resolved"],
    default: "unresolved",
  },
});

module.exports = mongoose.model("Complaint", complaintSchema);
