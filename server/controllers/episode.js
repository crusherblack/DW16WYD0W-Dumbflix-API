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
		return res.status(500).send({ message: 'Server Error' });
	}
};

exports.getDetailEpisode = async (req, res) => {
	try {
		const { idFilm, idEpisode } = req.params;

		const film = await Film.findOne({
			where: {
				id: idFilm
			}
		});

		if (!film) return res.status(400).send({ message: 'Film Not Found' });

		const episode = await Episode.findAll({
			where: {
				id: idEpisode
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

		if (episode) {
			return res.send({
				data: episode
			});
		} else {
			return res.status(400).send({ message: 'Episode Not Found' });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({ message: 'Server Error' });
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
		return res.status(500).send({ message: 'Server Error' });
	}
};

exports.editEpisode = async (req, res) => {
	try {
		const { id } = req.params;

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

		const episode = await Episode.update(req.body, {
			where: {
				id
			}
		});

		if (episode) {
			const episodeResult = await Episode.findOne({
				where: {
					id
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
			return res.send({
				data: episodeResult
			});
		} else {
			return res.status(400).send({ message: 'Films Not Found' });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({ message: 'Server Error' });
	}
};

exports.deleteEpisode = async (req, res) => {
	try {
		const { id } = req.params;
		const episode = await Episode.findOne({
			where: {
				id
			}
		});

		if (episode) {
			await Episode.destroy({
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
			return res.status(400).send({ message: 'Episode Not Found' });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({ message: 'Server Error' });
	}
};
