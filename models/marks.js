const database = require('../config/database');
const { DataTypes } = require('sequelize');

const Mark = database.define('Mark', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'Students',
        key: 'id'
    }
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  outOf: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
  scored: {
    type: DataTypes.INTEGER,
    allowNull: true,
    },
  teacherId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'Teachers',
        key: 'id'
    }
    },
    date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    }
});

module.exports = Mark;