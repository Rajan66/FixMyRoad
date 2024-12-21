const express = require("express");
const router = express.Router();

const authRoute = require("./auth");
const reportRoute = require("./report");
const complaintRoute = require("./complaint");
const clusterRoute = require("./cluster");

router.use(authRoute);
router.use(reportRoute);
router.use(complaintRoute);
router.use(clusterRoute);

module.exports = router;
