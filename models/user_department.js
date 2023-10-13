const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("../database");

const User = require("./user");
const Department = require("./department");

const UserDepartment = db.define(
  "UserDepartment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Department,
        key: "id",
      },
    },
  },
  {
    tableName: "user_department",
  }
);

// db.sync()
//   .then(() => {
//     console.log("user_department table created successfully");
//   })
//   .catch((error) => {
//     console.error("Error creating user table:", error);
//   });

module.exports = UserDepartment;
