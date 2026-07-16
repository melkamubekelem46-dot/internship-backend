require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();


const applicationRoutes = require("./routes/applicationRoutes");

const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");
const path = require("path");

 app.use(cors({
  origin: "http://localhost:5173",
   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
   allowedHeaders: ["Content-Type", "Authorization"]
 }));

app.use(express.json());

app.use("/api/messages", contactRoutes);

app.use("/api/admin", adminRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});