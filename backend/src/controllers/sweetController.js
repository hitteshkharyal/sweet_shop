const Sweet = require("../models/Sweet");

exports.createSweet = async (req, res) => {
  const sweet = await Sweet.create(req.body);
  res.status(201).json(sweet);
};

exports.getSweets = async (req, res) => {
  const sweets = await Sweet.find();
  res.json(sweets);
};
exports.searchSweets = async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;

  const query = {};

  if (name) query.name = new RegExp(name, "i");
  if (category) query.category = category;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = minPrice;
    if (maxPrice) query.price.$lte = maxPrice;
  }

  const sweets = await Sweet.find(query);
  res.json(sweets);
};
exports.updateSweet = async (req, res) => {
  const sweet = await Sweet.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(sweet);
};
exports.deleteSweet = async (req, res) => {
  await Sweet.findByIdAndDelete(req.params.id);
  res.json({ message: "Sweet deleted" });
};
exports.purchaseSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);
  if (sweet.quantity < req.body.qty) {
    return res.status(400).json({ message: "Out of stock" });
  }

  sweet.quantity -= req.body.qty;
  await sweet.save();
  res.json(sweet);
};

exports.restockSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);
  sweet.quantity += req.body.qty;
  await sweet.save();
  res.json(sweet);
};
exports.purchaseSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);
  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  if (sweet.quantity < req.body.qty) {
    return res.status(400).json({ message: "Out of stock" });
  }

  sweet.quantity -= req.body.qty;
  await sweet.save();

  res.json(sweet);
};
