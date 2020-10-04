const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/crawlerData");

const db = mongoose.connection;

mongoose.Promise = global.Promise;

db.on("error", console.error.bind(console, "error in connecting to db"));

db.once("open", function () {
  console.log("Successfully connected to database");
});
