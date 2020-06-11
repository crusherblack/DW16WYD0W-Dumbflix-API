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
