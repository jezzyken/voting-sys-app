const express = require('express');
const router = express.Router();
const Vote = require('../../models/voteModel');
const Election = require('../../models/electionModel');
const Candidate = require('../../models/candidateModel');
const ObjectId = require("mongoose").Types.ObjectId;

router.post('/', async (req, res) => {
  try {
    const { electionId, studentId, votes } = req.body;


    const election = await Election.findOne({
      _id: electionId,
    });

    if (!election) {
      return res.status(400).json({
        success: false,
        message: 'Election not found or not active'
      });
    }

    const existingVote = await Vote.findOne({
      studentId,
      electionId
    });

    if (existingVote) {
      return res.status(400).json({
        success: false,
        message: 'You have already voted in this election'
      });
    }

    const candidateIds = votes.map(vote => vote.candidateId);
    const candidates = await Candidate.find({
      _id: { $in: candidateIds },
      electionId
    });

    if (candidates.length !== votes.length) {
      return res.status(400).json({
        success: false,
        message: 'Invalid candidates selected'
      });
    }

    const positions = votes.map(vote => vote.position);
    const uniquePositions = new Set(positions);
    if (positions.length !== uniquePositions.size) {
      return res.status(400).json({
        success: false,
        message: 'Multiple votes for same position not allowed'
      });
    }

    const vote = new Vote({
      studentId,
      electionId,
      votes
    });

    await vote.save();

    res.status(201).json({
      success: true,
      message: 'Vote submitted successfully'
    });

  } catch (error) {
    console.error('Vote submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting vote'
    });
  }
});

router.get('/check/:electionId/:studentId', async (req, res) => {
  const ObjectId = require("mongoose").Types.ObjectId;

  try {
    const { electionId, studentId } = req.params;

    console.log(req.params)

    const vote = await Vote.findOne({
      studentId,
      electionId
    });

    res.json({
      hasVoted: !!vote
    });

  } catch (error) {
    console.error('Vote check error:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking vote status'
    });
  }
});

router.get('/results/:electionId', async (req, res) => {
  try {
    const { electionId } = req.params;
    
    const election = await Election.findById(electionId);
    if (!election) {
      return res.status(404).json({
        success: false,
        message: 'Election not found'
      });
    }

    const results = await Vote.aggregate([
      { $match: { electionId: new ObjectId(electionId) } },
      { $unwind: '$votes' },
      {
        $group: {
          _id: {
            position: '$votes.position',
            candidateId: '$votes.candidateId'
          },
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'candidates',
          localField: '_id.candidateId',
          foreignField: '_id',
          as: 'candidate'
        }
      },
      {
        $lookup: {
          from: 'students',
          localField: 'candidate.studentId',
          foreignField: '_id',
          as: 'student'
        }
      },
      {
        $project: {
          position: '$_id.position',
          candidateId: '$_id.candidateId',
          votes: '$count',
          'candidate.imageUrl': 1,
          'student.firstName': 1,
          'student.middleName': 1,
          'student.lastName': 1
        }
      },
      {
        $sort: {
          position: 1,
          votes: -1
        }
      }
    ]);

    const groupedResults = results.reduce((acc, result) => {
      const position = result.position;
      if (!acc[position]) {
        acc[position] = [];
      }
      acc[position].push({
        candidateId: result.candidateId,
        votes: result.votes,
        imageUrl: result.candidate[0]?.imageUrl,
        studentName: result.student[0] ? 
          `${result.student[0].firstName} ${result.student[0].middleName} ${result.student[0].lastName}` : 
          'Unknown'
      });
      return acc;
    }, {});

    res.json({
      success: true,
      data: groupedResults
    });

  } catch (error) {
    console.error('Results fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching election results'
    });
  }
});

module.exports = router;