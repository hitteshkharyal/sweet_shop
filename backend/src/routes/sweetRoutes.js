const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  createSweet,
  getSweets,
  searchSweets,
  updateSweet,deleteSweet
} = require("../controllers/sweetController");

const router = express.Router();

router.post("/", auth, createSweet);
router.get("/", auth, getSweets);
router.get("/search", auth, searchSweets);
router.put("/:id", auth, updateSweet);
const admin = require("../middleware/adminMiddleware");
router.delete("/:id", auth, admin, deleteSweet);
module.exports = router;
