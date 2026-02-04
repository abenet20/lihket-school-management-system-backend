const Sequelize = require('sequelize');

const database = new Sequelize(
  "lihket",
  "root",
  "",
  {
    host: "localhost",
    dialect: "mysql",
    logging: false, // disable SQL logs
  }
);

module.exports = database;