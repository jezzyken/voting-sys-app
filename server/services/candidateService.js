const MODEL = require("../models/candidateModel");
const UPLOAD = require("../config/cloudinary");
const ObjectId = require("mongoose").Types.ObjectId;

const getAll = async () => {
  return await MODEL.find()
    .populate("studentId", "firstName middleName lastName lrn")
    .populate("electionId", "name");
};

const getById = async (id) => {
  return await MODEL.findById(id);
};

const getByElectionId = async (req) => {
  const candidates = await MODEL.aggregate([
    {
      $match: {
        electionId: new ObjectId(req.params.id),
      },
    },
    {
      $lookup: {
        from: "students", 
        localField: "studentId",
        foreignField: "_id",
        as: "student",
      },
    },
    {
      $unwind: "$student",
    },
    {
      $addFields: {
        "student.fullName": {
          $trim: {
            input: {
              $concat: [
                "$student.firstName",
                " ",
                { $ifNull: ["$student.middleName", ""] },
                {
                  $cond: [
                    { $eq: ["$student.middleName", null] },
                    "",
                    " ",
                  ],
                },
                "$student.lastName",
              ],
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        position: 1,
        manifesto: 1,
        imageUrl: 1,
        status: 1,
        createdAt: 1,
        electionId: 1,
        "student._id": 1,
        "student.fullName": 1,
        "student.yearLevel": 1,
      },
    },
  ]);

  return candidates
};

const add = async (data, image) => {
  const result = await UPLOAD.uploader.upload(image.path, {
    folder: "candidate_images",
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  });

  const newCandidate = new MODEL({
    ...data,
    imageUrl: result.secure_url,
  });

  const savedCandidate = await newCandidate.save();
  return savedCandidate;
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
  getByElectionId,
  add,
  update,
  remove,
};
