const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("../database");

const Exam = require("./exam");
const Course = require("./course");

const ExamCourse = db.define(
  "ExamCourse",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Course,
        key: "id",
      },
    },
    exam_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Exam,
        key: "id",
      },
    },
  },
  {
    tableName: "exam_course",
  }
);

// db.sync()
//   .then(() => {
//     console.log("ExamCourse table created successfully");
//   })
//   .catch((error) => {
//     console.error("Error creating user table:", error);
//   });

module.exports = ExamCourse;
