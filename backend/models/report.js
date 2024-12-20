const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      maxlength: 64,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    encry_password: {
      type: String,
    },
    salt: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);
