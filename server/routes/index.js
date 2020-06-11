const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers/auth');
const { auth } = require('../middleware/auth');

// Authentication Routes
router.post('/register', register);
router.post('/login', login);

module.exports = router;
