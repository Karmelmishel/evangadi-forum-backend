const express = require("express");
const router = express.Router();

const { giveAnswer, readAllAnswer ,singleAnswer,editAnswer} = require("../controller/answerController");

// give/post answer

router.post("/giveanswer/:questionid", giveAnswer);

// red all answer
router.get("/getanswers/:questionid", readAllAnswer);
// red single answer
router.get("/getanswer/:answerid", singleAnswer);
// updet single answer
router.patch("/getanswer/:answerid", editAnswer);
// delete single answer
router.delete("/getanswer/:answerid", deleteAnswer);

// red my answer
router.get("/my-answer/:userid", myAnswer);
module.exports = router;
