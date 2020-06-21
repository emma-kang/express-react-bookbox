const Sequelize = require('sequelize');

const sequelize = require('../database/dbConnection');

const Authors = sequelize.define('authors', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true, 
        allowNull: false,
        primaryKey: true
    },
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    dob: Sequelize.DATE,
    country: Sequelize.STRING
});

module.exports = Authors;