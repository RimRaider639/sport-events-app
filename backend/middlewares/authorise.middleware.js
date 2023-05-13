/*
This function verifies the token recieved and authorises the user for certain operations or views.
*/

const jwt = require("jsonwebtoken");
require("dotenv").config();

function authorise(req, res, next) {
  const { token } = req.headers.authorisation;
  if (!token) {
    res.status(401).send({ message: "Please login" });
    return;
  }
  try {
    const match = jwt.verify(token, process.env.KEY);
    if (match) {
      req.body.user = match.id;
      next();
      return;
    } else {
      res.status(401).send({ message: "Please login" });
      return;
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

module.exports = authorise;
