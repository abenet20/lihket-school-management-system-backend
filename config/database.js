const Sequelize = require('sequelize');

const database = new Sequelize(
  "lihket_school_management_system",
  "root",
  "",
  {
    host: "localhost",
    dialect: "mysql",
    logging: false, // disable SQL logs
  }
);

module.exports = database;