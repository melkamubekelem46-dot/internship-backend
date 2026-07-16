const db = require("../db");

const searchApplications = (req, res) => {
  const rawQuery = req.query.query || "";
  const wildcardQuery = `%${rawQuery}%`;

  const sql = `
    SELECT * FROM applications 
    WHERE email LIKE ? 
    OR firstName LIKE ? 
    OR lastName LIKE ?
    OR id = ?
  `;

  db.query(sql, [wildcardQuery, wildcardQuery, wildcardQuery, rawQuery], (err, results) => {
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

const getApplications = (req, res) => {
  db.query("SELECT * FROM applications ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ success: false, error: err });

    res.json({ success: true, data: results });
  });
};

const updateStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.query(
    "UPDATE applications SET status=? WHERE id=?",
    [status, id],
    (err) => {
      if (err) return res.status(500).json({ success: false, error: err });

      res.json({ success: true });
    }
  );
};

const updateDepartment = (req, res) => {
  const { id } = req.params;
  const { department } = req.body;

  db.query(
    "UPDATE applications SET department=? WHERE id=?",
    [department, id],
    (err) => {
      if (err) return res.status(500).json({ success: false, error: err });

      res.json({ success: true });
    }
  );
};

const deleteApplication = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM applications WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ success: false, error: err });

    res.json({ success: true });
  });
};

const apply = (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    university,
    fieldOfStudy,
    academicYear,
    department,
    startDate
  } = req.body;

  const coverLetter = req.file ? req.file.filename : null;

  const checkSql = "SELECT id FROM applications WHERE email = ?";

  db.query(checkSql, [email], (checkErr, results) => {
    if (checkErr) {
      return res.status(500).json({
        success: false,
        message: "Database error during validation",
        error: checkErr
      });
    }

    if (results.length > 0) {
      return res.status(400).json({
        success: false,
        message: "An application with this email already exists."
      });
    }
    const insertSql = `
      INSERT INTO applications 
      (firstName, lastName, email, phone, university, fieldOfStudy, academicYear, department, startDate, coverLetter)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertSql,
      [
        firstName,
        lastName,
        email,
        phone,
        university,
        fieldOfStudy,
        academicYear,
        department,
        startDate,
        coverLetter
      ],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Database error during submission",
            error: err
          });
        }

        res.json({
          success: true,
          message: "Application submitted successfully",
          id: result.insertId
        });
      }
    );
  });
};

module.exports = {
  apply,
  searchApplications,
  getApplications,
  updateStatus,
  updateDepartment,
  deleteApplication,
};