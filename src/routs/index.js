const express = require('express');
const router = express.Router();

const userRouts = require('./user');
const authRouts = require('./auth');

router.use('/users', userRouts);

router.use('', authRouts);

module.exports = router;
