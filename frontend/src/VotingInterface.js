import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function VotingInterface() {
    const [playlist, setPlaylist] = useState('');
    const [songs, setSongs] = useState([]);
    const [votes, setVotes] = useState({});
    const [message, setMessage] = useState('');
    const [currentSongIndex, setCurrentSongIndex] = useState(0); // Track current song index

    const location = useLocation();
    const { workerId } = location.state || {}; // Get workerId from state

    // fetch hardcoded playlist and songs
    const fetchPlaylistAndSongs = async () => {
        setPlaylist('Feel-Good Classics');
        setSongs([
            'Billie Jean',
            'Bohemian Rhapsody',
            'Rolling in the Deep',
            'Blinding Lights',
        ]);
    };

    useEffect(() => {
        fetchPlaylistAndSongs();
    }, []);

    // Handle vote changes for specific songs
    const handleVote = (song, vote) => {
        setVotes((prevVotes) => ({
            ...prevVotes,
            [song]: vote, 
        }));
    };

    // Submit votes to backend
    const handleSubmitVotes = async () => {
        if (!Object.keys(votes).length) {
            setMessage('Please vote for at least one song!');
            return;
        }

        console.log('Submitting votes:', votes);

        // Convert votes object to an array of objects with song-vote pairs
        const votesArray = Object.entries(votes).map(([song, vote]) => ({
            song,
            vote,
        }));

        console.log('Votes array:', votesArray);

        try {
            const response = await fetch('http://localhost:5001/api/vote', {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ workerId, playlist, votes: votesArray }),
            });

            const result = await response.json();
            console.log('Response data:', result);
            setMessage(result.message || 'Votes submitted successfully');
        } catch (error) {
            console.error('Error submitting vote:', error);
            setMessage('Error submitting vote');
        }
    };

    // Move to the next song after a vote
    const handleNextSong = () => {
        if (currentSongIndex < songs.length - 1) {
            setCurrentSongIndex(currentSongIndex + 1);
        } else {
            handleSubmitVotes(); // Submit votes if it's the last song
        }
    };

    const currentSong = songs[currentSongIndex];

    return (
        <div className="flex flex-col md:flex-row items-start justify-center bg-gradient-to-b from-[#4D9B0E] to-[#1A3505] min-h-screen p-6">
            {/* Sidebar for displaying voted songs */}
            <div className="w-1/8 bg-white p-4 rounded-lg shadow-md mb-6 md:mb-0 md:mr-6">
                <h3 className="text-xl font-semibold mb-4">
                     Your Votes:
                     Worker {workerId}
                    </h3>
                <div className="space-y-2">
                    {Object.entries(votes).map(([song, vote]) => (
                        <div key={song} className="flex justify-between">
                            <span className="font-semibold">{song}</span>
                            <span className={`text-lg ${vote === 'y' ? 'text-green-700' : 'text-red-700'}`}>
                                {vote === 'y' ? 'Yes' : 'No'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main content area */}
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-center mb-6">Vote on Song Fit</h2>

                <div className="text-center mb-6">
                    <p className="text-lg font-semibold">
                        Playlist: <span className="text-gray-700">{playlist}</span>
                    </p>
                </div>

                {currentSong && (
                    <div className="mb-4">
                        <p className="text-lg font-semibold">{currentSong}</p>
                        <div className="flex justify-around">
                            <button
                                onClick={() => handleVote(currentSong, 'y')}
                                className={`w-24 px-4 py-2 ${
                                    votes[currentSong] === 'y' ? 'bg-green-800' : 'bg-green-500'
                                } text-white rounded-lg shadow hover:bg-green-800`}
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => handleVote(currentSong, 'n')}
                                className={`w-24 px-4 py-2 ${
                                    votes[currentSong] === 'n' ? 'bg-red-800' : 'bg-red-500'
                                } text-white rounded-lg shadow hover:bg-red-800`}
                            >
                                No
                            </button>
                        </div>
                    </div>
                )}

                <button
                    onClick={handleNextSong}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-6"
                >
                    {currentSongIndex < songs.length - 1 ? 'Next Song' : 'Submit Votes'}
                </button>

                {message && (
                    <p className="text-center text-gray-700 mt-4">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default VotingInterface;
