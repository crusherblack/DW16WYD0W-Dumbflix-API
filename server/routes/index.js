const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers/auth');
const { getUser, deleteUser } = require('../controllers/user');
const { getFilm, getDetailFilm, addFilm } = require('../controllers/film');

const { auth } = require('../middleware/auth');

// Authentication Routes
router.post('/register', register);
router.post('/login', login);

// User Routes
router.get('/user', auth, getUser);
router.delete('/user/:id', auth, deleteUser);

// Film Routes
router.get('/film', getFilm);
router.get('/film/:id', getDetailFilm);
router.post('/film', auth, addFilm);

module.exports = router;
