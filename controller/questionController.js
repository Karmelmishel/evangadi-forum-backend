const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// Insert the question into the database
async function askquestion(req, res) {
  const { title, description } = req.body;
  const userId = req.user.userid;
  try {
    const result = await dbConnection.query(
      "INSERT INTO questions (questionid, userid, title, description, tag) VALUES (?, ?, ?, ?, ?)",
      [generateQuestionId(), userId, title, description, title]
    );
    console.log(
      "INSERT INTO questions (questionid, userid, title, description, tag) VALUES (?, ?, ?, ?, ?)",
      [generateQuestionId(), userId, title, description, title]
    );

    if (result.affectedRows) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "Failed to ask the question" });
    } else {
      return res.status(StatusCodes.CREATED).json({ msg: "Question asked" });
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again" });
  }
}

// Function to generate a unique question ID
function generateQuestionId() {
  const timestamp = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 1000);
  return `Q-${timestamp}-${randomNumber}`;
}

module.exports = {
  askquestion,
};
