const database = require('../config/database');
const { DataTypes, ENUM } = require('sequelize');
const users = require('./users');

const Announcement = database.define("Announcements",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
        ENUM: ["active", "Inactive"]
    },
    postedBy: {
       type: DataTypes.INTEGER,
       allowNull: false,
       references: {
        model: users,
        key: "id"
       }
    },
    target: {
        type: DataTypes.STRING,
        ENUM: ["all", "students","teachers"],
        defaultValue: "all"
    }

});

module.exports = Announcement;