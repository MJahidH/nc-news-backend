const { requireTopics } = require("../models /topics.model");

exports.getTopics = (req, res) => {
  requireTopics().then((topics) => {
    if (topics.length === 3) {
      res.status(404).send({ msg: "failed" });
    } else {
      res.status(200).send({ topics });
    }
  });
};
