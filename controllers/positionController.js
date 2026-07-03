const db = require("../db");

// GET all positions
const getPositions = (req, res) => {
  const sql = "SELECT * FROM positions ORDER BY id DESC";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "DB error", error: err });
    }

    res.json({ success: true, data: results });
  });
};

// CREATE position
const createPosition = (req, res) => {
  const { title, department, slots, description } = req.body;

  const sql =
    "INSERT INTO positions (title, department, slots, description) VALUES (?, ?, ?, ?)";

  db.query(sql, [title, department, slots, description], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: "DB error", error: err });
    }

    res.json({ success: true, id: result.insertId });
  });
};
// UPDATE position
const updatePosition = (req, res) => {
  const { id } = req.params;
  const { title, department, slots, description } = req.body;

  const sql = `
    UPDATE positions
    SET title = ?, department = ?, slots = ?, description = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [title, department, slots, description, id],
    (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err
        });
      }

      res.json({ success: true });
    }
  );
};
// DELETE position
const deletePosition = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM positions WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ success: false, error: err });

    res.json({ success: true });
  });
};

module.exports = {
  getPositions,
  createPosition,
  updatePosition,
  deletePosition
};