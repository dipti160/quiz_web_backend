const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("../database");
const User = require("./user");
const Question = require("./question");

const Exam = db.define(
  "Exam",
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
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    enddate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    totalmarks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    instruction: {
      type: DataTypes.JSON,
    },
    examstatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instructor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    tableName: "exams",
  }
);

Exam.hasMany(Question, { foreignKey: "exam_id" });
Question.belongsTo(Exam, { foreignKey: "exam_id" });

// db.sync()
//   .then(() => {
//     console.log("exams table created successfully");
//   })
//   .catch((error) => {
//     console.error("Error creating user table:", error);
//   });

module.exports = Exam;
