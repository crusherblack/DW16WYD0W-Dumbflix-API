const { User } = require('../models');
const Joi = require('@hapi/joi');

exports.getUser = async (req, res) => {
	try {
		const user = await User.findAll({
			attributes: { exclude: [ 'password' ] }
		});

		if (user) {
			return res.send({
				data: {
					user
				}
			});
		} else {
			return res.status(500).send({ message: 'Server Error' });
		}
	} catch (error) {
		console.log(error);
	}
};
