const db = require("../db/connection");

exports.requireArticles = () => {
  return db.query("SELECT * FROM articles").then((body) => {
    return body.rows;
  });
};
