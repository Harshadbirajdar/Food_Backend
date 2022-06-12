const express = require("express");
const {
  addCategory,
  updateCategory,
  getAllCategory,
} = require("../controller/category");
const { isLoggedIn, isManger, isAdmin } = require("../middleware/user");
const router = express.Router();

router
  .route("/category")
  .post(isLoggedIn, isManger, addCategory)
  .put(isLoggedIn, isAdmin, updateCategory)
  .get(getAllCategory);

module.exports = router;
