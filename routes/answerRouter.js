const express = require("express");
const router = express.Router();

const { giveAnswer} = require("../controller/answerController");

// give/post answer
router.post("/giveanswer/:questionid", giveAnswer);