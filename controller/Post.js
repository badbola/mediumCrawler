const User = require("../model/user");

// const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const fetch = require("node-fetch");

const cheerio = require("cheerio");

exports.viewOne = (req, res) => {
  const url = "https://medium.com/p/" + req.params.id;
  fetch(url)
    .then(function (response) {
      response.text().then(function (text) {
        const $ = cheerio.load(text);
        const ele = [];
        const $title = $("section>div>div>div>h1").text();
        const $author = $("section>div>div>div>div div>span>a").text();
        const $blog = $("article>div>section>div>div>h1,p").text();

        var conTag = [];
        $("li>a").each(function (i, element) {
          const $element = $(element).text();
          // const tags = {
          //   tag: $element,
          // };
          conTag.push($element);
        });
        const contents = {
          title: $title,
          blog: $blog,
          author: $author,
          tags: conTag,
        };
        ele.push(contents);
        return res.status(201).json({
          success: true,
          content: ele,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: "Cannot show data",
      });
    });
};

exports.viewTag = (req, res) => {
  const url = `https://medium.com/tag/${req.params.id}`;
  fetch(url)
    .then(function (response) {
      response.text().then(function (text) {
        const $ = cheerio.load(text);
        const listOfPost = [];
        $(".streamItem").each(function (i, element) {
          const $element = $(element);
          const $title = $element.find("h3");
          const $clap = $element.find(".u-floatLeft span");
          const $responses = $element.find(".u-floatRight a");
          const $link = $element.find(".postArticle-readMore a");
          const $author = $element.find(
            ".postMetaInline-authorLockup a.u-accentColor--textDarken"
          );
          const $publishDate = $element.find("time");
          const list = {
            title: $title.text(),
            claps: $clap.text(),
            responses: $responses.text(),
            link:
              "http://localhost:8000/post/medium.com/p/" +
              $link.attr("data-post-id"),
            author: $author.text(),
            date: $publishDate.text(),
          };
          listOfPost.push(list);
        });
        return res.status(201).json({
          resp: listOfPost,
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
