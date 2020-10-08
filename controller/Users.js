const mongoose = require("mongoose");

const User = require("../model/user");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((users) => {
      if (users.length >= 1) {
        return res.status(409).json({
          message: "User already exists with this email",
          success: false,
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                return res.status(201).json({
                  message: `Hello ${req.body.name} welcome to the crawler`,
                  url: "http://localhost:8000/user/signin",
                  success: true,
                });
              })
              .catch((err) => {
                console.log(err);
                return res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};

exports.signin = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((users) => {
      if (users.length < 1) {
        return res.status(401).json({
          message: "User not found",
        });
      } else {
        bcrypt.compare(req.body.password, users[0].password, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(401).json({
              message: "Cannot log In",
              success: false,
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: users[0].email,
                id: users[0]._id,
              },
              "gocomet",
              {
                expiresIn: "1h",
              }
            );
            return res.status(201).json({
              message: "Logged In Successfully",
              token: token,

              success: true,
            });
          } else {
            return res.status(401).json({
              message: "Cannot log In",
            });
          }
        });
      }
    });
};

exports.all = (req, res) => {
  User.find()
    .exec()
    .then((users) => {
      const response = {
        count: users.length,
        Users: users.map((user) => {
          return {
            id: user._id,
            name: user.name,
            email: user.email,
          };
        }),
      };
      return res.status(201).json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
