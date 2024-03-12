const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// Insert the question into the database
async function askquestion(req, res) {
  const { title, description } = req.body;
  const userId = req.user.userid;
  if (!title || !description) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Failed to ask the question" });
  }
  try {
    const timestamp = new Date(); // Get the current timestamp
    const result = await dbConnection.query(
      "INSERT INTO question (questionid, userid, title, description, tag, timestamp) VALUES (?, ?, ?, ?, ?, ?)",
      [generateQuestionId(), userId, title, description, title, timestamp]
    );
   
    if (result.affectedRows) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "Failed to ask the question" });
    } else {
      const currentTime = new Date(); // Get the current time
      const timeSinceQuestionAsked = currentTime - timestamp; // Calculate the time difference in milliseconds
      
      
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again" });
  }
}
function generateQuestionId() {
  const timestamp = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 1000);
  return `Q-${timestamp}-${randomNumber}`;
}

// red all question
async function readAllQuestion(req, res) {
  const readAllQuestion = `SELECT title, questionid, username FROM question join users on users.userid = question.userid ORDER BY id DESC`;

  try {
    const connection = await dbConnection.getConnection();
    const [result] = await connection.query(readAllQuestion);
    connection.release();
    res.json({ task: result });
  } catch (err) {
    res.send(err.message);
  }
}

// read single question
async function readQuestion(req, res) {
  const questionid = req.params.questionid;
  const readQuestion = `SELECT * FROM question WHERE questionid='${questionid}'`;

  try {
    const [result] = await dbConnection.query(readQuestion);

    if (result.length === 0) {
      return res.send(`No question with this id ${questionid}`);
    } else {
      return res.json(result);
    }
  } catch (error) {
    return res.send(error.message);
  }
}

// edit question
async function editQuestion(req, res) {
  const id = req.params.id;
  const { title, description } = req.body;

  if (!description) {
    return res.send("question is required");
  }

  const updateQuestion = `UPDATE question SET description="${description}", title="${title}" WHERE id=${id}`;

  try {
    const [result] = await dbConnection.query(updateQuestion);

    if (result.affectedRows == 0) {
      return res.send(`No question with id ${id}`);
    } else {
      return res.json("Question updated");
    }
  } catch (err) {
    return res.send(err.message);
  }
}

// Delete single task
async function deleteQuestion(req, res) {
  const id = req.params.id;
  const deleteQ = `DELETE FROM question WHERE id = ${id}`;

  try {
    await dbConnection.query(deleteQ);
    return res.json("Question deleted");
  } catch (err) {
    return res.send(err.message);
  }
}
// red my question
async function myQuestion(req, res) {
  const userid = req.params.userid;
  const readQuestion = `SELECT * FROM question WHERE userid='${userid}'`;

  try {
    const [result] = await dbConnection.query(readQuestion);

    if (result.length === 0) {
      return res.send(`No question with this id ${userid}`);
    } else {
      return res.json(result);
    }
  } catch (error) {
    return res.send(error.message);
  }
}


module.exports = {
  askquestion,
  readAllQuestion,
  readQuestion,
  editQuestion,
  deleteQuestion,
  myQuestion,
};