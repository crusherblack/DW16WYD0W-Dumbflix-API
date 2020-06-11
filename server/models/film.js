'use strict';
module.exports = (sequelize, DataTypes) => {
	const Film = sequelize.define(
		'Film',
		{
			title: DataTypes.STRING,
			thumbnailFilm: DataTypes.STRING,
			year: DataTypes.INTEGER,
			categoryId: DataTypes.INTEGER,
			description: DataTypes.TEXT
		},
		{}
	);
	Film.associate = function(models) {
		Film.belongsTo(models.Category, {
			as: 'parent',
			foreignKey: {
				name: 'categoryId'
			}
		});
	};
	return Film;
};
