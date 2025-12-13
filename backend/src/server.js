const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// base route
app.get("/", (req, res) => {
  res.send("Sweet Shop API is running...");
});

module.exports = app;
