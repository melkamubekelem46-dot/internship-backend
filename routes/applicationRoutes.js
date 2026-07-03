const express = require("express");
const router = express.Router();

const {
  apply,
  searchApplications,
  getApplications,
  updateStatus,
  updateDepartment,
  deleteApplication
} = require("../controllers/applicationController");

const upload = require("../middleware/upload");
// Added middleware import
const verifyAdmin = require("../middleware/authMiddleware");

// CREATE application
router.post("/apply", upload.single("coverLetter"), apply);

// GET all applications (ADMIN ONLY)
router.get("/", verifyAdmin, getApplications);

// SEARCH (Status page)
router.get("/search", searchApplications);

// UPDATE status (ADMIN ONLY)
router.put("/:id/status", verifyAdmin, updateStatus);

// UPDATE department
router.put("/:id/department", updateDepartment);

// DELETE application (ADMIN ONLY)
router.delete("/:id", verifyAdmin, deleteApplication);

module.exports = router;