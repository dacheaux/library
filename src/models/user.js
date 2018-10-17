module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			firstname: DataTypes.STRING,
			lastname: DataTypes.STRING,
		},
		{}
	);
	User.associate = (models) => {
		User.belongsToMany(models.Book, { through: 'BookUsers', unique: false });
	};
	return User;
};
