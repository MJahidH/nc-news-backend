const { requireArticles } = require("../models /articles.model");

exports.getArticles = (req, res) => {
  requireArticles().then((data) => {
    res.status(200).send(data);
  });
};
