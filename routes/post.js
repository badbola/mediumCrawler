const express = require("express");

const router = express.Router();

const auth = require("../middleware/authCheck");

const postController = require("../controller/Post");

router.get("/medium.com/p/:id", auth, postController.viewOne);

module.exports = router;
