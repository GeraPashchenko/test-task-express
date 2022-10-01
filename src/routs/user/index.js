const router = require('express').Router();
const Validator = require('../../middleware/validator.middleware');
const authMiddleware = require('../../middleware/auth.middleware');
const getUserHandler = require('./get');
const createUserHandler = require('./create');
const listUsersHandler = require('./list');
const deleteUsersHandler = require('./delete');
const updateUserHandler = require('./update');

router.get('/:username', Validator('username'), authMiddleware, getUserHandler.handle);

router.post('', Validator('userModel'), authMiddleware, createUserHandler.handle);

router.get('', listUsersHandler.handle);

router.delete('', Validator('username'), authMiddleware, deleteUsersHandler.handle);

router.put('', Validator('userModel'), authMiddleware, updateUserHandler.handle);

module.exports = router;
