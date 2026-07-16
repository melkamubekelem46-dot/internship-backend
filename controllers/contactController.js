const db = require("../db");

const sendMessage = (req, res) => {
  const { name, email, subject, message } = req.body;

  const sql = `
    INSERT INTO contacts (name, email, subject, message)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [name, email, subject, message], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database error",
        error: err,
      });
    }

    res.json({
      success: true,
      message: "Message sent successfully",
      id: result.insertId,
    });
  });
};

const getMessages = (req, res) => {
  const sql = "SELECT * FROM contacts ORDER BY id DESC";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database error",
        error: err
      });
    }

    res.json({
      success: true,
      data: results
    });
  });
};

const markAsRead = (req, res) => {
  const { id } = req.params;

  const sql = "UPDATE contacts SET isRead = 1 WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database error",
        error: err
      });
    }
    res.json({
      success: true,
      message: "Message marked as read"
    });
  });
};

const deleteMessage = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM contacts WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database error",
        error: err
      });
    }

    res.json({
      success: true,
      message: "Message deleted"
    });
  });
};
const replyMessage = (req, res) => {
  const { id } = req.params;
  const { reply } = req.body;

  const sql = `
    UPDATE contacts
    SET reply = ?, repliedAt = NOW()
    WHERE id = ?
  `;

  db.query(sql, [reply, id], (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database error",
        error: err
      });
    }

    res.json({
      success: true,
      message: "Reply sent successfully"
    });
  });
};
module.exports = {
  sendMessage,
  getMessages,
  markAsRead,
  deleteMessage,
  replyMessage
};