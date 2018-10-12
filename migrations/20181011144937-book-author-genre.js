'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BooksAuthorsGenres', {
      bookId: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      authorId: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      genreId: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BooksAuthorsGenres');
  }
};
