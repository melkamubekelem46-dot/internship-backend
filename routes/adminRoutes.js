const express = require("express");
const router = express.Router();

const {
  loginAdmin,
  changePassword,
  sendReply
} = require("../controllers/adminController");

const verifyAdmin = require("../middleware/authMiddleware");

router.post("/login", loginAdmin);

router.put("/change-password", verifyAdmin, changePassword);
router.post("/reply", verifyAdmin, sendReply);
router.get("/verify", verifyAdmin, (req, res) => {
  res.json({
    success: true,
    admin: req.admin
  });
});

module.exports = router;