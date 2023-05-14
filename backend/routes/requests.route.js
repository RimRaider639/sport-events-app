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
    if (playersLimit - joiners.length <= 0) {
      res.status(403).send({ message: "Player limit is reached" });
      return;
    }
    const newRequest = new Request({ ...req.body, expireAt: startTime });
    await newRequest.save();
    res.send({ message: "Request successfully sent" });
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
    if (request.event.user.toString() !== req.body.user) {
      res.status(401).send({
        message: "Only the event creator is authorised for this operation.",
      });
      return;
    }
    const { expireAt, event, _id, ...rest } = request.toObject();
    await Request.findOneAndReplace(
      { _id },
      {
        ...rest,
        event,
        status: "Accepted",
      }
    );
    await Event.findByIdAndUpdate(event, {
      $push: { joiners: request.user._id },
    });
    res.send({ message: "Request successfully accepted" });
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
    if (request.event.user.toString() !== req.body.user) {
      res.status(401).send({
        message: "Only the event creator is authorised for this operation.",
      });
      return;
    }
    const { expireAt, _id, ...rest } = request.toObject();
    await Request.findByIdAndUpdate(_id, {
      status: "Rejected",
    });
    res.send({ message: "Request successfully rejected" });
    return;
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

requestsRouter.get("/:eventID", async (req, res) => {
  try {
    const requests = await Request.find({
      event: req.params.eventID,
      ...req.query,
    }).populate("user", "username");
    res.send(requests);
    return;
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

requestsRouter.get("/", async (req, res) => {
  try {
    const requests = await Request.find({
      user: req.body.user,
    })
      .populate("event", "title location startTime endTime")
      .sort({ createdAt: 1 });
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
