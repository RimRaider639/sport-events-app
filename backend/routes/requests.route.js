const Request = require("../models/request.model");
const Event = require("../models/event.model");
const authorise = require("../middlewares/authorise.middleware");

const requestsRouter = require("express").Router();

requestsRouter.use(authorise);

requestsRouter.post("/create", async (req, res) => {
  try {
    const { startTime, playersLimit, joiners } = await Event.findById(
      req.body.event
    );
    if (playersLimit - joiners.length <= 0)
      res.status(403).send({ message: "Player limit is reached" });
    const newRequest = new Request({ ...req.body, expireAt: startTime });
    await newRequest.save();
    res.send("Request successfully sent");
    return;
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

requestsRouter.get("/:id/accept", async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate(
      "event",
      "user"
    );
    if (request.event.user !== req.body.user) {
      res.status(401).send({
        message: "Only the event creator is authorised for this operation.",
      });
      return;
    }
    const { expireAt, event, ...rest } = request;
    await Request.findByIdAndUpdate(request._id, {
      ...rest,
      event: event._id,
      status: "Accepted",
    });
    await Event.findByIdAndUpdate(request.event, {
      joiners: { $push: request.user },
    });
    res.send("Request successfully accepted");
    return;
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

requestsRouter.get("/:id/reject", async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate(
      "event",
      "user"
    );
    if (request.event.user !== req.body.user) {
      res.status(401).send({
        message: "Only the event creator is authorised for this operation.",
      });
      return;
    }
    const { expireAt, event, ...rest } = request;
    await Request.findByIdAndUpdate(request._id, {
      ...rest,
      event: event._id,
      status: "Rejected",
    });
    res.send("Request successfully rejected");
    return;
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

requestsRouter.get("/:eventID", async (req, res) => {
  try {
    const requests = await Request.find({
      event: req.params.eventID,
    });
    res.send(requests);
    return;
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

requestsRouter.get("/hasRequested/:eventID", async (req, res) => {
  try {
    const request = await Request.findOne({
      event: req.params.eventID,
      user: req.body.user,
    });
    res.send({ request, hasRequested: request ? true : false });
    return;
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = requestsRouter;
