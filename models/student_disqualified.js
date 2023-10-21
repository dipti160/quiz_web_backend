const { DataTypes } = require("sequelize");
const { db } = require("../database");
const Exam = require("./exam");
const User = require("./user");

const studentDisqualified = db.define(
  "studentDisqualified",
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
  },
  {
    tableName: "student_disqualified",
  }
);

// db.sync()
//   .then(() => {
//     console.log("student_disqualified table created successfully");
//   })
//   .catch((error) => {
//     console.error("Error creating user table:", error);
//   });

module.exports = studentDisqualified;
