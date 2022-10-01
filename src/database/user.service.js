const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports.isExist = async (username) => {
  const user = await UserModel.exists({ username });
  return user === null ? false : true;
};

module.exports.findOne = async (username) => {
  const isExist = await this.isExist(username);

  if (!isExist) throw new Error('User does not exist');

  const user = await UserModel.findOne({ username }, { password: 0, _id: 0, __v: 0 });
  return user;
};

module.exports.findOneWithPassword = async (username) => {
  const isExist = await this.isExist(username);

  if (!isExist) throw new Error('User does not exist');

  const user = await UserModel.findOne({ username }, { _id: 0, __v: 0 });
  return user;
};

module.exports.find = async () => {
  const users = await UserModel.find({});
  return users;
};

module.exports.insertOne = async (user) => {
  const isExist = await this.isExist(user.username);

  if (isExist) throw new Error('User already exists');

  try {
    user.password = bcrypt.hashSync(user.password, 10);
    await UserModel.create(user);

    const createdUser = await this.findOne(user.username);
    return createdUser;
  } catch (error) {
    throw new Error(error)
  }
};

module.exports.update = async (updateData) => {
  const isExist = await this.isExist(updateData.username);

  if (!isExist) throw new Error('User does not exist');

  try {
    const updatedUser = await UserModel
      .findOneAndUpdate(
        { username },
        updateData,
        {
          projection: { password: 0 },
          returnDocument: true
        });
    return updatedUser;
  } catch (error) {
    throw new Error(error)
  }
};

module.exports.deleteOne = async (username) => {
  const isExist = await this.isExist(username);

  if (!isExist) throw new Error('User does not exist');

  try {
    await UserModel.deleteOne({ username });
  } catch (error) {

    throw new Error(error)
  }
};
