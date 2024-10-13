// models/candidateModel.js
const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    electionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Election', required: true },
    position: { type: String, required: true },
    partyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Party' },
    manifesto: String,
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);