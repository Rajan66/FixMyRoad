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

router.post("/complaint", isSignedIn, createComplaint);

router.get("/complaint", getAllComplaints);

router.get("/complaint/:id", getComplaintById);

router.put("/complaint/:id", isSignedIn, updateComplaint);

router.delete("/complaint/:id", isSignedIn, isAdmin, deleteComplaint);

module.exports = router;
