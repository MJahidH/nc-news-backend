const { requireArticles } = require("../models /articles.model");

exports.getArticles = (req, res,next) => {
  requireArticles().then((data) => {
    res.status(200).send({ articles: data });
  }).catch(next)
};
