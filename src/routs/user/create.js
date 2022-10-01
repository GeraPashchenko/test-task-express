const UserDatabaseService = require('../../database').UserDatabaseService;
const httpCodes = require('http-status-codes').StatusCodes;

module.exports.handle = async (req, res) => {
  try {
    const user = await UserDatabaseService.insertOne(req.body);
    res.json(user);
  } catch (error) {
    res.status(httpCodes.BAD_REQUEST).json({ message: error.message })
  }
}
