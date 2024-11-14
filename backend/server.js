const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const csv = require('csv-parser');
const { parse } = require('json2csv');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const csvFilePath = path.join(__dirname, '../data/testData.csv');

// API get endpoint to handle vote
app.get('/api/vote', (req, res) => {
    return res.json({ message: 'GET request is successful' });
});

// API post endpoint to handle vote
app.post('/api/vote', (req, res) => {
    const { workerId, playlist, newVote } = req.body;

    // Read and parse the CSV file
    fs.readFile(csvFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Error reading file' });

        const lines = data.split('\n');
        const headers = lines[0].split(',');

        // Find the index of the workerId
        const workerIndex = lines.findIndex(line => line.startsWith(workerId));

        // Create a new line for the worker if not found
        // if (workerIndex === -1) {
        //     const newLine = [workerId, playlist, ...votes].join(',');
        //     lines.push(newLine);
        // } else {
        //     // Update the existing line with new votes
        //     const existingLine = lines[workerIndex].split(',');
        //     votes.forEach((vote, index) => {
        //         existingLine[2 + index] = vote;
        //     });
        //     lines[workerIndex] = existingLine.join(',');
        // }
        if (workerIndex === -1) {
            const newLine = workerId + "," + playlist + "," + newVote;
            lines.push(newLine);
        } else {
            // Update the existing line with new votes
            lines[workerIndex] = lines[workerIndex] + "," + newVote;
        }

        // Write back to the CSV file
        fs.writeFile(csvFilePath, lines.join('\n'), (err) => {
            if (err) return res.status(500).json({ message: 'Error writing file' });

            return res.json({ message: 'Vote submitted successfully' });
        });
    });
});

app.listen(5001, () => {
    console.log('Server is running on port 5001');
});