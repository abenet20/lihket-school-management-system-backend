const database = require("../config/database");
const { DataTypes, ENUM } = require("sequelize");

const Teacher = database.define("Teacher", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    },
    phone: {
    type: DataTypes.STRING,
    allowNull: true,
    },
    hireDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    },
    status: {
    type: DataTypes.STRING,
    allowNull: false,
    ENUM: ["active", "inactive", "on leave", "retired"],
    defaultValue: "active",
    },
    qualification: {
    type: DataTypes.STRING,
    ENUM: ["B.Ed", "M.Ed", "PhD", "MA", "MSc", "BA", "BSc"],
    allowNull: true,
    },
    userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'Users',
        key: 'id'
    }
}
});

module.exports = Teacher;