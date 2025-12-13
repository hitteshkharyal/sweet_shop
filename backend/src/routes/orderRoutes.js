const express = require("express");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const {
  createOrder,
  getMyOrders,
  getAllOrders
} = require("../controllers/orderController");

const router = express.Router();

router.post("/", auth, createOrder);
router.get("/me", auth, getMyOrders);
router.get("/", auth, admin, getAllOrders);

module.exports = router;
