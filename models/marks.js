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
  assessmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'Assessments',
        key: 'id'
    }
  },
  scoreObtained: {
    type: DataTypes.INTEGER,
    allowNull: true,
    }
});

module.exports = Mark;