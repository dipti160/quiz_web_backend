const { User } = require("../models/user"); // Import your Sequelize models
const { UserCourse } = require("../models/user_course");
const { UserDepartment } = require("../models/user_department");

const createStudent = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email, courseId, departmentId } =
      req.body;

    // Create the student
    const student = await Student.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      role: "student",
    });

    // Associate student with course and department
    const course = await UserCourse.findByPk(courseId);
    const department = await UserDepartment.findByPk(departmentId);

    await student.addUserCourse(course);
    await student.addUserDepartment(department);

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all students
const listStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: [UserCourse, UserDepartment],
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
        },
        {
          model: UserDepartment,
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
    const { firstName, lastName, phoneNumber, email } = req.body;

    const student = await Student.findByPk(studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    student.firstName = firstName;
    student.lastName = lastName;
    student.phoneNumber = phoneNumber;
    student.email = email;
    await student.save();

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a student
const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    const student = await Student.findByPk(studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    await student.destroy();
    res.status(204).send();
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
