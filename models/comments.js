const database = require('../database');
const { DataTypes, ENUM } = require('sequelize');

const Comment = database.define('Comment', {
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
        model: "user",
        key: "id"
  }
}
});

module.exports = Comment;


