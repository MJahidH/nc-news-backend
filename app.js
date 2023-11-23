const express = require("express");
const { getTopics } = require("./controllers/topics.controllers");
const app = express();
const { getArticles } = require("./controllers/articles.controller");
const { getArticleById } = require("./controllers/articles.controller");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

//end point is the url path

app.use((err, req, res, next) => {
  if ((err.code = "42703")) {
    res.status(404).send("bad request");
  } else {
    console.log(err.code);
    res.status(400).send("internal server error");
  }
});



module.exports = app;
