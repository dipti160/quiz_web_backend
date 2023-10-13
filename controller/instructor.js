const User = require("../models/user");
const UserCourse = require("../models/user_course");
const UserDepartment = require("../models/user_department");

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

    console.log(req.body);

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
const listInstructor = async () => {
  try {
    const instructors = await User.findAll({
      include: [
        {
          model: UserCourse,
        },
        {
          model: UserDepartment,
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
    const instructorId = req.params.id;
    const instructor = await User.findByPk(instructorId, {
      include: [
        {
          model: UserCourse,
        },
        {
          model: UserDepartment,
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
        { where: { UserId: instructorId } }
      );
      await UserDepartment.update(
        { department_id },
        { where: { UserId: instructorId } }
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
      await UserCourse.destroy({ where: { UserId: instructorId } });
      await UserDepartment.destroy({ where: { UserId: instructorId } });
      await deletedInstructor.destroy();

      res.status(204).end();
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
