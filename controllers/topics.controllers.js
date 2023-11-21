const { requireTopics } = require("../models /topics.model");

exports.getTopics = (req, res) => {
  requireTopics().then((topics) => {
  
    res.status(200).send({topics});
  });
};
