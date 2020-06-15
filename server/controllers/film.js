const {
	Film,
	Category,
	Episode
} = require("../models");
const Joi = require("@hapi/joi");
const {
	response
} = require("express");

exports.getFilm = async (req, res) => {
	try {
		const page = 0;
		const pageSize = 10;

		const paginate = ({
			page,
			pageSize
		}) => {
			const offset = page * pageSize;
			const limit = pageSize;

			return {
				offset,
				limit,
			};
		};

		const film = await Film.findAll({
			include: [{
					model: Episode,
					as: "episodes",
					attributes: {
						exclude: ["createdAt", "updatedAt", "filmId", "FilmId"],
					},
				},
				{
					model: Category,
					as: "category",
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt", "categoryId"]
			},
			...paginate({
				page,
				pageSize
			}),
		});

		if (film) {
			return res.send({
				data: film,
				paginationInfo: {
					currentPage: page + 1,
					totalData: await Film.count(),
				},
			});
		} else {
			return res.status(400).send({
				error: {
					message: "Films Not Found"
				}

			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			error: {
				message: "Server Error"
			}
		});
	}
};

//gak pake tapi ini adalah hasMany Relationship
exports.getFilmEpisodeCategory = async (req, res) => {
	try {
		const {
			id: IdFilm
		} = req.params;

		const film = await Film.findAll({
			include: [{
					model: Episode,
					as: "episodes",
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
				{
					model: Category,
					as: "category",
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
			],

			attributes: {
				exclude: ["createdAt", "updatedAt", "categoryId"],
			},
		});

		//return console.log(film);

		if (film) {
			return res.send({
				data: film,
			});
		} else {
			return res.status(400).send({
				message: "Films Not Found"
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			error: {
				message: "Server Error"
			}
		});
	}
};

exports.getDetailFilm = async (req, res) => {
	try {
		const {
			id
		} = req.params;
		const film = await Film.findOne({
			where: {
				id,
			},
			include: {
				model: Category,
				as: "category",
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			},
			attributes: {
				exclude: ["createdAt", "updatedAt", "categoryId"]
			},
		});

		if (film) {
			return res.send({
				data: film,
			});
		} else {
			return res.status(400).send({
				message: "Films Not Found"
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			error: {
				message: "Server Error"
			}
		});
	}
};

exports.addFilm = async (req, res) => {
	try {
		const schema = Joi.object({
			title: Joi.string().min(3).required(),
			thumbnailFilm: Joi.string().required(),
			year: Joi.number().integer().min(1900).max(2020).required(),
			category: Joi.required(),
			description: Joi.string().min(10).required(),
		});
		const {
			error
		} = schema.validate(req.body);

		if (error)
			return res.status(400).send({
				error: {
					message: error.details[0].message,
				},
			});

		const {
			category
		} = req.body;

		const cekCategory = await Category.findOne({
			where: {
				id: category.id,
			},
		});

		if (!cekCategory)
			return res.status(400).send({
				message: "Category Not Found"
			});

		const film = await Film.create({
			...req.body,
			categoryId: category.id,
		});

		if (film) {
			const filmResult = await Film.findOne({
				where: {
					id: film.id,
				},
				include: {
					model: Category,
					as: "category",
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
				attributes: {
					exclude: ["createdAt", "updatedAt"]
				},
			});

			return res.send({
				data: filmResult,
			});
		} else {
			return res.status(400).send({
				message: "Please Try Again"
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			error: {
				message: "Server Error"
			}
		});
	}
};

exports.editFilm = async (req, res) => {
	try {
		const schema = Joi.object({
			title: Joi.string().min(3).required(),
			thumbnailFilm: Joi.string().required(),
			year: Joi.required(),
			category: Joi.required(),
			description: Joi.string().min(10).required(),
		});
		const {
			error
		} = schema.validate(req.body);

		if (error)
			return res.status(400).send({
				error: {
					message: error.details[0].message,
				},
			});

		const {
			id
		} = req.params;

		const {
			category: {
				id: categoryId
			},
		} = req.body;

		const film = await Film.update({
			...req.body,
			categoryId,
		}, {
			where: {
				id,
			},
		});

		if (film) {
			const filmResult = await Film.findOne({
				where: {
					id,
				},
				include: {
					model: Category,
					as: "category",
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
				attributes: {
					exclude: ["createdAt", "updatedAt", "categoryId"]
				},
			});
			return res.send({
				data: filmResult,
			});
		} else {
			return res.status(400).send({
				message: "Films Not Found"
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			error: {
				message: "Server Error"
			}
		});
	}
};

exports.deleteFilm = async (req, res) => {
	try {
		const {
			id
		} = req.params;
		const film = await Film.findOne({
			where: {
				id,
			},
		});

		if (film) {
			await Film.destroy({
				where: {
					id,
				},
			});

			return res.send({
				data: {
					id,
				},
			});
		} else {
			return res.status(400).send({
				message: "Film Not Found"
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			error: {
				message: "Server Error"
			}
		});
	}
};