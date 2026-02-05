const database = require("../config/database");
const DataTypes = require("sequelize");

const Assessment = database.define("Assessment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Subjects",
            key: "id"
        }
    },
    assessmentType: {
        type: DataTypes.ENUM("exam", "quiz", "assignment", "project", "participation"),
        allowNull: false
    },
    maxScore: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Assessment;