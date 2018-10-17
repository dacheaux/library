module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		firstname: {
			type: Sequelize.STRING,
		},
		lastname: {
			type: Sequelize.STRING,
		},
		createdAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
		updatedAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
	}),
	down: queryInterface => queryInterface.dropTable('Users'),
};
