const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { signout, signup, signin } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("email", "email is required").isEmail(),
    check("password", "Password should be at least 6 character").isLength({
      min: 6,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "Password is required").isLength({
      min: 1,
    }),
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
