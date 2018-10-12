'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    name: DataTypes.STRING
  }, {});
  Genre.associate = function(models) {
    Genre.belongsToMany(models.Book, {
      through: 'BooksAuthorsGenres',
      as: 'book',
      unique: false
    });
    Genre.belongsToMany(models.Author, {
      through: 'BooksAuthorsGenres',
      as: 'author',
      unique: false
    });
  };
  return Genre;
};