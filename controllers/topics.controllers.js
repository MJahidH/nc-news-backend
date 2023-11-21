const { requireTopics } = require("../models /topics.model");

exports.getTopics = (req, res) => {
  requireTopics().then((data) => {
    res.status(200).send(data.rows);
  });
};
