const Event = require("../models/event.model");
const authorise = require("../middlewares/authorise.middleware");

const eventsRouter = require("express").Router();

eventsRouter.use(authorise);

eventsRouter.get("/", async (req, res) => {
  try {
    let { location, ...filters } = req.query;
    if (location) {
      Object.assign(filters, { location: { $regex: location, $options: "i" } });
    }
    const events = await Event.find(filters).populate("user", "username");
    res.send(events);
    return;
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

eventsRouter.get("/personal", async (req, res) => {
  try {
    const events = await Event.find({ user: req.body.user }).populate(
      "joiners",
      "username"
    );

    res.send(events);
    return;
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

eventsRouter.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("user", "username")
      .populate("joiners", "username");
    const { joiners, ...rest } = event.toObject();
    if (joiners.map((j) => j._id.toString()).includes(req.body.user)) {
      res.send(event);
      return;
    }
    res.send(rest);
    return;
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

eventsRouter.post("/", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.send({ message: "Event successfully created" });
    return;
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = eventsRouter;
