const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  createSweet,
  getSweets
} = require("../controllers/sweetController");

const router = express.Router();

router.post("/", auth, createSweet);
router.get("/", auth, getSweets);
const { searchSweets } = require("../controllers/sweetController");

router.get("/search", auth, searchSweets);

module.exports = router;
