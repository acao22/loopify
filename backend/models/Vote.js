const mongoose = require('mongoose');

// our vote schema for now
const voteSchema = new mongoose.Schema({
    workerId: { type: String, required: true },
    playlist: { type: String, required: true },
    votes: [
        {
            song: { type: String, required: true }, 
            vote: { type: String, required: true }, 
        },
    ],
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
