const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
const usersRouter = require("./routes/users.route");
const eventsRouter = require("./routes/events.route");
const requestsRouter = require("./routes/requests.route");
require("dotenv").config();

const app = express();
app.use(express.json(), cors());
app.use("/users", usersRouter);
app.use("/events", eventsRouter);
app.use("/requests", requestsRouter);

app.listen(process.env.PORT, async () => {
  console.log(`Server started at port ${process.env.PORT}`);
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
});
