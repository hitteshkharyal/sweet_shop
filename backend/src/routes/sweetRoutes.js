const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  createSweet,
  getSweets
} = require("../controllers/sweetController");

const router = express.Router();

router.post("/", auth, createSweet);
router.get("/", auth, getSweets);

module.exports = router;
