const express = require("express");
const { getTopics } = require("./controllers/topics.controllers");
const app = express();
const { getArticles } = require("./controllers/articles.controller");
const { getArticleById } = require("./controllers/articles.controller");
const { getComments } = require("./controllers/comments.controller");
const {addComments} = require("./controllers/comments.controller")
const {updateVotes} = require("./controllers/articles.controller")
const { getApi } = require("./controllers/api.controller");
const { deleteComment } = require("./controllers/comments.controller")

app.use(express.json())

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:id/comments", getComments);

app.post("/api/articles/:article_id/comments",addComments)

app.patch("/api/articles/:article_id",updateVotes)

app.delete("/api/comments/:comment_id",deleteComment)





app.all("*", (req, res, next) => {
  res.status(404).send({ msg: "Not Found" });
});

//end point is the url path
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "42703") {
    res.status(404).send({ msg: "Not Found" });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  }else if (err.code === "23503") {
     res.status(404).send({msg : "Bad Request"})

  } else {
    res.status(500).send({ msg: "internal server error" });
  }
});

module.exports = app;
