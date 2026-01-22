const database = require('../config/database');
const { DataTypes } = require('sequelize');

const Section = database.define('Section', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    gradeLevel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    adviserId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
        model: 'Teachers',
        key: 'id'
    }
  }
});

module.exports = Section;