import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './HomePage'; 
import WorkerIdInterface from './WorkerIdInterface';
import VotingInterface from './VotingInterface';
import GenerateSong from './GenerateSong';
import ThankYouScreen from "./ThankYouScreen";
import PlaylistInterface from "./PlaylistInterface.tsx";
import Playlists from "./Playlists";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workeridinterface" element={<WorkerIdInterface />} />
        <Route path="/vote/:playlistName" element={<VotingInterface />} />
        <Route path="/generateSong" element={<GenerateSong />} />
        <Route path="/thank-you" element={<ThankYouScreen />} />
        {/* <Route path="/playlist" element={< PlaylistInterface />} /> */}
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/playlist/:playlistName" element={<PlaylistInterface />} />

      </Routes>
    </Router>
  );
}

export default App;

