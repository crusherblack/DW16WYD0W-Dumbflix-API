const { Film, Category } = require('../models');
const Joi = require('@hapi/joi');

exports.getFilm = async (req, res) => {
	try {
		const film = await Film.findAll({
			include: {
				model: Category,
				as: 'category',
				attributes: {
					exclude: [ 'createdAt', 'updatedAt' ]
				}
			},
			attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
		});

		if (film) {
			return res.send({
				data: {
					film
				}
			});
		} else {
			return res.status(400).send({ message: 'Films Not Found' });
		}
	} catch (error) {
		console.log(error);
	}
};

exports.getDetailFilm = async (req, res) => {
	try {
		const { id } = req.params;
		const film = await Film.findOne({
			where: {
				id
			},
			include: {
				model: Category,
				as: 'category',
				attributes: {
					exclude: [ 'createdAt', 'updatedAt' ]
				}
			},
			attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
		});

		if (film) {
			return res.send({
				data: {
					film
				}
			});
		} else {
			return res.status(400).send({ message: 'Films Not Found' });
		}
	} catch (error) {
		console.log(error);
	}
};
