const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("../database");
const User = require("./user");

const StudentInstructor = db.define(
  "StudentInstructor",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    instructor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    tableName: "student_instructor",
  }
);

// db.sync()
//   .then(() => {
//     console.log("student_instructor table created successfully");
//   })
//   .catch((error) => {
//     console.error("Error creating user table:", error);
//   });

module.exports = StudentInstructor;
