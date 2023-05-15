const mg = require("mongoose");

const requestSchema = mg.Schema({
  event: { type: mg.SchemaTypes.ObjectId, required: true, ref: "event" },
  user: { type: mg.SchemaTypes.ObjectId, required: true, ref: "user" },
  status: {
    type: String,
    enum: ["Accepted", "Pending", "Rejected"],
    default: "Pending",
  },
  createdAt: { type: mg.SchemaTypes.Date, default: new Date() },
  expireAt: { type: mg.SchemaTypes.Date, expires: 0 },
});

requestSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const Request = mg.model("request", requestSchema);

module.exports = Request;
