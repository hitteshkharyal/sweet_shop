const express = require("express");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  createSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
} = require("../controllers/sweetController");

const router = express.Router();

router.post("/", auth, createSweet);
router.get("/", auth, getSweets);
router.get("/search", auth, searchSweets);
router.put("/:id", auth, updateSweet);
router.delete("/:id", auth, admin, deleteSweet);
router.post("/:id/purchase", auth, purchaseSweet);
router.post("/:id/restock", auth, admin, restockSweet);

module.exports = router;
