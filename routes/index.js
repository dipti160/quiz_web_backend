const express = require("express");
const router = express.Router();

const registerUserMiddleware = require("../middleware/user");
const verifyToken = require("../middleware/auth");

// auth
const { createUser } = require("../controller/admin/user");
const { authenticateUser } = require("../controller/login");

// admin
const {
  createDepartment,
  listDepartments,
  updateDepartment,
  deleteDepartment,
  departmentId,
  getAllDepartments,
} = require("../controller/admin/department");
const {
  createCourse,
  listCourses,
  courseId,
  updateCourse,
  deleteCourse,
  getCourseById,
} = require("../controller/admin/course");
const {
  createInstructor,
  listInstructor,
  getInstructorById,
  updateInstructor,
  deleteInstructor,
} = require("../controller/admin/instructor");
const {
  createStudent,
  listStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../controller/admin/student");

// Instructor role
const {
  createStudentByInstructor,
  listStudentsByInstructor,
  getStudentByIdByInstructor,
  updateStudentByInstructor,
  deleteStudentByInstructor,
} = require("../controller/instructor/student");

const {
  createExam,
  getExams,
  getExamById,
  updateExam,
  deleteExam,
  getPastExamsInstructor,
} = require("../controller/instructor/exam");
const {
  createQuestion,
  getquestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} = require("../controller/instructor/question");

// student role
const {
  getUpcomingExam,
  getPastExams,
  examQuestions,
} = require("../controller/student/exam");
const {
  createStudentResponse,
  createstudentDisqualified,
} = require("../controller/student/exam_response");
const {
  coursesCount,
  departmentsCount,
  examsCount,
  instructorCount,
  studentCount,
  examsUpcomingCount,
  examsForDashboard,
} = require("../controller/dashboard");
const {
  evaluateExamResult,
  viewExamResults,
} = require("../controller/instructor/result");

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

// ///////////////////////////////////////// instructor role

// student
router.post("/instructor/student", createStudentByInstructor);
router.get("/instructor/students/:id", listStudentsByInstructor);
router.get("/instructor/get-student/:id", getStudentByIdByInstructor);
router.put("/instructor/student/:id", updateStudentByInstructor);
router.delete("/instructor/student/:id", deleteStudentByInstructor);

// exam
router.post("/instructor/exams", createExam);
router.get("/instructor/exams/:id", getExams);
router.get("/instructor/past-exams/:id", getPastExamsInstructor);
router.get("/instructor/get-exams/:id", getExamById);
router.put("/instructor/exams/:id", updateExam);
router.delete("/instructor/exams/:id", deleteExam);

// question
router.post("/instructor/questions", createQuestion);
router.get("/instructor/questions/:id", getquestions);
router.get("/instructor/get-question/:id", getQuestionById);
router.put("/instructor/questions/:id", updateQuestion);
router.delete("/instructor/questions/:id", deleteQuestion);

// result
router.post("/instructor/evaluateResult/:id", evaluateExamResult);
router.get("/instructor/result/:id", viewExamResults);

// ///////////////////////////////////////// student role

// exam lists
router.get("/student/upcoming-exams/:id", getUpcomingExam);
router.get("/student/past-exams/:id", getPastExams);
router.get("/student/:examId/questions", examQuestions);
router.post("/student/exam/response", createStudentResponse);
router.post("/student/exam/disqualified", createstudentDisqualified);

////////////////////////////////////// dashboard

router.get("/admin/courses/count", coursesCount);
router.get("/admin/departments/count", departmentsCount);
router.get("/admin/exams/count", examsCount);
router.get("/admin/instructor/count", instructorCount);
router.get("/admin/student/count", studentCount);
router.get("/admin/exams/upcoming/count", examsUpcomingCount);
router.get("/admin/exams/upcoming/all", examsForDashboard);

module.exports = router;
