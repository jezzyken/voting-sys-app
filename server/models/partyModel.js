const mongoose = require('mongoose');

const partySchema = new mongoose.Schema({
    name: { type: String, required: true },
    // Add other fields as necessary
});

module.exports = mongoose.model('Party', partySchema);