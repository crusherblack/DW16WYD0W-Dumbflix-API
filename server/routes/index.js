const express = require('express');
const router = express.Router();

const { auth, authAdmin } = require('../middleware/auth');

const { login, register } = require('../controllers/auth');

const { getUser, deleteUser } = require('../controllers/user');

const {
	getFilm,
	getDetailFilm,
	addFilm,
	editFilm,
	deleteFilm
} = require('../controllers/film');

const {
	getCategory,
	addCategory,
	editCategory,
	deleteCategory
} = require('../controllers/category');

const {
	addTransaction,
	getTransaction,
	editTransaction,
	deleteTransaction
} = require('../controllers/transaction');

const { addEpisode, getEpisodesByFilm } = require('../controllers/episode');

// Authentication Routes
router.post('/register', register);
router.post('/login', login);

// User Routes
router.get('/user', auth, authAdmin, getUser);
router.delete('/user/:id', auth, authAdmin, deleteUser);

// Film Routes
router.get('/film', getFilm);
router.get('/film/:id', getDetailFilm);
router.post('/film', auth, authAdmin, addFilm);
router.patch('/film/:id', auth, authAdmin, editFilm);
router.delete('/film/:id', auth, authAdmin, deleteFilm);

// Category Routes
router.get('/category', getCategory);
router.post('/category', auth, authAdmin, addCategory);
router.patch('/category/:id', auth, authAdmin, editCategory);
router.delete('/category/:id', auth, authAdmin, deleteCategory);

// Transcation Routes
router.get('/transaction', getTransaction);
router.post('/transaction', auth, authAdmin, addTransaction);
router.patch('/transaction/:id', auth, authAdmin, editTransaction);
router.delete('/transaction/:id', auth, authAdmin, deleteTransaction);

// Episode Routes
router.post('/episode', auth, authAdmin, addEpisode);
router.get('/film/:id/episodes', auth, authAdmin, getEpisodesByFilm);

module.exports = router;
