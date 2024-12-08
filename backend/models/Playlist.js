const mongoose = require('mongoose');

// Playlist schema
const playlistSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true }, // Playlist title
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

// Create the Playlist model
const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
