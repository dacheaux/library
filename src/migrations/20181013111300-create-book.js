module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('Books', {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		title: {
			type: Sequelize.STRING,
		},
		author: {
			type: Sequelize.STRING,
		},
		genre: {
			type: Sequelize.STRING,
		},
		description: {
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
	down: queryInterface => queryInterface.dropTable('Books'),
};
