const express = require("express");
const router = express.Router();
const Vote = require("../../models/voteModel");
const Election = require("../../models/electionModel");
const Candidate = require("../../models/candidateModel");
const ObjectId = require("mongoose").Types.ObjectId;
const PDFDocument = require("pdfkit");
const moment = require("moment");

router.post("/", async (req, res) => {
  try {
    const { electionId, studentId, votes } = req.body;

    const election = await Election.findOne({
      _id: electionId,
    });

    if (!election) {
      return res.status(400).json({
        success: false,
        message: "Election not found or not active",
      });
    }

    const existingVote = await Vote.findOne({
      studentId,
      electionId,
    });

    if (existingVote) {
      return res.status(400).json({
        success: false,
        message: "You have already voted in this election",
      });
    }

    const candidateIds = votes.map((vote) => vote.candidateId);
    const candidates = await Candidate.find({
      _id: { $in: candidateIds },
      electionId,
    });

    if (candidates.length !== votes.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid candidates selected",
      });
    }

    const positions = votes.map((vote) => vote.position);
    const uniquePositions = new Set(positions);
    if (positions.length !== uniquePositions.size) {
      return res.status(400).json({
        success: false,
        message: "Multiple votes for same position not allowed",
      });
    }

    const vote = new Vote({
      studentId,
      electionId,
      votes,
    });

    await vote.save();

    res.status(201).json({
      success: true,
      message: "Vote submitted successfully",
    });
  } catch (error) {
    console.error("Vote submission error:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting vote",
    });
  }
});

router.get("/check/:electionId/:studentId", async (req, res) => {
  try {
    const { electionId, studentId } = req.params;

    console.log(req.params);

    const vote = await Vote.findOne({
      studentId,
      electionId,
    });

    res.json({
      hasVoted: !!vote,
    });
  } catch (error) {
    console.error("Vote check error:", error);
    res.status(500).json({
      success: false,
      message: "Error checking vote status",
    });
  }
});

router.get("/results/:electionId", async (req, res) => {
  try {
    const { electionId } = req.params;

    const election = await Election.findById(electionId);
    if (!election) {
      return res.status(404).json({
        success: false,
        message: "Election not found",
      });
    }

    const allCandidates = await Candidate.aggregate([
      { $match: { electionId: new ObjectId(electionId) } },
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "_id",
          as: "student",
        },
      },
      {
        $project: {
          position: 1,
          imageUrl: 1,
          studentName: {
            $concat: [
              { $arrayElemAt: ["$student.firstName", 0] },
              " ",
              { $arrayElemAt: ["$student.middleName", 0] },
              " ",
              { $arrayElemAt: ["$student.lastName", 0] },
            ],
          },
        },
      },
    ]);

    const voteCounts = await Vote.aggregate([
      { $match: { electionId: new ObjectId(electionId) } },
      { $unwind: "$votes" },
      {
        $group: {
          _id: {
            position: "$votes.position",
            candidateId: "$votes.candidateId",
          },
          votes: { $sum: 1 },
        },
      },
    ]);

    const voteMap = new Map(
      voteCounts.map((count) => [
        count._id.candidateId.toString(),
        {
          position: count._id.position,
          votes: count.votes,
        },
      ])
    );

    const results = allCandidates.map((candidate) => ({
      candidateId: candidate._id,
      position: candidate.position,
      votes: voteMap.get(candidate._id.toString())?.votes || 0,
      imageUrl: candidate.imageUrl,
      studentName: candidate.studentName,
    }));

    const groupedResults = results.reduce((acc, result) => {
      const position = result.position;
      if (!acc[position]) {
        acc[position] = [];
      }
      acc[position].push({
        candidateId: result.candidateId,
        votes: result.votes,
        imageUrl: result.imageUrl,
        studentName: result.studentName,
      });
      return acc;
    }, {});

    Object.keys(groupedResults).forEach((position) => {
      groupedResults[position].sort((a, b) => b.votes - a.votes);
    });

    res.json({
      success: true,
      data: groupedResults,
    });
  } catch (error) {
    console.error("Results fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching election results",
    });
  }
});

router.get("/partial-results/:electionId", async (req, res) => {
  try {
    const { electionId } = req.params;

    const election = await Election.findById(electionId);
    if (!election) {
      return res.status(404).json({
        success: false,
        message: "Election not found"
      });
    }

    if (election.status !== "ongoing") {
      return res.status(400).json({
        success: false,
        message: "Partial results are only available for ongoing elections"
      });
    }

    const voteCounts = await Vote.aggregate([
      { $match: { electionId: new ObjectId(electionId) } },
      { $unwind: "$votes" },
      {
        $group: {
          _id: {
            position: "$votes.position",
            candidateId: "$votes.candidateId"
          },
          votes: { $sum: 1 }
        }
      }
    ]);

    const allCandidates = await Candidate.aggregate([
      { $match: { electionId: new ObjectId(electionId) } },
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "_id",
          as: "student"
        }
      },
      {
        $project: {
          position: 1,
          imageUrl: 1,
          studentName: {
            $concat: [
              { $arrayElemAt: ["$student.firstName", 0] },
              " ",
              { $arrayElemAt: ["$student.middleName", 0] },
              " ",
              { $arrayElemAt: ["$student.lastName", 0] }
            ]
          }
        }
      }
    ]);

    const voteMap = new Map(
      voteCounts.map(count => [
        count._id.candidateId.toString(),
        {
          position: count._id.position,
          votes: count.votes
        }
      ])
    );

    const results = allCandidates.map(candidate => ({
      candidateId: candidate._id,
      position: candidate.position,
      votes: voteMap.get(candidate._id.toString())?.votes || 0,
      studentName: candidate.studentName,
      imageUrl: candidate.imageUrl 
    }));

    const groupedResults = results.reduce((acc, result) => {
      const position = result.position;
      if (!acc[position]) {
        acc[position] = [];
      }
      acc[position].push(result);
      return acc;
    }, {});


    Object.keys(groupedResults).forEach(position => {
      groupedResults[position].sort((a, b) => b.votes - a.votes);
    });

    const totalVotesCast = await Vote.countDocuments({ electionId });

    res.json({
      success: true,
      data: {
        results: groupedResults,
        totalVotesCast
      }
    });
  } catch (error) {
    console.error("Partial results fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching partial election results"
    });
  }
});

router.get("/results/:electionId/demographics", async (req, res) => {
  try {
    const { electionId } = req.params;

    const results = await Vote.aggregate([
      { $match: { electionId: new ObjectId(electionId) } },
      { $unwind: "$votes" },
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "_id",
          as: "voter",
        },
      },
      { $unwind: "$voter" },
      {
        $lookup: {
          from: "programs",
          localField: "voter.programId",
          foreignField: "_id",
          as: "program",
        },
      },
      { $unwind: "$program" },

      {
        $group: {
          _id: {
            position: "$votes.position",
            candidateId: "$votes.candidateId",
            program: "$program.programName",
            yearLevel: "$voter.yearLevel",
          },
          votes: { $sum: 1 },
        },
      },

      {
        $lookup: {
          from: "candidates",
          localField: "_id.candidateId",
          foreignField: "_id",
          as: "candidate",
        },
      },
      { $unwind: "$candidate" },

      {
        $lookup: {
          from: "students",
          localField: "candidate.studentId",
          foreignField: "_id",
          as: "studentInfo",
        },
      },
      { $unwind: "$studentInfo" },
      {
        $group: {
          _id: {
            position: "$_id.position",
            candidateId: "$_id.candidateId",
            program: "$_id.program",
          },
          candidateName: {
            $first: {
              $concat: [
                "$studentInfo.firstName",
                " ",
                "$studentInfo.middleName",
                " ",
                "$studentInfo.lastName",
              ],
            },
          },
          votes: { $sum: "$votes" },
          yearLevels: {
            $push: {
              yearLevel: "$_id.yearLevel",
              votes: "$votes",
            },
          },
        },
      },

      {
        $group: {
          _id: "$_id.position",
          candidates: {
            $push: {
              candidateId: "$_id.candidateId",
              candidateName: "$candidateName",
              programBreakdown: {
                program: "$_id.program",
                votes: "$votes",
                yearLevels: "$yearLevels",
              },
            },
          },
        },
      },
    ]);

    const formattedResults = results.reduce((acc, curr) => {
      acc[curr._id] = {
        candidates: curr.candidates.map((candidate) => ({
          ...candidate,
          programBreakdown: [
            {
              programName: candidate.programBreakdown.program,
              votes: candidate.programBreakdown.votes,
              yearLevels: candidate.programBreakdown.yearLevels,
            },
          ],
        })),
      };
      return acc;
    }, {});

    res.json({
      success: true,
      data: formattedResults,
    });
  } catch (error) {
    console.error("Demographics fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching demographics data",
    });
  }
});

router.get("/results/:electionId/pdf", async (req, res) => {
  console.log("pdf");
  try {
    const { electionId } = req.params;

    const election = await Election.findById(electionId);
    if (!election) {
      return res.status(404).json({
        success: false,
        message: "Election not found",
      });
    }

    const allCandidates = await Candidate.aggregate([
      { $match: { electionId: new ObjectId(electionId) } },
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "_id",
          as: "student",
        },
      },
      {
        $project: {
          position: 1,
          imageUrl: 1,
          studentName: {
            $concat: [
              { $arrayElemAt: ["$student.firstName", 0] },
              " ",
              { $arrayElemAt: ["$student.middleName", 0] },
              " ",
              { $arrayElemAt: ["$student.lastName", 0] },
            ],
          },
        },
      },
      {
        $sort: { position: 1 },
      },
    ]);

    const voteCounts = await Vote.aggregate([
      { $match: { electionId: new ObjectId(electionId) } },
      { $unwind: "$votes" },
      {
        $group: {
          _id: {
            position: "$votes.position",
            candidateId: "$votes.candidateId",
          },
          votes: { $sum: 1 },
        },
      },
    ]);

    const voteMap = new Map(
      voteCounts.map((count) => [
        count._id.candidateId.toString(),
        {
          position: count._id.position,
          votes: count.votes,
        },
      ])
    );

    const doc = new PDFDocument({
      size: "A4",
      margins: {
        top: 36,
        bottom: 36,
        left: 36,
        right: 36,
      },
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=election-results-${electionId}.pdf`
    );
    doc.pipe(res);

    doc
      .fontSize(16)
      .font("Helvetica-Bold")
      .text("ELECTION RESULTS", { align: "center" })
      .moveDown(0.5);

    doc
      .rect(36, doc.y, doc.page.width - 72, 65)
      .stroke()
      .fontSize(9)
      .font("Helvetica")
      .text(`Election Name: ${election.name}`, 46, doc.y + 10)
      .text(`Election Type: ${election.electionType}`)
      .text(`Start Date: ${moment(election.startDate).format("MMMM D, YYYY")}`)
      .text(`End Date: ${moment(election.endDate).format("MMMM D, YYYY")}`)
      .text(`Status: ${election.status.toUpperCase()}`)
      .moveDown(1);

    const groupedCandidates = allCandidates.reduce((acc, candidate) => {
      if (!acc[candidate.position]) {
        acc[candidate.position] = [];
      }
      acc[candidate.position].push({
        ...candidate,
        votes: voteMap.get(candidate._id.toString())?.votes || 0,
      });
      return acc;
    }, {});

    const sortedPositions = Object.keys(groupedCandidates).sort();

    sortedPositions.forEach((position) => {
      const candidates = groupedCandidates[position];
      candidates.sort((a, b) => b.votes - a.votes);
      const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .fillColor("#000")
        .text(position.toUpperCase(), { align: "left" })
        .moveDown(0.3);

      const tableTop = doc.y;
      const rowHeight = 20;

      doc.rect(36, tableTop, doc.page.width - 72, rowHeight).fill("#f0f0f0");

      doc
        .fontSize(8)
        .font("Helvetica-Bold")
        .fillColor("#000")
        .text("RANK", 46, tableTop + 6)
        .text("CANDIDATE NAME", 86, tableTop + 6)
        .text("VOTES", 336, tableTop + 6)
        .text("PERCENTAGE", 436, tableTop + 6);

      candidates.forEach((candidate, index) => {
        const y = tableTop + rowHeight + index * rowHeight;
        const percentage =
          totalVotes > 0
            ? ((candidate.votes / totalVotes) * 100).toFixed(2)
            : "0.00";

        if (index === 0 && candidate.votes > 0) {
          doc.rect(36, y, doc.page.width - 72, rowHeight).fill("#e8f5e9");
        }

        doc
          .fontSize(8)
          .font("Helvetica")
          .fillColor("#000")
          .text(`${index + 1}`, 46, y + 6)
          .text(candidate.studentName, 86, y + 6)
          .text(candidate.votes.toString(), 336, y + 6)
          .text(`${percentage}%`, 436, y + 6);
      });

      doc.moveDown(1.5);
    });
    doc.end();
  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).json({
      success: false,
      message: "Error generating PDF report",
    });
  }
});



module.exports = router;
