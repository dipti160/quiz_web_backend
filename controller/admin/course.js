const Course = require("../../models/course");
const Department = require("../../models/department");

// create a new course
const createCourse = async (req, res) => {
  try {
    const { name, department_id } = req.body;
    const course = await Course.create({ name, department_id });
    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// list of all courses
const listCourses = async (req, res) => {
  try {
    const { page, limit, search } = req.query;
    const offset = (page - 1) * limit;
    let whereCondition = {};

    const courses = await Course.findAll({
      where: whereCondition,
      offset: offset,
      limit: parseInt(limit),
      order: [["createdAt", "DESC"]],
      include: [{ model: Department }],
    });
    const totalCourses = await Course.count({
      where: whereCondition,
    });
    const totalPages = Math.ceil(totalCourses / limit);

    res.status(200).json({ data: courses, totalPages: totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllcourses = async (req, res) => {
  try {
    const course = await Course.findAll();
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get course by id
const getCourseById = async (req, res) => {
  const courseId = req.params.id;
  try {
    const courses = await Course.findByPk(courseId);
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// update course by id
const updateCourse = async (req, res) => {
  const courseId = req.params.id;

  try {
    const [updatedRowsCount, updatedCourses] = await Course.update(req.body, {
      where: { id: courseId },
    });

    console.log(updatedRowsCount, "updatedRowsCount");
    if (updatedRowsCount > 0) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(404).json({ error: "Course not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//   delete course

const deleteCourse = async (req, res) => {
  const courseId = req.params.id;
  try {
    const deletedRowCount = await Course.destroy({
      where: { id: courseId },
    });
    if (deletedRowCount > 0) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(404).json({ error: "Course not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createCourse,
  listCourses,
  getAllcourses,
  getCourseById,
  deleteCourse,
  updateCourse,
};
