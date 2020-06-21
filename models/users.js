const Sequelize = require('sequelize');

const sequelize = require('../database/dbConnection');

const Users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true, 
        allowNull: false,
        primaryKey: true
    },
    useremail: Sequelize.STRING,
    password: Sequelize.STRING,
    createddate: Sequelize.DATE,
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    isadmin: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});

module.exports = Users;