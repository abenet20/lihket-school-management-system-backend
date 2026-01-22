const database = require('../config/database');
const { DataTypes } = require('sequelize');

const Tardy = database.define('Tardy', {
 id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
 },
 studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: "Students",
        key: "id"
    }
 },
 date: {
   type: DataTypes.DATE,
   allowNull: false,
   defaultValue: DataTypes.NOW
 },
 status: {
    type: DataTypes.STRING,
    allowNull: false,
    enum: ["late", "not-late"]
 },
createdBy: {
   type: DataTypes.INTEGER,
   allowNull: false,
   references: {
    model: "Teachers",
    key: "id"
 }
}
});

module.exports = Tardy;