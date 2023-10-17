const Course = require("../../models/course");
const Department = require("../../models/department");

// create a new department
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

// list of all departments
const listCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [{ model: Department }],
    });
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get department by id
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

// update department by id
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

//   delete department

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
  getCourseById,
  deleteCourse,
  updateCourse,
};
