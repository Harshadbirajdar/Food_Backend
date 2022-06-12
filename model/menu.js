const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    required: true,
    default: false,
  },
  isVeg: {
    type: Boolean,
    required: true,
  },
  Category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Menu", menuSchema);
