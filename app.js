const express = require("express");
const { getTopics } = require("./controllers/topics.controllers");
const app = express();
const  {getArticles } = require("./controllers/articles.controller")



app.get("/api/topics", getTopics);

app.use("/api/articles",getArticles)

//end point is the url path

module.exports = app;
