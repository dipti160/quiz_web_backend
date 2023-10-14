const Course = require("../models/course");
const Department = require("../models/department");
const User = require("../models/user");
const UserCourse = require("../models/user_course");
const UserDepartment = require("../models/user_department");

const createStudent = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      phone_number,
      email,
      course_id,
      department_id,
    } = req.body;

    const user = await User.create({
      firstname,
      lastname,
      phone_number,
      email,
      role: "student",
      password: "test",
    });
    // Associate student with course and department
    await UserCourse.create({
      course_id: parseInt(course_id),
      user_id: user.id,
    });
    await UserDepartment.create({
      department_id: parseInt(department_id),
      user_id: user.id,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all students
const listStudents = async (req, res) => {
  try {
    const students = await User.findAll({
      include: [
        {
          model: UserCourse,
          include: [
            {
              model: Course,
              attributes: ["name"],
            },
          ],
        },
        {
          model: UserDepartment,
          include: [
            {
              model: Department,
              attributes: ["name"],
            },
          ],
        },
      ],
      where: {
        role: "student",
      },
    });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await User.findByPk(studentId, {
      include: [
        {
          model: UserCourse,
          include: [
            {
              model: Course,
            },
          ],
        },
        {
          model: UserDepartment,
          include: [
            {
              model: Department,
            },
          ],
        },
      ],
    });

    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ error: "Instructor not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Update a student
const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const {
      firstname,
      lastname,
      phone_number,
      email,
      course_id,
      department_id,
    } = req.body;

    const student = await User.findByPk(studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    if (student) {
      await student.update({
        firstname,
        lastname,
        phone_number,
        email,
      });
      await UserCourse.update({ course_id }, { where: { user_id: studentId } });
      await UserDepartment.update(
        { department_id },
        { where: { user_id: studentId } }
      );

      res.status(200).json(student);
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a student
const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await User.findByPk(studentId);

    if (student) {
      await UserCourse.destroy({ where: { user_id: studentId } });
      await UserDepartment.destroy({ where: { user_id: studentId } });
      await student.destroy();

      res.status(200).json({ message: "Success" });
    } else {
      res.status(404).json({ error: "Instructor not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createStudent,
  listStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
