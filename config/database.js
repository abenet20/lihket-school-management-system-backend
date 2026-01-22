const Sequelize = require('sequelize');

const database = new Sequelize(
  "sql12815009",
  "sql12815009",
  "r8ejNgfBhQ",
  {
    host: "sql12.freesqldatabase.com",
    dialect: "mysql",
    logging: false, // disable SQL logs
  }
);

module.exports = database;