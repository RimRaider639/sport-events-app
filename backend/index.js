const express = require("express");
const connection = require("./config/db");
require("dotenv").config();

const app = express();

app.listen(process.env.PORT, async () => {
  console.log(`Server started at port ${process.env.PORT}`);
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
});
