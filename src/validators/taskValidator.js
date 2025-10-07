const Joi = require('joi');

exports.createTask = Joi.object({
  title: Joi.string().min(2).required(),
  description: Joi.string().allow('', null),
  projectId: Joi.string().required(),
  assignedTo: Joi.string().allow(null)
});

exports.updateTask = Joi.object({
  title: Joi.string().min(2).optional(),
  description: Joi.string().allow('', null).optional(),
  status: Joi.string().valid('todo','in-progress','done').optional(),
  assignedTo: Joi.string().optional()
});
