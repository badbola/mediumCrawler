const mongoose = require("mongoose");

const User = require("../model/user");

// const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const fetch = require("node-fetch");

const cheerio = require("cheerio");

const url = "https://medium.com/search?q=";

// exports.search = async (req, res) => {
//   // const data = await fetch("https://medium.com/search?q=master");
//   // const result = await data.json();
//   // result.then(() => {
//   //   console.log(result);
//   // });
// };
exports.search = (req, res) => {
  const content = req.params.query;
  const decoded = jwt.verify(req.headers.authorization, "gocomet");

  User.find({ email: decoded.email })
    .exec()
    .then((users) => {
      if (users.length >= 1) {
        User.updateOne(
          { email: decoded.email },
          { $push: { searchHistory: { content: content } } }
        )
          .then(() => {
            fetch(`${url}${content}`).then(function (response) {
              response.text().then(function (text) {
                const $ = cheerio.load(text);
                const listOfPost = [];
                $(".u-paddingTop20").each(function (i, element) {
                  const $element = $(element);
                  const $title = $element.find("h3");
                  const $clap = $element.find("span button");
                  const $responses = $element.find(".buttonSet a");
                  const $link = $element.find(".postArticle-readMore a");
                  const $author = $element.find(
                    ".postMetaInline-authorLockup a.u-accentColor--textDarken"
                  );
                  const $publishDate = $element.find("time");
                  const list = {
                    title: $title.text(),
                    claps: $clap.text(),
                    responses: $responses.text(),
                    link: "http://localhost:8000/post/" + $link.attr("href"),
                    author: $author.text(),
                    date: $publishDate.text(),
                  };
                  listOfPost.push(list);
                });
                return res.status(201).json({
                  message: "History Updated",
                  list: listOfPost,
                  success: true,
                  // response: text,
                });
              });
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
exports.searchHistory = (req, res) => {
  const decoded = jwt.verify(req.headers.authorization, "gocomet");

  User.find({ email: decoded.email })
    .exec()
    .then((users) => {
      console.log(decoded.email);
      if (users.length >= 1) {
        return res.status(201).json({
          success: true,
          history: users[0].searchHistory,
        });
      }
      return res.status(401).json({
        success: false,
        history: "not found",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
