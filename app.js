const express = require("express");
const { getTopics } = require("./controllers/topics.controllers");
const app = express();
const { getApi } = require("./controllers/api.controller");
const { getArticles } = require("./controllers/articles.controller");

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.use("/api/articles", getArticles);

app.all("*",(req, res, next) => {
  res.status(404).send({ msg: "Not Found" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(404).send({ msg: "Not Found" });
  } else res.status(500).send(err);
});

//end point is the url path

module.exports = app;
