const mongoose = require('mongoose');
const UserDatabaseService = require('./user.service');
const adminUserSeed = require('./admin-user.json');

const connectDB = async () => {
  try {
    mongoose.connect(process.env.DATABASE_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    const isCreatedAdmin = await UserDatabaseService.isExist(adminUserSeed.username);

    if (!isCreatedAdmin) {
      await UserDatabaseService.insertOne(adminUserSeed);
      console.log('Admin seed has been planted');
    }
    console.log("========== Connected to DB ==========");
  } catch (err) {
    console.error(err);
  }
}

module.exports = connectDB;
