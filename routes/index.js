const express = require("express");
const router = express.Router();

const registerUserMiddleware = require("../middleware/user");
const verifyToken = require("../middleware/auth");

const { createUser } = require("../controller/user");
const { authenticateUser } = require("../controller/login");
const {
  createDepartment,
  listDepartments,
  updateDepartment,
  deleteDepartment,
  departmentId,
  getAllDepartments,
} = require("../controller/department");
const {
  createCourse,
  listCourses,
  courseId,
  updateCourse,
  deleteCourse,
  getCourseById,
} = require("../controller/course");
const {
  createInstructor,
  listInstructor,
  getInstructorById,
  updateInstructor,
  deleteInstructor,
} = require("../controller/instructor");
const {
  createStudent,
  listStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../controller/student");

////////////////////////////////// auth route
router.post("/register", registerUserMiddleware, createUser);
router.post("/login", authenticateUser);

////////////////////////////////// admin route
// department
router.post("/department", createDepartment);
router.get("/departments", listDepartments);
router.get("/departments/all", getAllDepartments);
router.get("/departments/:id", departmentId);
router.put("/departments/:id", updateDepartment);
router.delete("/departments/:id", deleteDepartment);

// course
router.post("/course", createCourse);
router.get("/courses", listCourses);
router.get("/course/:id", getCourseById);
router.put("/course/:id", updateCourse);
router.delete("/course/:id", deleteCourse);

// instructor
router.post("/instructor", createInstructor);
router.get("/instructors", listInstructor);
router.get("/instructor/:id", getInstructorById);
router.put("/instructor/:id", updateInstructor);
router.delete("/instructor/:id", deleteInstructor);

// student

router.post("/student", createStudent);
router.get("/students", listStudents);
router.get("/student/:id", getStudentById);
router.put("/student/:id", updateStudent);
router.delete("/student/:id", deleteStudent);

module.exports = router;
