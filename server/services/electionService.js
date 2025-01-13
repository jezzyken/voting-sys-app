const MODEL = require("../models/electionModel");
const SIUDENT_MODEL = require("../models/studentModel");
const VOTE_MODEL = require("../models/studentModel");
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Singapore');

async function checkAndUpdateElectionStatus() {
  try {
    const currentDate = moment().tz('Asia/Singapore');
    
    const ongoingElections = await MODEL.find({ status: "ongoing" });

    for (const election of ongoingElections) {
      let shouldComplete = false;

      if (moment(election.endDate).isBefore(currentDate)) {
        shouldComplete = true;
      } else {
        const totalEligibleVoters = await SIUDENT_MODEL.countDocuments({
          status: "active",
          ...(election.electionType === "Classroom" 
            ? { classroomId: election.classroomId } 
            : {})
        });

        const totalVotes = await VOTE_MODEL.countDocuments({
          electionId: election._id
        });

        if (totalVotes >= totalEligibleVoters && totalEligibleVoters > 0) {
          shouldComplete = true;
        }
      }

      if (shouldComplete) {
        await MODEL.findByIdAndUpdate(
          election._id,
          { status: "completed" },
          { new: true }
        );
        console.log(`Election ${election.name} marked as completed`);
      }
    }
  } catch (error) {
    console.error("Error checking election status:", error);
  }
}

const getAll = async () => {
  await checkAndUpdateElectionStatus()
  return await MODEL.find().sort({ _id: -1 });
};

const getOngoingElectionCandidates = async () => {
  const pipeline = [
    {
      $match: {
        status: "ongoing",
        electionType: "SSC",
        // startDate: { $lte: new Date() },
        // endDate: { $gte: new Date() },
      },
    },
    {
      $sort: { startDate: -1 },
    },
    {
      $limit: 1,
    },
    {
      $lookup: {
        from: "candidates",
        localField: "_id",
        foreignField: "electionId",
        as: "candidates",
      },
    },
    {
      $unwind: "$candidates",
    },
    {
      $match: {
        "candidates.position": "president",
      },
    },
    {
      $lookup: {
        from: "students",
        localField: "candidates.studentId",
        foreignField: "_id",
        as: "candidateInfo",
      },
    },
    {
      $unwind: "$candidateInfo",
    },
    {
      $project: {
        electionName: "$name",
        electionStartDate: "$startDate",
        electionEndDate: "$endDate",
        candidateFullName: {
          $concat: [
            "$candidateInfo.firstName",
            " ",
            "$candidateInfo.middleName",
            " ",
            "$candidateInfo.lastName",
          ],
        },
        candidateManifesto: "$candidates.manifesto",
        candidateImageUrl: "$candidates.imageUrl",
        candidateYearLevel: "$candidateInfo.yearLevel",
      },
    },
  ];

  const results = await MODEL.aggregate(pipeline);

  return results;
};

const getUpcomingEvents = async () => {
  const pipeline = [
    {
      $match: {
        status: "upcoming",
      },
    },
    {
      $sort: { startDate: 1 },
    },
    {
      $limit: 5,
    },
    {
      $project: {
        name: 1,
        startDate: 1,
        endDate: 1,
        location: 1,
      },
    },
  ];

  return await MODEL.aggregate(pipeline);
};

const getById = async (id) => {
  return await MODEL.findById(id);
};

const add = async (data) => {
  const newItem = new MODEL(data);
  return await newItem.save();
};

const update = async (id, data) => {
  return await MODEL.findByIdAndUpdate(id, data, { new: true });
};

const remove = async (id) => {
  return await MODEL.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  getById,
  getOngoingElectionCandidates,
  getUpcomingEvents,
  add,
  update,
  remove,
};
