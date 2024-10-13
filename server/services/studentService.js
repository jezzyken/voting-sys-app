const MODEL = require("../models/studentModel");

const getAll = async () => {
  return await MODEL.find().populate("programId");
};

const getById = async (id) => {
  return await MODEL.findById(id).populate("programId");
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

const search = async (req) => {
    console.log(req.query)
  return await MODEL.find({
    $or: [
      { name: { $regex: req.query.query, $options: "i" } },
      { LRN: { $regex: req.query.query, $options: "i" } },
    ],
  }).limit(10);
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
  search,
};
