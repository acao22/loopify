const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }] // Optional reference to Song model
});

module.exports = mongoose.model('Playlist', playlistSchema);
