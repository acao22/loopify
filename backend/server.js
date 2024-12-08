const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

// models
const Vote = require('./models/Vote');
const Playlist = require("./models/Playlist");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://<your-username>:<your-password>@loopifycluster.ducae.mongodb.net/loopify?retryWrites=true&w=majority";

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

// API Endpoints:

// getting all votes
app.get('/api/vote', async (req, res) => {
    try {
        const votes = await Vote.find();
        res.status(200).json(votes);
    } catch (error) {
        console.error('Error fetching votes:', error);
        res.status(500).json({ message: 'Error fetching votes', error: error.message });
    }
});

// Get all playlists
app.get('/api/playlists', async (req, res) => {
    try {
      const playlists = await Playlist.find(); // Fetch playlists from MongoDB
      res.status(200).json(playlists);
    } catch (error) {
      console.error("Error fetching playlists:", error);
      res.status(500).json({ message: "Error fetching playlists" });
    }
  });
  
  // Add a new playlist
  app.post('/api/playlists', async (req, res) => {
    const { title } = req.body;
  
    // Validate the title
    if (!title || title.trim() === '') {
      return res.status(400).json({ message: "Playlist title is required" });
    }
  
    try {
      const newPlaylist = new Playlist({ title }); // Create new playlist document
      await newPlaylist.save(); // Save to MongoDB
      res.status(201).json({ message: "Playlist added successfully", playlist: newPlaylist });
    } catch (error) {
      console.error("Error adding playlist:", error);
      res.status(500).json({ message: "Error adding playlist" });
    }
  });  

// submit/update votes
app.post('/api/vote', async (req, res) => {
    const { workerId, playlist, votes } = req.body;

    try {
        // test log incoming data
        console.log('Request body:', req.body); 

        // validate playlist exists in Playlist collection
        const existingPlaylist = await Playlist.findOne({ title: playlist });
        if (!existingPlaylist) {
            return res.status(400).json({ message: "Invalid playlist" });
        }

        // validating input
        if (!workerId || !playlist || !votes || !Array.isArray(votes)) {
            console.error('Invalid input data');
            return res.status(400).json({ message: 'Invalid input data' });
        }

        // find existing vote document
        let vote = await Vote.findOne({ workerId, playlist });

        if (!vote) {
            // create new document if not found
            vote = new Vote({ workerId, playlist, votes });
            console.log('Creating new vote document:', vote);
        } else {
            // update votes array
            console.log('Existing document before update:', vote);
            vote.votes = votes;
            console.log('Updated document:', vote);
        }

        console.log('Votes array before saving:', votes);
        if (!votes.every(v => v.song && v.vote)) {
            console.error('Invalid votes array structure:', votes);
            return res.status(400).json({ message: 'Invalid votes array structure' });
        }

        // sav document to MongoDB
        const savedVote = await vote.save();
        console.log('Saved vote:', savedVote);

        res.status(200).json({ message: 'Vote submitted successfully', vote: savedVote });
    } catch (error) {
        console.error('Error saving vote:', error);
        res.status(500).json({ message: 'Error saving vote', error: error.message });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
