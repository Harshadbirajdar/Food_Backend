const { addMenu, getAllMenu } = require("../controller/menu");

const express = require("express");
const { isLoggedIn, isManger } = require("../middleware/user");
const router = express.Router();

router.route("/menu").post(isLoggedIn, isManger, addMenu).get(getAllMenu);

module.exports = router;
