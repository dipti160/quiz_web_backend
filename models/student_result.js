const { DataTypes } = require("sequelize");
const { db } = require("../database");
const Exam = require("./exam");
const User = require("./user");

const StudentResult = db.define(
  "StudentResult",
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
    Result: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "Student_result",
  }
);

// db.sync()
//   .then(() => {
//     console.log("StudentResult table created successfully");
//   })
//   .catch((error) => {
//     console.error("Error creating user table:", error);
//   });

module.exports = StudentResult;
