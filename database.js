const { Sequelize } = require("sequelize");

const db = new Sequelize("quiz_web", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = { db };
