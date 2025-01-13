const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Election = require("../../models/electionModel");
const Student = require("../../models/studentModel");
const Candidate = require("../../models/candidateModel");
const Vote = require("../../models/voteModel");

const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Singapore');



router.get("/statistics", async (req, res) => {
  try {
    // Get current ongoing election
    const ongoingElection = await Election.findOne({ status: "ongoing" });

    const [totalElections, totalCandidates, totalStudents] = await Promise.all([
      Election.countDocuments(),
      Candidate.countDocuments(),
      Student.countDocuments(),
    ]);

    let totalVotes = 0;
    let votingPercentage = 0;

    if (ongoingElection) {
      totalVotes = await Vote.countDocuments({
        electionId: ongoingElection._id,
      });

      const activeStudents = await Student.countDocuments({ status: "active" });
      votingPercentage =
        activeStudents > 0
          ? Math.round((totalVotes / activeStudents) * 100)
          : 0;
    }

    const activeElections = await Election.countDocuments({
      status: "ongoing",
    });
    const activeStudents = await Student.countDocuments({ status: "active" });
    const currentCandidates = ongoingElection
      ? await Candidate.countDocuments({ electionId: ongoingElection._id })
      : 0;

    res.json({
      totalElections,
      activeElections,
      totalCandidates,
      currentCandidates,
      totalStudents,
      activeStudents,
      totalVotes,
      votingPercentage,
      currentElection: ongoingElection
        ? ongoingElection.name
        : "No ongoing election",
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching dashboard statistics" });
  }
});

router.get("/voting-trends", async (req, res) => {
  try {
    const currentElection = await Election.findOne({ status: "ongoing" });
    if (!currentElection) {
      return res.json([]);
    }

    const endDate = moment().tz('Asia/Singapore').toDate();
    const startDate = moment().tz('Asia/Singapore').subtract(30, 'minutes').toDate();

    const votingTrends = await Vote.aggregate([
      {
        $match: {
          electionId: currentElection._id,
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d %H:%M",
              date: "$createdAt",
              timezone: "Asia/Singapore"
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Fill in missing minutes with zero votes
    const filledTrends = [];
    let currentDate = moment(startDate).tz('Asia/Singapore');
    const momentEndDate = moment(endDate).tz('Asia/Singapore');

    while (currentDate <= momentEndDate) {
      const dateStr = currentDate.format('YYYY-MM-DD HH:mm');
      const existingTrend = votingTrends.find((trend) => trend._id === dateStr);

      filledTrends.push({
        date: dateStr,
        count: existingTrend ? existingTrend.count : 0,
      });

      currentDate = currentDate.add(1, 'minutes');
    }

    res.json({
      electionName: currentElection.name,
      trends: filledTrends,
    });
  } catch (error) {
    console.error("Error fetching voting trends:", error);
    res.status(500).json({ error: "Error fetching voting trends" });
  }
});

router.get("/participation-stats", async (req, res) => {
  try {
    const currentElection = await Election.findOne({ status: "ongoing" });

    if (!currentElection) {
      return res.json({
        electionName: "No ongoing election",
        stats: {
          voted: 0,
          notVoted: 0,
        },
      });
    }

    const totalStudents = await Student.countDocuments({
      status: "active",
    });

    const votedStudents = await Vote.distinct("studentId", {
      electionId: currentElection._id,
    });

    const stats = {
      voted: votedStudents.length,
      notVoted: totalStudents - votedStudents.length,
    };

    res.json({
      electionName: currentElection.name,
      stats: stats,
    });
  } catch (error) {
    console.error("Error fetching participation stats:", error);
    res.status(500).json({ error: "Error fetching participation stats" });
  }
});

router.get("/current-elections", async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const currentElections = await Election.find({
      $or: [
        { status: { $ne: "completed" } },
        {
          $and: [{ status: "completed" }, { updatedAt: { $gte: oneWeekAgo } }],
        },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(10);

    const electionsWithDetails = await Promise.all(
      currentElections.map(async (election) => {
        const totalEligibleVoters = await Student.countDocuments({
          status: "active",
          ...(election.electionType === "Classroom"
            ? { classroomId: election.classroomId }
            : {}),
        });

        const totalVotes = await Vote.countDocuments({
          electionId: election._id,
        });

        const progress =
          totalEligibleVoters > 0
            ? Math.round((totalVotes / totalEligibleVoters) * 100)
            : 0;

        const formattedEndDate = new Date(election.endDate).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        );

        return {
          id: election._id,
          name: election.name,
          electionType: election.electionType,
          status: election.status,
          endDate: formattedEndDate,
          progress,
          totalVotes,
          totalEligibleVoters,
        };
      })
    );

    res.json(electionsWithDetails);
  } catch (error) {
    res.status(500).json({ error: "Error fetching current elections" });
  }
});

module.exports = router;
