const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("../database");

const Exam = require("./exam");
const User = require("./user");

const ExamUser = db.define(
  "ExamUser",
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
    tableName: "exam_user",
  }
);

// db.sync()
//   .then(() => {
//     console.log("exam_user table created successfully");
//   })
//   .catch((error) => {
//     console.error("Error creating user table:", error);
//   });

module.exports = ExamUser;
