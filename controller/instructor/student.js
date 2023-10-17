const Course = require("../../models/course");
const Department = require("../../models/department");
const StudentInstructor = require("../../models/student_instructor");
const User = require("../../models/user");
const UserCourse = require("../../models/user_course");
const UserDepartment = require("../../models/user_department");

const createStudentByInstructor = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      phone_number,
      email,
      course_id,
      department_id,
      instructor_id,
    } = req.body;

    const user = await User.create({
      firstname,
      lastname,
      phone_number,
      email,
      role: "student",
      password: "test",
    });

    await StudentInstructor.create({
      instructor_id: instructor_id,
      student_id: user.id,
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
const listStudentsByInstructor = async (req, res) => {
  try {
    const instructor_id = req.params.id;
    const students = await User.findAll({
      include: {
        model: StudentInstructor,
        where: {
          instructor_id: instructor_id,
        },
      },

      where: {
        role: "student",
      },
    });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentByIdByInstructor = async (req, res) => {
  try {
    const student_id = req.params.id;
    const student = await User.findByPk(student_id);

    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ error: "student not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Update a student
const updateStudentByInstructor = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { firstname, lastname, phonenumber, email } = req.body;

    const student = await User.findByPk(studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    if (student) {
      await student.update({
        firstname,
        lastname,
        phonenumber,
        email,
      });
      // await UserCourse.update({ course_id }, { where: { user_id: studentId } });
      // await UserDepartment.update(
      //   { department_id },
      //   { where: { user_id: studentId } }
      // );

      res.status(200).json(student);
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a student
const deleteStudentByInstructor = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await User.findByPk(studentId);

    if (student) {
      await StudentInstructor.destroy({ where: { student_id: studentId } });
      await UserCourse.destroy({ where: { user_id: studentId } });
      await UserDepartment.destroy({ where: { user_id: studentId } });
      await student.destroy();

      res.status(200).json({ message: "Success" });
    } else {
      res.status(404).json({ error: "student not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createStudentByInstructor,
  listStudentsByInstructor,
  getStudentByIdByInstructor,
  updateStudentByInstructor,
  deleteStudentByInstructor,
};
