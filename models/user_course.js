const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("../database");
const User = require("./user");
const Course = require("./course");

const UserCourse = db.define(
  "UserCourse",
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
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Course,
        key: "id",
      },
    },
  },
  {
    tableName: "user_course",
  }
);

// db.sync()
//   .then(() => {
//     console.log("user_course table created successfully");
//   })
//   .catch((error) => {
//     console.error("Error creating user table:", error);
//   });

module.exports = UserCourse;
