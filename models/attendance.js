const database = require('../config/database');
const { DataTypes } = require('sequelize');

const Attendance = database.define('Attendance', {
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
    enum: ["present", "absent"]
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

module.exports = Attendance;