const express = require("express");
const {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
  getReportsNearLocation,
  getReportsByAddress,
} = require("../controllers/report");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

const router = express.Router();

// --- params ----
router.param("userId", getUserById);

// --- http routes ---
router.post("/reports", isSignedIn, createReport);

router.get("/reports", getAllReports);

router.get("/reports/near", getReportsNearLocation);

router.get("/reports/:reportId", getReportById);

router.get("/reports/address", getReportsByAddress); // giving issues idk why

router.patch("/reports/:reportId", updateReport);

router.delete("/reports/:reportId", deleteReport);

module.exports = router;
