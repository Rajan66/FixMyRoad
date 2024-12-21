const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      maxlength: 64,
      trim: true,
    },
    lastname: {
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
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive"], // send email,
      default: "inactive",
    },
  },
  {
    timestamps: true,
  }
);

// --- virtual to combine firstname and lastname ---
userSchema
  .virtual("name")
  .get(function () {
    return `${this.firstname} ${this.lastname}`;
  })
  .set(function (v) {
    const firstname = v.substring(0, v.indexOf(" "));
    const lastname = v.substring(v.indexOf(" ") + 1);
    this.set({ firstname, lastname });
  });

// --- pre-save hook to hash password before saving to database ---
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.authenticate = async function (plainpassword) {
  return bcrypt.compare(plainpassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
