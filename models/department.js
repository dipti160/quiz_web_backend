const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("../database");
const Course = require("./course");

const Department = db.define(
  "Department",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "departments",
    timestamps: false,
  }
);

// db.sync()
//   .then(() => {
//     console.log("Department table created successfully");
//   })
//   .catch((error) => {
//     console.error("Error creating user table:", error);
//   });

module.exports = Department;
