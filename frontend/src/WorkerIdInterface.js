import React, { useState, useEffect } from 'react';
import VotingInterface from './VotingInterface';
import { useNavigate } from 'react-router-dom';

function WorkerIdInterface() {
    const [workerId, setWorkerId] = useState('');
    const navigate = useNavigate();

    const handleButtonClick = () => {
        if (!workerId) {
            alert('Please enter a Worker ID');
            return;
        }
       // Navigate to the VotingInterface component
       navigate('/votinginterface', { state: { workerId } });
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gradient-to-b from-[#4D9B0E] to-[#1A3505] min-h-screen p-6">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-center mb-6">Vote on Song Fit</h2>

                <input
                    type="text"
                    value={workerId}
                    onChange={(e) => setWorkerId(e.target.value)}
                    placeholder="Enter Worker ID"
                    className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={handleButtonClick}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Submit
                </button>


                {/* <div className="text-center mb-6">
                    <p className="text-lg font-semibold">
                        Playlist: <span className="text-gray-700">{playlist}</span>
                    </p>
                </div>

                {songs.map((song) => (
                    <div key={song} className="mb-4">
                        <p className="text-lg font-semibold">{song}</p>
                        <div className="flex justify-around">
                            <button
                                onClick={() => handleVote(song, 'y')}
                                className={`w-24 px-4 py-2 ${
                                    votes[song] === 'y' ? 'bg-green-800' : 'bg-green-500'
                                } text-white rounded-lg shadow hover:bg-green-800`}
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => handleVote(song, 'n')}
                                className={`w-24 px-4 py-2 ${
                                    votes[song] === 'n' ? 'bg-red-800' : 'bg-red-500'
                                } text-white rounded-lg shadow hover:bg-red-800`}
                            >
                                No
                            </button>
                        </div>
                    </div>
                ))}

                <button
                    onClick={handleSubmitVotes}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-6"
                >
                    Submit Votes
                </button>

                {message && (
                    <p className="text-center text-gray-700 mt-4">
                        {message}
                    </p>
                )} */}
            </div>
        </div>
    );
}

export default WorkerIdInterface;
