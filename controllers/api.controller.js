const { requireApi } = require("../models /api.model");


exports.getApi = (req, res,next) => {

  requireApi().then((endPointData) => {
    res.status(200).send({endPointData})   
  }).catch(next)
};
