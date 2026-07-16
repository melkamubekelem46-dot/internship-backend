const db = require("../db");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const loginAttempts = {};

const loginAdmin = (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM admins WHERE username = ?";

  db.query(sql, [username], async (err, results) => {
  
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid username",
      });
    }

    const admin = results[0];

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      if (!loginAttempts[username]) {
        loginAttempts[username] = {
          count: 1,
          blockedUntil: 0
        };
      } else {
        loginAttempts[username].count++;
      }

      if (loginAttempts[username].count >= 5) {
        loginAttempts[username].blockedUntil = Date.now() + (5 * 60 * 1000);
      }

      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    
    res.json({
      success: true,
      token,
      admin: {
        id: admin.id,
        username: admin.username
      }
    });
  });
};

const changePassword = (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const adminId = req.admin.id;

  const sql = "SELECT * FROM admins WHERE id = ?";

  db.query(sql, [adminId], async (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      });
    }

    const admin = results[0];

    const isMatch = await bcrypt.compare(
      currentPassword,
      admin.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect"
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    db.query(
      "UPDATE admins SET password = ? WHERE id = ?",
      [hashedPassword, adminId],
      (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Failed to update password"
          });
        }

        return res.json({
          success: true,
          message: "Password updated successfully"
        });
      }
    );
  });
};
const sendReply = async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  res.json({
    success: true,
    message: "Reply endpoint is working",
  });
};
module.exports = { loginAdmin, changePassword, sendReply, };