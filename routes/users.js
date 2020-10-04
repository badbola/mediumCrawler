const express = require("express");

const router = express.Router();

const userController = require("../controller/Users");

router.post("/signup", userController.register);
router.post("/signin", userController.signin);

module.exports = router;
