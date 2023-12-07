const db = require("../db/connection");

exports.requireArticles = () => {
  return db
    .query(
      `SELECT author,title,article_id,topic,created_at,votes,article_img_url FROM articles
       ORDER BY created_at DESC;`
    )
    .then((body) => {
      return body.rows;
    });
};

exports.requireArticleById = (article_id) => {
  return db
    .query(
      `SELECT * FROM articles 
  WHERE article_id = $1 ;`,
      [article_id]
    )
    .then((body) => {
      if (!body.rows[0]) {
        return Promise.reject({
          status: 404,
          msg: "Not Found",
        });
      }
      return body.rows[0];
    });
};

exports.requireUpdate = (articleId, increaseBy) => {
  return db
    .query(
      `UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNing *;    ;`,
      [increaseBy, articleId]
    )
    .then((body) => {
      if (!body.rows[0]) {
        return Promise.reject({
          status: 404,
          msg: "Not Found",
        });
      }
      return body.rows[0];
    });
};
