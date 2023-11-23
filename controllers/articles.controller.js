const { requireArticles } = require("../models /articles.model");
const { requireArticleById } = require("../models /articles.model");

exports.getArticles = (req, res) => {
  requireArticles().then((data) => {
    res.status(200).send(data);
  });
};
exports.getArticleById = (req, res) => {
  const { article_id } = req.params;

  if (Number(article_id) !== NaN && Number(article_id) <= 13) {
    requireArticleById(article_id).then((data) => {
      res.status(200).send({ data });
    });
  } else if (Number(article_id) !== NaN && Number(article_id) > 13) {
    res.status(204).send("no content found");
  } else {
    res.status(400).send({ msg: "no number is passed in " });
  }
};
