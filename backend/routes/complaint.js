const express = require("express");
const router = express.Router();
const {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
} = require("../controllers/complaint");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.post("/", isSignedIn, createComplaint);

router.get("/", getAllComplaints);

router.get("/:id", getComplaintById);

router.put("/:id", isSignedIn, updateComplaint);

router.delete("/:id", isSignedIn, isAdmin, deleteComplaint);

module.exports = router;
