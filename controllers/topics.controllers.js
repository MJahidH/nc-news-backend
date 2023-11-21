const { requireTopics } = require("../models /topics.model");

exports.getTopics = (req, res) => {
  requireTopics().then((data) => {
    console.log("hello world ")
    
    res.status(200).send(data.rows);
  });
};
