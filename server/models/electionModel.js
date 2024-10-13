// models/electionModel.js
const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    positions: [String],
    electionType: { type: String, enum: ['SSC', 'Classroom'], required: true },
    scope: String,
    status: { type: String, enum: ['pending', 'ongoing', 'completed'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Election', electionSchema);