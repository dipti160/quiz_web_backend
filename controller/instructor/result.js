const Exam = require("../../models/exam");
const ExamUser = require("../../models/exam_user");
const Question = require("../../models/question");
const StudentResult = require("../../models/student_result");
const StudentResponse = require("../../models/student_response");
const User = require("../../models/user");

const evaluateExamResult = async (req, res) => {
  const examId = req.params.id;

  try {
    // Fetch exam data, questions, and student responses
    const examData = await Exam.findByPk(examId);
    const examQuestions = await Question.findAll({
      where: {
        exam_id: examId,
      },
    });
    const studentResponses = await StudentResponse.findAll({
      where: {
        exam_id: examId,
      },
    });

    // Calculate results for each student
    const studentsResults = [];

    for (const response of studentResponses) {
      const question = examQuestions.find((q) => q.id === response.question_id);

      // Ensure correctanswer is parsed as a JSON array
      const correctAnswerIds = JSON.parse(question.correctanswer).map(String); // Convert numbers to strings
      const selectedOptionIds = JSON.parse(response.selected_option_ids); // Parse the JSON string

      // Compare student's selected_option_ids with correctAnswerIds to determine correctness
      const isCorrect = selectedOptionIds.every(
        (id) => correctAnswerIds.includes(id.toString()) // Ensure id is a string for comparison
      );
      const questionMarks = isCorrect ? question.marks : 0;

      // Add questionMarks to student's total score
      const studentResultIndex = studentsResults.findIndex(
        (result) => result.studentId === response.student_id
      );
      if (studentResultIndex === -1) {
        // If student result does not exist, create a new entry
        studentsResults.push({
          studentId: response.student_id,
          totalScore: questionMarks,
        });
      } else {
        // If student result exists, update the total score
        studentsResults[studentResultIndex].totalScore += questionMarks;
      }
    }

    // Store results in the StudentResult table
    for (const result of studentsResults) {
      await StudentResult.create({
        exam_id: examId,
        student_id: result.studentId,
        Result: result.totalScore,
      });
    }

    return res
      .status(200)
      .json({ message: "Exam results evaluated and stored successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const viewExamResults = async (req, res) => {
  const examId = req.params.id;

  try {
    const results = await StudentResult.findAll({
      where: {
        exam_id: examId,
      },
    });

    const studentResults = [];

    for (const result of results) {
      const student = await User.findByPk(result.student_id, {
        attributes: ["id", "firstname", "lastname", "email"],
      });

      studentResults.push({
        studentId: student.id,
        name: `${student.firstname} ${student.lastname}`,
        email: student.email,
        result: result.Result,
      });
    }

    return res.status(200).json(studentResults);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { evaluateExamResult, viewExamResults };
