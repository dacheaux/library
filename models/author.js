'use strict';
module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define(
    'Author',
    {
      name: { type: DataTypes.STRING, allowNull: false }
    },
    {}
  );
  Author.associate = function(models) {
    Author.belongsToMany(models.Book, {
      through: 'BooksAuthorsGenres',
      as: 'book',
      unique: false
    });
    Author.belongsToMany(models.Genre, {
      through: 'BooksAuthorsGenres',
      as: 'genre',
      unique: false
    });
  };
  return Author;
};
