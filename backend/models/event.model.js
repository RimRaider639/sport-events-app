const mg = require("mongoose");

const eventSchema = mg.Schema({
  title: { type: String, required: true },
  sport: {
    type: String,
    enum: [
      "Badminton",
      "Football",
      "Cricket",
      "Volleyball",
      "Table Tennis",
      "Lawn Tennis",
      "Chess",
      "Carrom",
    ],
    required: true,
  },
  location: { type: String, required: true },
  user: { type: mg.SchemaTypes.ObjectId, required: true, ref: "user" }, //creator
  joiners: {
    type: [{ type: mg.SchemaTypes.ObjectId, ref: "user" }],
    default: [],
  },
  createdAt: { type: mg.SchemaTypes.Date, default: new Date() },
  startTime: { type: mg.SchemaTypes.Date, required: true },
  endTime: { type: mg.SchemaTypes.Date, required: true },
  description: { type: String, required: true },
  playersLimit: { type: Number, required: true },
  requirements: {
    type: [String],
    default: ["Anyone interested can apply to join"],
  },
});

const Event = mg.model("event", eventSchema);

module.exports = Event;
