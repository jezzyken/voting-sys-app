// models/voteModel.js
const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    electionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Election', required: true },
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
    position: { type: String, required: true },
    voteDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Vote', voteSchema);