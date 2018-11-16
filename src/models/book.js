module.exports = (sequelize, DataTypes) => {
	const Book = sequelize.define('Book', {
		title: DataTypes.STRING,
		author: DataTypes.STRING,
		genre: DataTypes.STRING,
		description: DataTypes.STRING,
	}, {});
	Book.associate = (models) => {
		Book.belongsToMany(models.User, { through: 'BookUsers', unique: false });
	};
	return Book;
};
