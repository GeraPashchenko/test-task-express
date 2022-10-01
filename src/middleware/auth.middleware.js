const createHttpError = require('http-errors')
const httpCodes = require('http-status-codes').StatusCodes;
const jsonwebtoken = require('jsonwebtoken');
const UserDatabaseService = require('../database').UserDatabaseService;

module.exports = async function (req, res, next) {
  try {
    const token = getToken(req.headers);
    const decodedUser = jsonwebtoken.verify(token, process.env.JWT_SECRET_STRING);
    const user = await UserDatabaseService.findOne(decodedUser.username);

    req.user = user;
    req.token = token;
    return next();
  } catch (error) {
    return next(createHttpError(httpCodes.UNPROCESSABLE_ENTITY, { message: error.message }));
  }
}

function getToken(headers) {
  if (!headers || !headers.authorization) {
    throw new Error('Token is not provided');
  }
  const splittedHeader = headers.authorization.split(' ');

  if (splittedHeader.length !== 2) {
    throw new Error('Wrong header');
  }

  const token = headers.authorization.split(' ')[1];
  return token;
}