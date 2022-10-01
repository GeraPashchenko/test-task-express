const UserDatabaseService = require('../../database').UserDatabaseService;
const httpCodes = require('http-status-codes').StatusCodes;

module.exports.handle = async (req, res) => {
  const { username } = req.body;

  try {
    await UserDatabaseService.deleteOne(username);
    res.json({ message: `Deleted user with username: ${username}` });
  } catch (error) {
    res.status(httpCodes.BAD_REQUEST).json({ message: error.message })
  }
}
