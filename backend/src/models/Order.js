const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    items: [
      {
        sweetId: mongoose.Schema.Types.ObjectId,
        name: String,
        qty: Number,
        price: Number
      }
    ],
    totalAmount: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
