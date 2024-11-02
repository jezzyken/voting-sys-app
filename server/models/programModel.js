const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const programSchema = new mongoose.Schema(
  {
    programName: { type: String, required: true },
  },
  {
    programAbr: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Program", programSchema);
