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

const verifyAdmin = require("../middleware/authMiddleware");


router.post("/apply", upload.single("coverLetter"), apply);

router.get("/", verifyAdmin, getApplications);

router.get("/search", searchApplications);

router.put("/:id/status", verifyAdmin, updateStatus);

router.put("/:id/department", updateDepartment);

router.delete("/:id", verifyAdmin, deleteApplication);

module.exports = router;