const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4 } = require("uuid");

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

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = v4();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

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

userSchema.methods = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },
  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

const User = mongoose.model("User", userSchema);

// shows error log if there is a duplicate key creation
User.on("index", (err) => {
  console.log(err);
});

module.exports = User;
