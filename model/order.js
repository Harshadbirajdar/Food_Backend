const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const orderSchema = new mongoose.Schema(
  {
    table: {
      type: ObjectId,
      required: true,
    },
    item: [
      {
        item: {
          type: ObjectId,
          ref: "Menu",
        },
        qty: {
          type: Number,
          required: true,
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    orderBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
