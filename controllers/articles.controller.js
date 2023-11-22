const { requireArticles } = require("../models /articles.model");
const { requireArticleById } = require("../models /articles.model");

exports.getArticles = (req, res) => {
  requireArticles().then((data) => {
    res.status(200).send(data);
  });
};
exports.getArticlebyId = (req, res) => {
  const { content_id } = req.param;
  requireArticleById(content_id).then((data) => {
    res.status(200).send(data);
  });
};
