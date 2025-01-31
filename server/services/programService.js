const MODEL = require('../models/programModel');

const getAll = async () => {
    return await MODEL.find();
};

const getById = async (id) => {
    return await MODEL.findById(id);
};

const add = async (data) => {
    const newItem = new MODEL(data);
    console.log(newItem)
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
    add,
    update,
    remove,
};