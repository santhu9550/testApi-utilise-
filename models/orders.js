const mongoose = require("mongoose");

// Create Schema
const OrderSchema = new mongoose.Schema({
  customer_name: {
    type: String,
  },
  customer_email: {
    type: String,
  },
  product: {
    type: String,
    enum: ["Product 1", "Product 2", "Product 3"],
  },
  quantity: {
    type: Number,
    min: 1,
  },
});

module.exports = Order = mongoose.model("orders", OrderSchema);
