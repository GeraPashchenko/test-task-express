const createHttpError = require('http-errors')
const Validators = require('../routs/validators');
const httpCodes = require('http-status-codes').StatusCodes;

module.exports = function (validator) {
  if (!Validators.hasOwnProperty(validator))
    throw new Error(`'${validator}' validator is not exist`);

  return async function (req, res, next) {
    try {
      if (req.body) {
        const validated = await Validators[validator].validateAsync(req.body);
        req.body = validated;
      } else if (req.params) {
        const validated = await Validators[validator].validateAsync(req.params);
        req.params = validated;
      } else if (req.query) {
        const validated = await Validators[validator].validateAsync(req.query);
        req.query = validated;
      }
      next();
    } catch (err) {
      if (err.isJoi)
        return next(createHttpError(httpCodes.UNPROCESSABLE_ENTITY, { message: err.message }));
      next(createHttpError(httpCodes.INTERNAL_SERVER_ERROR));
    }
  }
}
