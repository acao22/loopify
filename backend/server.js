const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

// vote model
const Vote = require('./models/Vote');

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

// submit/update votes
app.post('/api/vote', async (req, res) => {
    const { workerId, playlist, votes } = req.body;

    try {
        // test log incoming data
        console.log('Request body:', req.body); 

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

// Get list of available playlists
app.get('/api/playlists', async (req, res) => {
    try {
        // Get unique playlists from votes
        const votes = await Vote.find();
        const playlists = [...new Set(votes.map(vote => vote.playlist))];
        res.status(200).json(playlists);
    } catch (error) {
        console.error('Error fetching playlists:', error);
        res.status(500).json({ message: 'Error fetching playlists', error: error.message });
    }
});

// Get songs for a specific playlist
app.get('/api/playlists/:playlist/songs', async (req, res) => {
    try {
        const { playlist } = req.params;
        
        // Get all votes for this playlist
        const votes = await Vote.find({ playlist });
        
        // Run quality control validation
        const validatedSongs = validateSongs(votes);
        console.log('Validated songs:', validatedSongs);
        console.log('Number of validated songs:', validatedSongs.length);
        
        // Return validated songs with confidence scores
        res.status(200).json(validatedSongs);
    } catch (error) {
        console.error('Error fetching playlist songs:', error);
        res.status(500).json({ message: 'Error fetching playlist songs', error: error.message });
    }
});

// Quality control helper functions
function validateSongs(votes, threshold = 0.5) {
    // First filter out low quality workers
    const lowQualityWorkers = identifyLowQualityWorkers(votes);
    const filteredVotes = votes.filter(vote => !lowQualityWorkers.includes(vote.workerId));
    
    // Calculate vote ratios for each song
    const songVotes = {};
    
    filteredVotes.forEach(vote => {
        vote.votes.forEach(v => {
            if (!songVotes[v.song]) {
                songVotes[v.song] = { positive: 0, total: 0 };
            }
            songVotes[v.song].total += 1;
            if (v.vote === 'yes') {
                songVotes[v.song].positive += 1;
            }
        });
    });
    
    // Filter songs based on threshold
    const validatedSongs = Object.entries(songVotes)
        .filter(([_, counts]) => (counts.positive / counts.total) >= threshold)
        .map(([song, counts]) => ({
            song,
            confidence: counts.positive / counts.total
        }));
    
    return validatedSongs;
}

function identifyLowQualityWorkers(votes, agreementThreshold = 0.3) {
    const workerAgreements = {};
    
    // Calculate majority votes for each song
    const songMajorities = {};
    votes.forEach(vote => {
        vote.votes.forEach(v => {
            if (!songMajorities[v.song]) {
                songMajorities[v.song] = { yes: 0, no: 0 };
            }
            songMajorities[v.song][v.vote] += 1;
        });
    });
    
    // Calculate worker agreement with majority
    votes.forEach(vote => {
        let agreements = 0;
        let totalVotes = 0;
        
        vote.votes.forEach(v => {
            const majorityVote = songMajorities[v.song].yes > songMajorities[v.song].no ? 'yes' : 'no';
            if (v.vote === majorityVote) {
                agreements += 1;
            }
            totalVotes += 1;
        });
        
        if (totalVotes > 0) {
            const agreementRatio = agreements / totalVotes;
            if (agreementRatio < agreementThreshold) {
                workerAgreements[vote.workerId] = true;
            }
        }
    });
    
    return Object.keys(workerAgreements);
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
