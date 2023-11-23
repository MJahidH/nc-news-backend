const db = require("../db/connection");

exports.requireArticles = () => {
  return db.query("SELECT * FROM articles").then((body) => {
    return body.rows;
  });
};

exports.requireArticleById = (article_id) => {


  return db
    .query(
      `SELECT * FROM articles 
  WHERE article_id = ${article_id};`
    )
    .then((body) => {
      return body.rows
    });
};
