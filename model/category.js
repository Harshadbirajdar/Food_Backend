const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a Category Name"],
    unique: true,
  },
  image: {
    type: String,
    required: [true, "Please provide a Category Image"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Category", categorySchema);
