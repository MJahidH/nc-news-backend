const db = require("../db/connection");
const users = require("../db/data/test-data/users");

exports.requireCommentById = (article_id) => {
  return db
    .query(
      `SELECT *  FROM  comments
    WHERE article_id = $1
    ORDER BY created_at DESC;`,
      [article_id]
    )
    .then((body) => {
      if (!body.rows[0]) {
        return Promise.reject({
          status: 404,
          msg: "Not Found",
        });
      }
      return body.rows;
    });
};

exports.insertComment = (newComment, article_id) => {
  const { username, body } = newComment;

  if (!username || !body) {
    return Promise.reject({
      status: 404,
      msg: "Not Found",
    });
  } else {
    return db
      .query(
        `INSERT INTO comments (author,body,article_id)
  VALUES 
  ($1,$2,$3)   
  RETURNING *;`,
        [username, body, article_id]
      )
      .then((body) => {
        const outputtedComment = body.rows[0];
        const checkIfUsernameExists = users.filter((obj) => {
          return obj.username === outputtedComment.author;
        });
        return outputtedComment;
      });
  }
};

exports.requireDelete = (comment_id) => {
  return db
    .query(
      `DELETE FROM comments 
  WHERE comment_id = $1`,
      [comment_id]
    )
    .then((body) => {
      if (!body.rowCount) {
        return Promise.reject({
          status : 404,
          msg : "Not Found"
        })
      }
      return body.rowCount
    });
};
