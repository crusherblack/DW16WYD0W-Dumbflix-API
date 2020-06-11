const express = require('express');
const router = express.Router();

const { login } = require('../controllers/auth');
const { auth } = require('../middleware/auth');

// Authentication Routes

router.post('/login', login);

module.exports = router;
