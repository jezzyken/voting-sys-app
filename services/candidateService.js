const MODEL = require("../models/candidateModel");
const UPLOAD = require("../config/cloudinary");

const getAll = async () => {
  return await MODEL.find()
    .populate("studentId", "firstName middleName lastName lrn")
    .populate("electionId", "name")
};

const getById = async (id) => {
  return await MODEL.findById(id);
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
  add,
  update,
  remove,
};
