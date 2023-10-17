const express = require("express");

const Question = require("../../models/question");
const Exam = require("../../models/exam");

const createQuestion = async (req, res) => {
  try {
    const {
      questiontext,
      options,
      correctanswer,
      explanation,
      questiontype,
      marks,
      exam_id,
      instructor_id,
    } = req.body;
    const question = await Question.create({
      questiontext,
      options,
      correctanswer,
      explanation,
      questiontype,
      marks,
      exam_id,
      instructor_id,
    });
    return res.status(201).json(question);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getquestions = async (req, res) => {
  try {
    const { id } = req.params;
    const questions = await Question.findAll({
      where: { instructor_id: id },
      include: {
        model: Exam,
      },
    });
    return res.status(200).json(questions);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findByPk(id);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    return res.status(200).json(question);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      questiontext,
      options,
      correctanswer,
      explanation,
      questiontype,
      marks,
      exam_id,
      instructor_id,
    } = req.body;

    const question = await Question.findByPk(id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    await question.update({
      questiontext,
      options,
      correctanswer,
      explanation,
      questiontype,
      marks,
      exam_id,
      instructor_id,
    });

    return res.status(200).json(question);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findByPk(id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    await question.destroy();
    return res.status(200).send({ message: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createQuestion,
  getquestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
