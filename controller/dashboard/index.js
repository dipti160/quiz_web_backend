const { Op } = require("sequelize");
const Course = require("../../models/course");
const Department = require("../../models/department");
const Exam = require("../../models/exam");
const User = require("../../models/user");

const coursesCount = async (req, res) => {
  const count = await Course.count();
  res.json({ count });
};

const departmentsCount = async (req, res) => {
  const count = await Department.count();
  res.json({ count });
};

const examsCount = async (req, res) => {
  const count = await Exam.count();
  res.json({ count });
};

const instructorCount = async (req, res) => {
  const count = await User.count({
    where: {
      role: "instructor",
    },
  });
  res.json({ count });
};

const studentCount = async (req, res) => {
  const count = await User.count({
    where: {
      role: "instructor",
    },
  });
  res.json({ count });
};

const examsUpcomingCount = async (req, res) => {
  const today = new Date();
  const tenDaysLater = new Date();
  tenDaysLater.setDate(today.getDate() + 5);

  try {
    const count = await Exam.count({
      where: {
        startdate: {
          [Op.between]: [today, tenDaysLater],
        },
      },
    });

    res.json({ count });
  } catch (error) {
    console.error("Error counting upcoming exams:", error);
    res.status(500).json({ error: "Error fetching upcoming exams" });
  }
};

const examsForDashboard = async (req, res) => {
  const today = new Date();
  const tenDaysLater = new Date();
  tenDaysLater.setDate(today.getDate() + 5);

  try {
    const data = await Exam.findAll({
      where: {
        startdate: {
          [Op.between]: [today, tenDaysLater],
        },
      },
    });

    res.json(data);
  } catch (error) {
    console.error("Error counting upcoming exams:", error);
    res.status(500).json({ error: "Error fetching upcoming exams" });
  }
};

module.exports = {
  coursesCount,
  departmentsCount,
  examsCount,
  instructorCount,
  studentCount,
  examsUpcomingCount,
  examsForDashboard,
};
