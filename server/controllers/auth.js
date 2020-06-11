const { User } = require('../models');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
	try {
		const schema = Joi.object({
			email: Joi.string().email().min(6).required(),
			password: Joi.string().min(6).required()
		});
		const { error } = schema.validate(req.body);

		if (error)
			res.status(400).send({
				error: {
					message: error.details[0].message
				}
			});

		const fakeData = {
			id: 1,
			email: 'iis@gmail.com',
			password: 'lovespiderman'
		};

		const { email, password } = req.body;

		if (fakeData.email == email && fakeData.password) {
			const token = jwt.sign({ id: fakeData.id }, process.env.SECRET_KEY);

			return res.send({
				data: {
					email,
					token
				}
			});
		} else {
			return res.status(400).send({ message: 'Invalid Login' });
		}
	} catch (error) {
		console.log(error);
	}
};

exports.register = async (req, res) => {
	try {
		const schema = Joi.object({
			fullName: Joi.string().min(3).required(),
			email: Joi.string().email().min(6).required(),
			password: Joi.string().min(6).required(),
			gender: Joi.string().required(),
			phone: Joi.string().min(10).required(),
			address: Joi.string().min(10).required(),
			role: Joi.string().required()
		});
		const { error } = schema.validate(req.body);

		console.log(req.body);

		if (error)
			return res.status(400).send({
				error: {
					message: error.details[0].message
				}
			});

		const { email, password } = req.body;

		const checkEmail = await User.findOne({
			where: {
				email
			}
		});
		if (checkEmail)
			return res.status(400).send({
				error: {
					message: 'Email already exist'
				}
			});

		const subscribe = false;

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			...req.body,
			password: hashedPassword,
			subscribe
		});
		const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

		res.send({
			data: {
				email,
				token
			}
		});
	} catch (error) {
		console.log(error);
	}
};
