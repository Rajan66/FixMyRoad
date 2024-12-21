const mongoose = require("mongoose");

const clusterSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
    },
    reports: [{
        type: mongoose.Types.ObjectId,
        ref: "Report",
    }, ],
    reportCount: {
        type: Number,
        default: 0,
    },
    aggregatedSeverity: {
        type: String,
        enum: ["minor", "moderate", "high"],
        default: "minor",
    },
    isValid: {
        type: Boolean,
        default: false, // let admin approve this, admin changes this if they approve it.
    },
}, {
    timestamps: true,
});

// Middleware to update `updatedAt` field on document modification
clusterSchema.pre("save", function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("Cluster", clusterSchema);