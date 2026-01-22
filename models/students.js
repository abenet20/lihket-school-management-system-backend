const dataTypes = require("sequelize").DataTypes;
const database = require("../config/database");
const user = require("./users");

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
        type: dataTypes.STRING,
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
    status:{
        type: dataTypes.STRING,
        allowNull: false,
        ENUM: ["active", "inactive", "graduated", "suspended"],
        defaultValue: "active",
    },
    userId: {
        type: dataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user,
            key: 'id',
        },
    },
    lastYearAverage: {
        type: dataTypes.FLOAT,
        allowNull: true,
    },

});

module.exports = Student;