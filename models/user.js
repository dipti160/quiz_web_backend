const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { db } = require("../database");
const UserCourse = require("./user_course");
const UserDepartment = require("./user_department");
const Course = require("./course");
const Department = require("./department");
const StudentInstructor = require("./student_instructor");
const ExamUser = require("./exam_user");

const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";

const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING, // Use VARCHAR to store hashed passwords
      allowNull: false,
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: Sequelize.ENUM("admin", "student", "instructor"),
      allowNull: false,
    },
  },
  {
    tableName: "users",
  }
);

User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  user.password = hashedPassword;
});

User.hasMany(UserCourse, { foreignKey: "user_id" });
User.hasMany(UserDepartment, { foreignKey: "user_id" });
User.hasMany(StudentInstructor, {
  foreignKey: "instructor_id",
  foreignKey: "student_id",
});
User.hasMany(ExamUser, {
  foreignKey: "user_id",
});

UserCourse.belongsTo(Course, { foreignKey: "course_id" });
UserDepartment.belongsTo(Department, { foreignKey: "department_id" });

// db.sync()
//   .then(() => {
//     console.log("User table created successfully");
//   })
//   .catch((error) => {
//     console.error("Error creating user table:", error);
//   });

module.exports = User;
