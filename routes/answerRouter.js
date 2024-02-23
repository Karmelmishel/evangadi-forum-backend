const express = require("express");
const router = express.Router();

const { giveAnswer, readAllAnswer } = require("../controller/answerController");

// give/post answer

router.post("/giveanswer/:questionid", giveAnswer);

// red all answer
router.get("/getanswers/:questionid", readAllAnswer);

module.exports = router;
