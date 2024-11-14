import React, { useState, useEffect } from 'react';
function VoteInterface() {
    const [workerId, setWorkerId] = useState('');
    const [playlist, setPlaylist] = useState('');
    const [songs, setSongs] = useState([]);
    const [votes, setVotes] = useState({});
    const [newVote, setNewVote] = useState('');
    const [message, setMessage] = useState('');

    const fetchPlaylistAndSongs = async () => {
        setPlaylist('Feel-Good Classics');
        setSongs([
            'Billie Jean', 'Bohemian Rhapsody', 'Rolling in the Deep', 'Blinding Lights'
        ]);
    };

    useEffect(() => {
        fetchPlaylistAndSongs();
    }, []);

    const handleVote = (song, vote) => {
        setVotes((prevVotes) => ({ ...prevVotes, [song]: vote }));
    };

    const handleNewVote = (vote) => {
        setNewVote(vote);
    }


    // const handleSubmitVotes = async () => {
    //     try {
    //         console.log('Submitting votes:', { workerId, playlist, votes });
    //         const votesArray = Object.entries(votes).map(([song, vote]) => vote);
    //         const response = await fetch('http://localhost:5001/api/vote', {
    //             mode: 'cors',
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Access-Control-Allow-Origin': '*',
    //             },
    //             body: JSON.stringify({ workerId, playlist, votes: votesArray }),
    //         });
    //         console.log('Response status:', response.status);
    //         const result = await response.json();
    //         console.log('Response data:', result);
    //         setMessage(result.message);
    //     } catch (error) {
    //         console.error('Error submitting votes:', error);
    //         setMessage('Error submitting vote');
    //     }
    // };

    const handleSubmitVotes = async () => {
        try {
            console.log('Submitting votes:', { workerId, playlist, newVote });
            const response = await fetch('http://localhost:5001/api/vote', {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({ workerId, playlist, newVote }),
            });
            console.log('Response status:', response.status);
            const result = await response.json();
            console.log('Response data:', result);
            setMessage(result.message);
        } catch (error) {
            console.error('Error submitting votes:', error);
            setMessage('Error submitting vote');
        }
    }

    return (
        <div className="flex flex-col items-center justify-center bg-gradient-to-b from-[#4D9B0E] to-[#1A3505] min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-center mb-6">Vote on Song Fit</h2>
                
                <input
                    type="text"
                    value={workerId}
                    onChange={(e) => setWorkerId(e.target.value)}
                    placeholder="Enter Worker ID"
                    className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                <div className="text-center mb-6">
                    <p className="text-lg font-semibold">Playlist: <span className="text-gray-700">{playlist}</span></p>
                </div>
                
                {songs.map((song) => (
                    <div key={song} className="mb-4">
                        <p className="text-lg font-semibold">{song}</p>
                        <div className="flex justify-around">
                            <button
                                onClick={() => handleNewVote('y')}
                                className="w-24 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => handleNewVote('n')}
                                className="w-24 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
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
                )}
            </div>
        </div>
    );
}

export default VoteInterface;