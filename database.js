const { Sequelize } = require("sequelize");

const db = new Sequelize("quiz_web", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
  logging: console.log, // Enable query logging
  port: 3306,
});

module.exports = { db };
