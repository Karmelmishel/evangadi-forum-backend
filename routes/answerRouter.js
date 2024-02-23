const express = require("express");
const router = express.Router();

const { giveAnswer, readAllAnswer ,singleAnswer} = require("../controller/answerController");

// give/post answer

router.post("/giveanswer/:questionid", giveAnswer);

// red all answer
router.get("/getanswers/:questionid", readAllAnswer);
// red single answer
router.get("/getanswer/:answerid", singleAnswer);
module.exports = router;
