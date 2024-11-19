import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './HomePage'; 
import WorkerIdInterface from './WorkerIdInterface';
import VotingInterface from './VotingInterface';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workeridinterface" element={<WorkerIdInterface />} />
        <Route path="/votinginterface" element={<VotingInterface />} />
      </Routes>
    </Router>
  );
}

export default App;

