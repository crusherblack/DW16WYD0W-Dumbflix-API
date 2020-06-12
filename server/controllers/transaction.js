const { Transaction, User } = require('../models');
const Joi = require('@hapi/joi');

exports.getTransaction = async (req, res) => {
	try {
		const transaction = await Transaction.findAll({
			include: {
				model: User,
				as: 'userld',
				attributes: {
					exclude: [ 'createdAt', 'updatedAt', 'password' ]
				}
			},
			attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
		});

		if (transaction) {
			return res.send({
				data: transaction
			});
		} else {
			return res.status(400).send({ message: 'Transaction Not Found' });
		}
	} catch (error) {
		console.log(error);
	}
};

exports.addTransaction = async (req, res) => {
	try {
		const schema = Joi.object({
			startDate: Joi.date().required(),
			dueDate: Joi.date().required(),
			userId: Joi.number().required(),
			attache: Joi.required(),
			status: Joi.string().required()
		});
		const { error } = schema.validate(req.body);

		if (error)
			return res.status(400).send({
				error: {
					message: error.details[0].message
				}
			});

		const transaction = await Transaction.create(req.body);

		if (transaction) {
			const transactionResult = await Transaction.findOne({
				where: {
					id: transaction.id
				},
				include: {
					model: User,
					as: 'userld',
					attributes: {
						exclude: [ 'createdAt', 'updatedAt', 'password' ]
					}
				},
				attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
			});

			return res.send({
				data: transactionResult
			});
		} else {
			return res.status(400).send({ message: 'Please Try Again' });
		}
	} catch (error) {
		console.log(error);
	}
};

exports.editTransaction = async (req, res) => {
	try {
		const { id } = req.params;
		const schema = Joi.object({
			startDate: Joi.date().required(),
			dueDate: Joi.date().required(),
			userId: Joi.number().required(),
			attache: Joi.required(),
			status: Joi.string().required()
		});
		const { error } = schema.validate(req.body);

		if (error)
			return res.status(400).send({
				error: {
					message: error.details[0].message
				}
			});

		const transaction = await Transaction.update(req.body, {
			where: {
				id
			}
		});

		if (transaction) {
			const resultTransaction = await Transaction.findOne({
				where: {
					id
				},
				include: {
					model: User,
					as: 'userld',
					attributes: {
						exclude: [ 'createdAt', 'updatedAt', 'password' ]
					}
				},
				attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
			});

			return res.send({
				data: resultTransaction
			});
		} else {
			return res.status(400).send({ message: 'Please Try Again' });
		}
	} catch (error) {
		console.log(error);
	}
};

exports.deleteTransaction = async (req, res) => {
	try {
		const { id } = req.params;
		const transaction = await Transaction.findOne({
			where: {
				id
			}
		});

		if (transaction) {
			await Transaction.destroy({
				where: {
					id
				}
			});

			return res.send({
				data: {
					id
				}
			});
		} else {
			return res.status(400).send({ message: 'Transaction Not Found' });
		}
	} catch (error) {
		console.log(error);
	}
};
