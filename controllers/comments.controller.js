const { requireCommentById } = require("../models /comments.model");
const { insertComment } = require("../models /comments.model");
const { requireDelete } = require("../models /comments.model");

exports.getComments = (req, res, next) => {
  const { id } = req.params;
  requireCommentById(id)
    .then((data) => {
      res.status(200).send({ data });
    })
    .catch(next);
};

exports.addComments = (req, res, next) => {
  const { article_id } = req.params;

  insertComment(req.body, article_id)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteComment = (req, res,next) => {

  const { comment_id } = req.params;

  requireDelete(comment_id).then(() => {
    res.status(204).send();
  }).catch(next)
};
