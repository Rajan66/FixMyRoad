const express = require("express");
const router = express.Router();

const authRoute = require("./auth");
const reportRoute = require("./report");

router.use(authRoute);
router.use(reportRoute);

module.exports = router;
