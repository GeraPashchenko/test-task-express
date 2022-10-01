const Joi = require('joi');

const userModelSchema = Joi.object({
  username: Joi.string().min(1).required(),
  password: Joi.string().min(4).required(),
  role: Joi.string().valid('user', 'admin').required(),
});

module.exports = userModelSchema;
