const database = require('../config/database');
const { DataTypes } = require('sequelize');

const user = database.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
    username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    },
    password: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    name: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    },
    role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'student',
    },
    photoPath: {
    type: DataTypes.STRING,
    allowNull: true,
    }
});

module.exports = user;