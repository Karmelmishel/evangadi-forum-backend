const express = require("express");
const router = express.Router();
const dbConnection = require("../db/dbConfig");

const { askquestion } = require("../controller/questionController");

// insert question
router.post("/ask-questions", askquestion);

module.exports = router;
