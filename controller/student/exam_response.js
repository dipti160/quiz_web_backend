const studentDisqualified = require("../../models/student_disqualified");
const StudentResponse = require("../../models/student_response");

const createStudentResponse = async (req, res) => {
  try {
    const { exam_id, student_id, answers } = req.body;

    const studentResponses = await Promise.all(
      answers.map(async (answer) => {
        const { questionId, selectedOptionIds } = answer;
        const studentResponse = await StudentResponse.create({
          exam_id,
          student_id,
          question_id: questionId,
          selected_option_ids: selectedOptionIds,
        });
        return studentResponse;
      })
    );

    if (studentResponses && studentResponses.length > 0) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(400).json({ message: "error" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createstudentDisqualified = async (req, res) => {
  try {
    const { exam_id, student_id } = req.body;
    const studentDisqualifiedData = await studentDisqualified.create({
      exam_id: exam_id,
      student_id: student_id,
    });
    if (studentDisqualifiedData) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(400).json({ message: "error" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createStudentResponse, createstudentDisqualified };
