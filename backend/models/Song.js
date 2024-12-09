const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artists: [{ type: String, required: true }],
    playlists: [{ type: String }],  // List of playlists this song appears in
    confidence: {
        type: Map,
        of: Number,
        default: new Map()  // Stores confidence scores per playlist
    }
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song; 