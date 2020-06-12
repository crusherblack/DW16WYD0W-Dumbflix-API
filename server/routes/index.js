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

const {
	getCategory,
	addCategory,
	editCategory,
	deleteCategory
} = require('../controllers/category');

const { auth } = require('../middleware/auth');
const {
	addTransaction,
	getTransaction,
	editTransaction,
	deleteTransaction
} = require('../controllers/transaction');

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
router.post('/category', auth, addCategory);
router.patch('/category/:id', auth, editCategory);
router.delete('/category/:id', auth, deleteCategory);

// Transcation Routes
router.get('/transaction', getTransaction);
router.post('/transaction', auth, addTransaction);
router.patch('/transaction/:id', auth, editTransaction);
router.delete('/transaction/:id', auth, deleteTransaction);

module.exports = router;
