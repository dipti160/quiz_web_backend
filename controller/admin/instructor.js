const Course = require("../../models/course");
const Department = require("../../models/department");
const User = require("../../models/user");
const UserCourse = require("../../models/user_course");
const UserDepartment = require("../../models/user_department");

const createInstructor = async (req, res) => {
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
      role: "instructor",
      password: "test",
    });
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
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const listInstructor = async (req, res) => {
  try {
    const instructors = await User.findAll({
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
        role: "instructor",
      },
    });
    res.status(200).json(instructors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getInstructorById = async (req, res) => {
  try {
    console.log("in getInstructorById");
    const instructorId = req.params.id;
    const instructor = await User.findByPk(instructorId, {
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

    if (instructor) {
      res.status(200).json(instructor);
    } else {
      res.status(404).json({ error: "Instructor not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateInstructor = async (req, res) => {
  try {
    const instructorId = req.params.id;
    const {
      firstname,
      lastname,
      phone_number,
      email,
      course_id,
      department_id,
    } = req.body;

    const updatedInstructor = await User.findByPk(instructorId);

    if (updatedInstructor) {
      await updatedInstructor.update({
        firstname,
        lastname,
        phone_number,
        email,
      });
      await UserCourse.update(
        { course_id },
        { where: { user_id: instructorId } }
      );
      await UserDepartment.update(
        { department_id },
        { where: { user_id: instructorId } }
      );

      res.status(200).json(updatedInstructor);
    } else {
      res.status(404).json({ error: "Instructor not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteInstructor = async (req, res) => {
  try {
    const instructorId = req.params.id;
    const deletedInstructor = await User.findByPk(instructorId);

    if (deletedInstructor) {
      await UserCourse.destroy({ where: { user_id: instructorId } });
      await UserDepartment.destroy({ where: { user_id: instructorId } });
      await deletedInstructor.destroy();

      res.status(200).json({ message: "Success" });
    } else {
      res.status(404).json({ error: "Instructor not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createInstructor,
  listInstructor,
  getInstructorById,
  updateInstructor,
  deleteInstructor,
};
