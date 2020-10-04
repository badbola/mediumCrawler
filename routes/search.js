const express = require("express");

const router = express.Router();

const auth = require("../middleware/authCheck");

const searchController = require("../controller/Search");

router.post("/:query", auth, searchController.search);

module.exports = router;
