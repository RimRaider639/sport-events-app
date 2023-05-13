const mg = require("mongoose");

const requestSchema = mg.Schema({
  event: { type: mg.SchemaTypes.ObjectId, required: true, ref: "event" },
  user: { type: mg.SchemaTypes.ObjectId, required: true, ref: "user" },
  status: { type: String, enum: ["Accepted", "Pending", "Rejected"] },
  createdAt: { type: mg.SchemaTypes.Date, default: new Date() },
  expireAt: { type: mg.SchemaTypes.Date, required: true },
});

const Request = mg.model("request", requestSchema);

module.exports = Request;
