const mongoose = require("mongoose");

const electionHistorySchema = new mongoose.Schema({
  electionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Election",
    required: true,
  },
  electedOfficers: [
    {
      position: { type: String, required: true },
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
    },
  ],
  schoolYear: { type: String, required: true },
});

module.exports = mongoose.model("ElectionHistory", electionHistorySchema);
