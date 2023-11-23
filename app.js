const express = require("express");
const { getTopics } = require("./controllers/topics.controllers");
const app = express();
const { getArticles } = require("./controllers/articles.controller");
const { getArticleById } = require("./controllers/articles.controller");

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);



//end point is the url path

app.use((err,req,res,next)=> {
    console.log(err)
    next()
})



module.exports = app;
