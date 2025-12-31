const database = require('../config/database');
const { DataTypes, ENUM } = require('sequelize');

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
    }
    ,
    postedBy: {
       type: DataTypes.INTEGER,
       allowNull: false,
       references: {
        model: "user",
        key: "id"
       }
    }

});

module.exports = Announcement;