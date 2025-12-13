const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized user" });
  }

  const { items, totalAmount } = req.body;

  const order = await Order.create({
    userId: req.user.id,
    items,
    totalAmount
  });

  res.status(201).json(order);
};

exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id })
    .sort({ createdAt: -1 });

  res.json(orders);
};

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("userId", "name email")
    .sort({ createdAt: -1 });

  res.json(orders);
};
