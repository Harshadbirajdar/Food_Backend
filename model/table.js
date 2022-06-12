const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide table Name"],
    unique: true,
  },
  isAvailable: {
    type: Boolean,
    required: true,
    default: false,
  },
  capacity: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Table", tableSchema);
