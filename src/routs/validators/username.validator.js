const Joi = require('joi');

const usernameSchema = Joi.object({
  username: Joi.string().min(1).required(),
});

module.exports = usernameSchema;
