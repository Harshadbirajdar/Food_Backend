const express = require("express");
const router = express.Router();
const { addTable } = require("../controller/table");
const { isLoggedIn, isManger } = require("../middleware/user");

router.route("/table").post(isLoggedIn, isManger, addTable);

module.exports = router;
