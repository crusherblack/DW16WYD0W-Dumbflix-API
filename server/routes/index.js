const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/auth');

const { auth } = require('../middleware/auth');

module.exports = router;
