import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './HomePage'; 
import VoteInterface from './VoteInterface';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/voteinterface" element={<VoteInterface />} />
      </Routes>
    </Router>
  );
}

export default App;

