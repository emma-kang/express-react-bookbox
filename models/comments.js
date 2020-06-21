const Sequelize = require('sequelize');

const sequelize = require('../database/dbConnection');
const Users = require('./users');

const Comments = sequelize.define('comments', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true, 
        allowNull: false,
        primaryKey: true
    },
    postingdate: Sequelize.DATE,
    userid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    },
    body: Sequelize.STRING
});

module.exports = Comments;