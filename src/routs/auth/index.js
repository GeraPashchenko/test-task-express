const router = require('express').Router();
const Validator = require('../../middleware/validator.middleware');
const signInHandler = require('./sign-in');

router.post('/sign-in', Validator('userModel'), signInHandler.handle);

module.exports = router;
