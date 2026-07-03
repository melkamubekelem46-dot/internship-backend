const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getMessages,
} = require("../controllers/contactController");

// POST message
router.post("/", sendMessage);

// GET messages (admin)
router.get("/", getMessages);

module.exports = router;