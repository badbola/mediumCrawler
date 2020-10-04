const mongoose = require("mongoose");

const User = require("../model/user");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

exports.search = (req, res) => {
  const content = req.params.query;
  const decoded = jwt.verify(req.headers.authorization, "gocomet");
  User.find({ email: decoded.email })
    .exec()
    .then((users) => {
      if (users.length >= 1) {
        User.updateOne(
          { email: decoded.email },
          { $push: { searchHistory: { content: req.params.query } } }
        )
          .then(() => {
            return res.status(201).json({
              message: "Search history updated",
            });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({
              message: "Cannot update search history",
            });
          });
      } else {
        return res.status(404).json({
          message: "No such user found",
        });
      }
    });
};
