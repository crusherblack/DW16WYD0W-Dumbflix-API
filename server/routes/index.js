const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers/auth');
const { getUser, deleteUser } = require('../controllers/user');
const { auth } = require('../middleware/auth');

// Authentication Routes
router.post('/register', register);
router.post('/login', login);

// User Routes
router.get('/user', auth, getUser);
router.delete('/user/:id', auth, deleteUser);

module.exports = router;
