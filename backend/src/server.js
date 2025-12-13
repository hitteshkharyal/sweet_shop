require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const sweetRoutes = require("./routes/sweetRoutes");
app.use("/api/sweets", sweetRoutes);

app.get("/", (req, res) => {
  res.send("Sweet Shop API is running...");
});
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/orders", orderRoutes);

module.exports = app;
