const { Op } = require("sequelize");
const { db } = require("../../database");
const Exam = require("../../models/exam");
const ExamUser = require("../../models/exam_user");
const Question = require("../../models/question");
const StudentResponse = require("../../models/student_response");
const studentDisqualified = require("../../models/student_disqualified");
const StudentResult = require("../../models/student_result");

const getUpcomingExam = async (req, res) => {
  try {
    const { id } = req.params;
    const today = new Date();
    const fiveDaysLater = new Date();
    fiveDaysLater.setDate(today.getDate() + 5);

    const studentResponseExamIds = await StudentResponse.findAll({
      where: {
        student_id: id,
      },
      attributes: ["exam_id"],
    });
    const disqualifiedExamIds = await studentDisqualified.findAll({
      where: {
        student_id: id,
      },
      attributes: ["exam_id"],
    });

    // Extract exam_ids from the results
    const existingExamIds = [
      ...studentResponseExamIds.map(({ exam_id }) => exam_id),
      ...disqualifiedExamIds.map(({ exam_id }) => exam_id),
    ];

    // Get upcoming exams excluding existing exam_ids
    const exams = await Exam.findAll({
      include: {
        model: ExamUser,
        where: {
          user_id: id,
        },
      },
      where: {
        id: {
          [Op.notIn]: existingExamIds,
        },
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

const getPastExams = async (req, res) => {
  try {
    const { id } = req.params;
    const today = new Date();
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(today.getDate() - 15);

    const exams = await Exam.findAll({
      include: {
        model: ExamUser,
        where: {
          user_id: id,
        },
      },

      where: {
        [Op.or]: [
          {
            enddate: {
              [Op.between]: [fifteenDaysAgo, today],
            },
          },
          {
            id: {
              [Op.in]: db.literal(
                `(SELECT DISTINCT exam_id FROM student_responses WHERE user_id = ${id})`
              ),
            },
          },
        ],
      },
    });

    const examIds = exams.map((exam) => exam.id);

    const examsWithResults = await Promise.all(
      examIds.map(async (examId) => {
        const studentResults = await StudentResult.findAll({
          where: {
            student_id: id,
            exam_id: examId,
          },
        });

        // Calculate total result based on StudentResults
        const totalResult = studentResults.reduce((acc, result) => {
          return acc + result.Result;
        }, 0);

        // Create an object with exam details and result field
        return {
          ...exams.find((exam) => exam.id === examId).toJSON(),
          result: totalResult,
        };
      })
    );

    res.status(200).json(examsWithResults);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching exams" });
  }
};

const examQuestions = async (req, res) => {
  try {
    const { examId } = req.params;
    const questions = await Question.findAll({
      where: {
        exam_id: examId,
      },
    });

    if (!questions || questions.length === 0) {
      return res.status(404).json({ error: "No questions found for the exam" });
    }

    // Fetch exam data separately
    const exam = await Exam.findByPk(examId, {
      attributes: ["name", "duration", "instruction"],
    });

    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }

    res.status(200).json({ exam, questions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching exam and questions data" });
  }
};

module.exports = {
  getUpcomingExam,
  getPastExams,
  examQuestions,
};
