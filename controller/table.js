const BigPromise = require("../middleware/BigPromise");
const Table = require("../model/table");
exports.addTable = BigPromise(async (req, res, next) => {
  const table = await Table.create({ ...req.body, createdBy: req.user._id });
  return res.status(200).json({
    success: true,
    table,
  });
});
