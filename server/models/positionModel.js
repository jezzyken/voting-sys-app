// models/studentModel.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const positionSchema = new mongoose.Schema(
  {
    position: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Position", positionSchema);
