const UserDatabaseService = require('../../database').UserDatabaseService;
const httpCodes = require('http-status-codes').StatusCodes;
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.handle = async (req, res) => {
  try {
    const user = await UserDatabaseService.findOneWithPassword(req.body.username);
    const isMatchedPassword = bcrypt.compareSync(req.body.password, user.password);

    if (!isMatchedPassword) res.status(httpCodes.BAD_REQUEST).json({ message: 'Wrong password' });
    const token = jsonwebtoken.sign(user.toJSON(), process.env.JWT_SECRET_STRING);

    res.json({ user, token });
  } catch (error) {
    res.status(httpCodes.BAD_REQUEST).json({ message: error.message })
  }
}
