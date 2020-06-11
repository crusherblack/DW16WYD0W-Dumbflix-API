const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers/auth');

const { getUser, deleteUser } = require('../controllers/user');

const {
	getFilm,
	getDetailFilm,
	addFilm,
	editFilm,
	deleteFilm
} = require('../controllers/film');

const { getCategory } = require('../controllers/category');

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
router.patch('/film/:id', auth, editFilm);
router.delete('/film/:id', auth, deleteFilm);

// Category Routes
router.get('/category', getCategory);

module.exports = router;
