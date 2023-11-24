const { requireArticles } = require("../models /articles.model");

const { requireArticleById } = require("../models /articles.model");

exports.getArticles = (req, res) => {
  requireArticles().then((data) => {
    res.status(200).send({ articles: data });
  });
};
exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  requireArticleById(article_id)
    .then((data) => {
      res.status(200).send({ data });
    })
    .catch(next);
};
