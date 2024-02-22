// answerController.js
const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// Add answer to a question
async function addAnswer(req, res) {
  const { answer } = req.body;
  console.log(answer);
  const { questionId } = req.params;
  console.log(req.params);
  const userId = req.user.userid; //  authentication middleware sets user ID
  console.log(userId);
  try {
    const result = await dbConnection.query(
      "INSERT INTO answers ( questionid, userid, answer) VALUES ( ?, ?, ?)",
      [questionId, userId, answer]
    );
    return res.status(StatusCodes.CREATED).json({ msg: "Answer added" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again" });
  }

  //   res.send("Answer added");
}

// Read all answers for a question
async function readAllAnswers(req, res) {
  const { questionId } = req.params;
  const readAllAnswersQuery = `SELECT * FROM answers WHERE questionid='${questionId}'`;

  try {
    const [result] = await dbConnection.query(readAllAnswersQuery);
    res.json({ answers: result });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }
}

// Read single answer
async function readAnswer(req, res) {
  const { answerId } = req.params;
  const readAnswerQuery = `SELECT * FROM answers WHERE answerid='${answerId}'`;

  try {
    const [result] = await dbConnection.query(readAnswerQuery);

    if (result.length === 0) {
      return res.send(`No answer with this id ${answerId}`);
    } else {
      return res.json(result[0]);
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

// Edit single answer
async function editAnswer(req, res) {
  const { answerId } = req.params;
  const { answer } = req.body;

  if (!answer) {
    return res.send("answer is required");
  }

  const updateAnswerQuery = `UPDATE answers SET answer="${answer}" WHERE answerid=${answerId}`;

  try {
    const [result] = await dbConnection.query(updateAnswerQuery);

    if (result.affectedRows === 0) {
      return res.send(`No answer with id ${answerId}`);
    } else {
      return res.json("Answer updated");
    }
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }
}

// Delete single answer
async function deleteAnswer(req, res) {
  const { answerId } = req.params;
  const deleteAnswerQuery = `DELETE FROM answers WHERE answerid = ${answerId}`;

  try {
    await dbConnection.query(deleteAnswerQuery);
    return res.json("Answer deleted");
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }
}

module.exports = {
  addAnswer,
  readAllAnswers,
  readAnswer,
  editAnswer,
  deleteAnswer,
};
