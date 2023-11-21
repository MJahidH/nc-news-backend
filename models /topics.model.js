const db = require("../db/connection");

exports.requireTopics = () => {
  return db.query("SELECT * FROM topics").then((body) => {
    return body.rows
  });
};
