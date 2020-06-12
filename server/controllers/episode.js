const { Episode, Film, Category } = require('../models');
const Joi = require('@hapi/joi');

exports.getEpisodesByFilm = async (req, res) => {
	try {
		const { id: filmId } = req.params;

		const film = await Episode.findAll({
			where: {
				filmId
			},
			include: {
				model: Film,
				as: 'film',
				attributes: {
					exclude: [ 'createdAt', 'updatedAt', 'categoryId' ]
				},
				include: {
					model: Category,
					as: 'category',
					attributes: {
						exclude: [ 'createdAt', 'updatedAt' ]
					}
				}
			},

			attributes: {
				exclude: [ 'createdAt', 'updatedAt', 'FilmId', 'filmId' ]
			}
		});

		//return console.log(film);

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

exports.addEpisode = async (req, res) => {
	try {
		const schema = Joi.object({
			title: Joi.string().min(3).required(),
			thumbnailFilm: Joi.string().required(),
			linkFilm: Joi.string().required(),
			filmId: Joi.number().required()
		});
		const { error } = schema.validate(req.body);

		if (error)
			return res.status(400).send({
				error: {
					message: error.details[0].message
				}
			});

		const episode = await Episode.create(req.body);

		if (episode) {
			const episodeResult = await Episode.findOne({
				where: {
					id: episode.id
				},
				include: {
					model: Film,
					as: 'film',
					attributes: {
						exclude: [ 'createdAt', 'updatedAt' ]
					}
				},
				attributes: { exclude: [ 'createdAt', 'updatedAt', 'filmId', 'FilmId' ] }
			});

			return res.send({
				data: episodeResult
			});
		} else {
			return res.status(400).send({ message: 'Please Try Again' });
		}
	} catch (error) {
		console.log(error);
	}
};
