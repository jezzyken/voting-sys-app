const MODEL = require("../models/electionModel");

const getAll = async () => {
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
