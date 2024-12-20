const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    severity: {
      type: String,
      enum: ["minor", "moderate", "severe"],
      required: true,
      default: "minor",
    },
    // --- number of votes ---
    // TODO decide whether to store the vote in complaints or report ( i think in complaints)
    vote: {
      type: Number,
      default: 0,
      min: 0,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number], // Array of numbers: [longitude, latitude]
      },
    },
    address: {
      area_name: String,
      city: {
        type: String,
        default: "Kathmandu",
      },
      country: {
        type: String,
        default: "Nepal",
      },
      zip_code: {
        type: String,
        default: "44600",
      },
    },
  },
  {
    timestamps: true,
  }
);
reportSchema.index({ location: "2dsphere" });

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
