const db = require("../db/connection");

exports.requireArticles = () => {
  return db.query("SELECT * FROM articles").then((body) => {
    return body.rows;
  });
};

exports.requireArticleById = (content_id) => {
  return db
    .query(
      `SELECT * FROM articles 
  WHERE content_id = ${content_id}`
    )
    .then((body) => {
      return body;
    });
};
