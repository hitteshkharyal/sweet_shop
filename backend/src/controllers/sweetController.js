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
