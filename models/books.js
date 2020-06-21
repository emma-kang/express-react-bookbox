const Sequelize = require('sequelize');

const sequelize = require('../database/dbConnection');

const Books = sequelize.define('books', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true, 
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    authorid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Authors,
            key: 'id'
        }
    },
    publisher: Sequelize.STRING,
    published: Sequelize.DATE,
    category: Sequelize.STRING,
    isbn: Sequelize.STRING,
    imageurl: Sequelize.STRING,
    description: Sequelize.STRING
});

module.exports = Books;