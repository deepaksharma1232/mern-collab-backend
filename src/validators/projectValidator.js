const Joi = require('joi');

exports.createProject = Joi.object({
  name: Joi.string().min(2).max(150).required(),
  description: Joi.string().allow('', null),
  teamId: Joi.string().required()
});
