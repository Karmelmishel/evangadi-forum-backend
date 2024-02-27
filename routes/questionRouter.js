const express = require("express");
const router = express.Router();
const dbConnection = require("../db/dbConfig");

const {
  askquestion,
  readAllQuestion,
  readQuestion,
  editQuestion,
  deleteQuestion,
   myQuestion
} = require("../controller/questionController");

// insert question
router.post("/ask-questions", askquestion);

// red all question
router.get("/all-questions", readAllQuestion);
module.exports = router;

// read single question
router.get("/all-questions/:id", readQuestion);

// update single question 
router.patch("/all-questions/:id", editQuestion);

// Delete single question
router.delete("/all-questions/:id", deleteQuestion);

// my question
router.get('/my-questions/:userid', myQuestion);

module.exports = router;
