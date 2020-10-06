const express = require("express");

const router = express.Router();

const auth = require("../middleware/authCheck");

const searchController = require("../controller/Search");

router.get("/:query", auth, searchController.search);
router.get("/history/show", auth, searchController.searchHistory);

module.exports = router;
