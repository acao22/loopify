import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './HomePage'; 
import WorkerIdInterface from './WorkerIdInterface';
import VotingInterface from './VotingInterface';
import GenerateSong from './GenerateSong';
import VoteInterfaceTest from './voteInterfaceTest';
import ThankYouScreen from "./ThankYouScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workeridinterface" element={<WorkerIdInterface />} />
        <Route path="/vote/:playlistName" element={<VotingInterface />} />
        <Route path="/voteInterfaceTest" element={<VoteInterfaceTest />} />
        <Route path="/generateSong" element={<GenerateSong />} />
        <Route path="/thank-you" element={<ThankYouScreen />} />
      </Routes>
    </Router>
  );
}

export default App;

