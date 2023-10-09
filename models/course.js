const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("../database");

const Department = require("./department");

const Course = db.define(
  "Course",
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
    tableName: "courses",
  }
);

Course.belongsTo(Department, {
  as: "Department",
  foreignKey: "department_id",
});

// db.sync()
//   .then(() => {
//     console.log("Course table created successfully");
//   })
//   .catch((error) => {
//     console.error("Error creating user table:", error);
//   });

module.exports = Course;
