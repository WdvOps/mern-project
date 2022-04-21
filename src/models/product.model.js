const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
  {
    product_name: String,
    product_description: String,
    product_price: Number,
    Product_amount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const product = mongoose.model("Product", DataSchema);
module.exports = product;
