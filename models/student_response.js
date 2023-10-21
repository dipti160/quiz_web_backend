const { DataTypes } = require("sequelize");
const { db } = require("../database");
const Exam = require("./exam");
const User = require("./user");
const Question = require("./question");

const StudentResponse = db.define(
  "StudentResponse",
  {
    exam_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Exam,
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
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Question,
        key: "id",
      },
    },
    selected_option_ids: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "student_responses",
  }
);

// db.sync()
//   .then(() => {
//     console.log("student_responses table created successfully");
//   })
//   .catch((error) => {
//     console.error("Error creating user table:", error);
//   });

module.exports = StudentResponse;
