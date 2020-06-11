'use strict';
module.exports = (sequelize, DataTypes) => {
	const Transcation = sequelize.define(
		'Transcation',
		{
			startDate: DataTypes.DATE,
			dueDate: DataTypes.DATE,
			userId: DataTypes.INTEGER,
			attache: DataTypes.STRING,
			status: DataTypes.STRING
		},
		{}
	);
	Transcation.associate = function(models) {
		Transcation.belongsTo(models.User, {
			as: 'userId',
			foreignKey: {
				name: 'userId'
			}
		});
	};
	return Transcation;
};
