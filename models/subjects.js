const { Sequelize } = require("sequelize");
const database = require("../config/database");
const DataTypes = Sequelize;

const Subject = database.define("Subject", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    teacher: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references : {
            model: "Teachers",
            key: "id"
        }
    }
});

module.exports = Subject;