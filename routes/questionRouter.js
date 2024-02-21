const express = require("express");
const router = express.Router();
const dbConnection = require("../db/dbConfig");

const {
  askquestion,
  readAllQuestion,
  readQuestion,
  editQuestion,
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
