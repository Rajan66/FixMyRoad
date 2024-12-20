const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
require("dotenv").config();

exports.signup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  req.body.role = "user"; // if role is auto-set by the frontend

  try {
    const user = new User(req.body);
    const newUserObj = await user.save();

    res.json({ message: "Signup success", _id: newUserObj._id });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ error: err.message || "Not Able to Save in Database" });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email: emailAddress, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg,
      });
    }
    let user = await User.findOne({ email: emailAddress });

    if (!user) {
      return res.status(401).json({
        error: "User doesn't exist",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password do not match",
      });
    }

    const token = await createToken(user._id, res);

    const { _id, name, email, role } = user;

    res.status(200).json({
      token,
      user: {
        _id,
        name,
        email,
        role,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message } || "Error signing in");
  }
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User Signout Sucess",
  });
};

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

//Custom Middlewares
const createToken = async (userId, res) => {
  const expiry_time = parseInt(process.env.EXPIRE_TIME) || 3600; // default to 1 hour if no expiry time is set
  const token = jwt.sign({ userId: userId }, process.env.SECRET, {
    expiresIn: expiry_time,
  });

  res.cookie("token", token, {
    expiresIn: expiry_time,
  });

  return token;
};

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "Authenticated Access Denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      error: "Admin Access Denied",
    });
  }
};
