const express = require("express");
const router = express.Router();

const {
  getPositions,
  createPosition,
  updatePosition,
  deletePosition,
} = require("../controllers/positionController");

// GET all positions
router.get("/", getPositions);

// CREATE position
router.post("/", createPosition);

// UPDATE position
router.put("/:id", updatePosition);

// DELETE position
router.delete("/:id", deletePosition);

module.exports = router;