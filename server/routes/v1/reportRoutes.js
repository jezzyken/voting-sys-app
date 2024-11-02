const express = require("express");
const router = express.Router();
const Vote = require("../../models/voteModel");
const Student = require("../../models/studentModel");
const Election = require("../../models/electionModel");

router.get("/voting-status/:electionId", async (req, res) => {
  try {
    const { electionId } = req.params;

    const students = await Student.find({ status: "active" }).populate(
      "programId",
      "programName programAbr"
    );

    const votes = await Vote.find({ electionId });

    const votedStudentIds = new Set(
      votes.map((vote) => vote.studentId.toString())
    );

    const report = students.map((student) => ({
      studentId: student._id,
      studentNo: student.StudentIdNo,
      firstName: student.firstName,
      lastName: student.lastName,
      program: student.programId?.programName,
      yearLevel: student.yearLevel,
      hasVoted: votedStudentIds.has(student._id.toString()),
    }));

    res.json({
      success: true,
      data: report,
      summary: {
        totalStudents: students.length,
        voted: votes.length,
        notVoted: students.length - votes.length,
        votingPercentage: ((votes.length / students.length) * 100).toFixed(2),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error generating report",
      error: error.message,
    });
  }
});

module.exports = router;
