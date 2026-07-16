const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getMessages,
  markAsRead,
  deleteMessage,
  replyMessage
} = require("../controllers/contactController");


router.post("/", sendMessage);
router.get("/", getMessages);
router.put("/:id/read", markAsRead);
router.put("/:id/reply", replyMessage);
router.delete("/:id", deleteMessage);
module.exports = router;