'use strict';
const Authors = require('../models/authors');

module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: DataTypes.STRING,
    authorid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Authors,
        key: 'id'
      }
    },
    publisher: DataTypes.STRING,
    published: DataTypes.DATE,
    category: DataTypes.STRING,
    isbn: {
      type: DataTypes.STRING,
      unique: true
    },
    language: DataTypes.STRING,
    imageurl: DataTypes.STRING
  }, {});
  Books.associate = function(models) {
    // associations can be defined here
  };
  return Books;
};