const { Op } = require("sequelize");
const Exam = require("../../models/exam");
const ExamCourse = require("../../models/exam_course");
const ExamUser = require("../../models/exam_user");
const Question = require("../../models/question");
const StudentInstructor = require("../../models/student_instructor");

const createExam = async (req, res) => {
  try {
    const {
      name,
      duration,
      startdate,
      enddate,
      totalmarks,
      instruction,
      instructor_id,
      course_id,
    } = req.body;
    const data = {
      name,
      duration,
      startdate,
      enddate,
      totalmarks,
      instruction,
      instructor_id,
      examstatus: "scheduled",
    };
    const exam = await Exam.create(data);

    const studentData = await StudentInstructor.findAll({
      attributes: ["student_id"],
    });
    if (studentData.length) {
      // Bulk insert into exam_course table for each student
      const examCourseData = studentData.map((student) => ({
        exam_id: exam.id,
        user_id: student.student_id,
      }));
      await ExamUser.bulkCreate(examCourseData);
    }
    const examCourseData = {
      exam_id: exam.id,
      course_id: course_id,
    };
    await ExamCourse.create(examCourseData);

    res.status(201).json(exam);
  } catch (error) {
    res.status(500).json({ error: "Error creating exam" });
  }
};

const getExams = async (req, res) => {
  try {
    const { id } = req.params;
    const today = new Date();
    const fiveDaysLater = new Date();
    fiveDaysLater.setDate(today.getDate() + 30);

    const exams = await Exam.findAll({
      where: {
        instructor_id: id,
        startdate: {
          [Op.between]: [today, fiveDaysLater],
        },
      },
    });
    res.status(200).json(exams);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching exams" });
  }
};

const getExamById = async (req, res) => {
  try {
    const exam = await Exam.findByPk(req.params.id);
    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ error: "Error fetching exam" });
  }
};

const updateExam = async (req, res) => {
  try {
    const exam = await Exam.findByPk(req.params.id);
    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }
    await exam.update(req.body);
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ error: "Error updating exam" });
  }
};

const deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findByPk(req.params.id);
    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }
    await ExamCourse.destroy({ where: { exam_id: exam.id } });
    await ExamUser.destroy({ where: { exam_id: exam.id } });
    // await Question.destroy({ where: { exam_id: exam.id } });
    await exam.destroy();
    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting exam" });
  }
};

const getPastExamsInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const today = new Date();
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(today.getDate() - 15);

    const exams = await Exam.findAll({
      where: {
        instructor_id: id,
        [Op.or]: [
          {
            enddate: {
              [Op.between]: [fifteenDaysAgo, today],
            },
          },
          ,
        ],
      },
    });

    res.status(200).json(exams);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching exams" });
  }
};

module.exports = {
  createExam,
  getExams,
  getExamById,
  updateExam,
  deleteExam,
  getPastExamsInstructor,
};
