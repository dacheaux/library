'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    'Book',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: true }
    },
    {}
  );
  Book.associate = function(models) {
    Book.belongsToMany(models.Author, {
      through: 'BooksAuthorsGenres',
      as: 'author',
      unique: false
    });
    Book.belongsToMany(models.Genre, {
      through: 'BooksAuthorsGenres',
      as: 'genre',
      unique: false
    });
    Book.belongsTo(models.User, {
      foreignKey: 'userId;',
      onDelete: 'CASCADE'
    });
  };
  return Book;
};
