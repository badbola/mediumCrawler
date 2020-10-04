const express = require("express");

const port = 8000;

const mongoose = require("./config/mongoose");

const bodyParser = require("body-parser");

const app = express();

const userRoute = require("./routes/users");

const searchRoute = require("./routes/search");

//extended false so that only fetch JSON files
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// tackling CORS error
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE, PATCH");
    return res.status(200).json({});
  }
  next();
});

app.use("/user", userRoute);

app.use("/q", searchRoute);

app.listen(port, (err) => {
  if (err) {
    console.log(`Unable to fetch in index.js gue to ${err}`);
  }
  console.log("Working Good");
});
