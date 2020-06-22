'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    useremail: DataTypes.STRING,
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    isadmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};