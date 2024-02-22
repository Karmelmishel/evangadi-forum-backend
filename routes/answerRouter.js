// answerRoutes.js
const express = require("express");
const router = express.Router();
const {
  addAnswer,
  readAllAnswers,
  readAnswer,
  editAnswer,
  deleteAnswer,
} = require("../controller/answerController");

// Insert answer
router.post("/add-answer/:questionId", addAnswer);

// Read all answers for a question
router.get("/all-answers/:questionId", readAllAnswers);

// Read single answer
router.get("/single-answer/:answerId", readAnswer);

// Update single answer
router.patch("/edit-answer/:answerId", editAnswer);

// Delete single answer
router.delete("/delete-answer/:answerId", deleteAnswer);

module.exports = router;
