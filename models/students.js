const dataTypes = require("sequelize").DataTypes;
const database = require("../config/database");

const Student = database.define("Student", {
    id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: dataTypes.STRING,
        allowNull: false,
    },
    age: { 
        type: dataTypes.INTEGER,
        allowNull: false,
    },
    gender: {
        type: dataTypes.STRING,
        allowNull: false,
    },
    grade: {
        type: dataTypes.STRING,
        allowNull: false,
    },
    section: {
        // store section id (will be associated in models/index.js)
        type: dataTypes.INTEGER,
        allowNull: true,
    },
    phone: {
        type: dataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: dataTypes.STRING,
        allowNull: true,
    },
    enrollmentDate: {
        type: dataTypes.DATE,
        allowNull: false,
        defaultValue: dataTypes.NOW,
    },
    status: {
        type: dataTypes.ENUM('active', 'inactive', 'graduated', 'suspended'),
        allowNull: false,
        defaultValue: 'active',
    },
    userId: {
        type: dataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
    },
    lastYearAverage: {
        type: dataTypes.FLOAT,
        allowNull: true,
    },

});

module.exports = Student;