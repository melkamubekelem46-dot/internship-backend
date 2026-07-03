const db = require("../db");

const sendMessage = (req, res) => {
  const { name, email, subject, message } = req.body;

  // FIXED: Wrapped the SQL string in backticks (template literals)
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
  db.query("SELECT * FROM contacts ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ success: false, error: err });

    res.json({ success: true, data: results });
  });
};

module.exports = { sendMessage, getMessages };