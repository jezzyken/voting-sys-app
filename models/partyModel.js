const mongoose = require("mongoose");

const partySchema = new mongoose.Schema({
  name: { type: String, required: true },
  platform: { type: String },
});

module.exports = mongoose.model("Party", partySchema);
