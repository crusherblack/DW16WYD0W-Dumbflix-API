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
			attributes: { exclude: [ 'createdAt', 'updatedAt', 'categoryId' ] }
		});

		if (film) {
			return res.send({
				data: film
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
			attributes: { exclude: [ 'createdAt', 'updatedAt', 'categoryId' ] }
		});

		if (film) {
			return res.send({
				data: film
			});
		} else {
			return res.status(400).send({ message: 'Films Not Found' });
		}
	} catch (error) {
		console.log(error);
	}
};

exports.addFilm = async (req, res) => {
	try {
		const schema = Joi.object({
			title: Joi.string().min(3).required(),
			thumbnailFilm: Joi.string().required(),
			year: Joi.number().integer().min(1900).max(2020).required(),
			category: Joi.required(),
			description: Joi.string().min(10).required()
		});
		const { error } = schema.validate(req.body);

		if (error)
			return res.status(400).send({
				error: {
					message: error.details[0].message
				}
			});

		const { category } = req.body;

		const film = await Film.create({
			...req.body,
			categoryId: category.id
		});

		if (film) {
			const filmResult = await Film.findOne({
				where: {
					id: film.id
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

			return res.send({
				data: filmResult
			});
		} else {
			return res.status(400).send({ message: 'Please Try Again' });
		}
	} catch (error) {
		console.log(error);
	}
};

exports.editFilm = async (req, res) => {
	try {
		const schema = Joi.object({
			title: Joi.string().min(3).required(),
			thumbnailFilm: Joi.string().required(),
			year: Joi.required(),
			category: Joi.required(),
			description: Joi.string().min(10).required()
		});
		const { error } = schema.validate(req.body);

		if (error)
			return res.status(400).send({
				error: {
					message: error.details[0].message
				}
			});

		const { id } = req.params;

		const { category: { id: categoryId } } = req.body;

		const film = await Film.update(
			{
				...req.body,
				categoryId
			},
			{
				where: {
					id
				}
			}
		);

		if (film) {
			const filmResult = await Film.findOne({
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
				attributes: { exclude: [ 'createdAt', 'updatedAt', 'categoryId' ] }
			});
			return res.send({
				data: filmResult
			});
		} else {
			return res.status(400).send({ message: 'Films Not Found' });
		}
	} catch (error) {
		console.log(error);
	}
};

exports.deleteFilm = async (req, res) => {
	try {
		const { id } = req.params;
		const film = await Film.findOne({
			where: {
				id
			}
		});

		if (film) {
			await Film.destroy({
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
			return res.status(400).send({ message: 'Film Not Found' });
		}
	} catch (error) {
		console.log(error);
	}
};
