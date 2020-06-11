const { Category } = require('../models');
const Joi = require('@hapi/joi');

exports.getCategory = async (req, res) => {
	try {
		const category = await Category.findAll({
			attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
		});

		if (category) {
			return res.send({
				data: category
			});
		} else {
			return res.status(400).send({ message: 'Category Not Found' });
		}
	} catch (error) {
		console.log(error);
	}
};

exports.addCategory = async (req, res) => {
	try {
		const schema = Joi.object({
			name: Joi.string().min(3).required()
		});
		const { error } = schema.validate(req.body);

		if (error)
			return res.status(400).send({
				error: {
					message: error.details[0].message
				}
			});

		const category = await Category.create(req.body);

		if (category) {
			return res.send({
				data: category
			});
		} else {
			return res.status(400).send({ message: 'Please Try Again' });
		}
	} catch (error) {
		console.log(error);
	}
};
