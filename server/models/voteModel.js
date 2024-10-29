const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    electionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Election",
      required: true,
    },
    votes: [
      {
        candidateId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Candidate",
          required: true,
        },
        position: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    index: {
      studentId: 1,
      electionId: 1,
    },
    unique: true,
  }
);

module.exports = mongoose.model("Vote", voteSchema);
