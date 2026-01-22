const database = require('../config/database');
const { DataTypes, ENUM } = require('sequelize');

const Comment = database.define('Comments', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comment: {
    type: DataTypes.TEXT,
    allownull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    ENUM: ['general', 'feedback', 'issue'],
  },
  userId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: "users",
        key: "id"
  }
}
});

module.exports = Comment;


