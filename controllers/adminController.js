const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginAdmin = (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM admins WHERE username = ?";

  db.query(sql, [username], async (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid username" });
    }

    const admin = results[0];

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
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

module.exports = { loginAdmin };