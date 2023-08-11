let mongoose = require("mongoose");

let registerSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    email: String,
    price: Number,
  },
  { timestamps: true }
);

let productsDataScheme = mongoose.model("productsData", registerSchema);

module.exports = productsDataScheme;
