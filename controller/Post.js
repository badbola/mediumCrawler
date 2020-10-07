const User = require("../model/user");

// const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const fetch = require("node-fetch");

const cheerio = require("cheerio");

exports.viewOne = (req, res) => {
  const url = "https://medium.com/p/" + req.params.id;
  fetch(url);
  // .then((response) => response.json())
  // .then((data) => console.log(data))
  // .catch((err) => {
  //   console.log(err);
  // });

  //   fetch(url).then(function (response) {
  //     response
  //       .text()
  //       .then(function (text) {
  //         const $ = cheerio.load(text);
  //         const $title = $("strong.be");
  //         console.log($title);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   });
  fetch(url)
    .then(function (response) {
      response.text().then(function (text) {
        const $ = cheerio.load(text);
        const ele = [];
        const $title = $("h1 strong").text();
        const $blog = $("article>div>section>div>div>h1,p").text();
        const contents = {
          title: $title,
          blog: $blog,
        };
        ele.push(contents);
        $("li>a").each(function (i, element) {
          const $element = $(element).text();
          const tags = {
            tag: $element,
          };
          ele.push(tags);
        });
        return res.status(201).json({
          success: true,
          content: ele,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: "Cannot update search history",
      });
    });
};
