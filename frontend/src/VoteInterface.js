import React, { useState, useEffect } from 'react';

function VoteInterface() {
    const [workerId, setWorkerId] = useState('');
    const [playlist, setPlaylist] = useState('');
    const [song, setSong] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch a playlist and song for voting
        fetchPlaylistAndSong();
    }, []);

    const fetchPlaylistAndSong = async () => {
        // Fetch playlist and song from backend (stubbed for example)
        setPlaylist('Feel-Good Classics');
        setSong('Billie Jean');
    };

    const handleVote = async (vote) => {
        try {
            const response = await fetch('/api/vote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ workerId, playlist, song, vote }),
            });
            const result = await response.json();
            setMessage(result.message);
            // Fetch the next song to vote on
            fetchPlaylistAndSong();
        } catch (error) {
            setMessage('Error submitting vote');
        }
    };

    return (
        <div>
            <h2>Vote on Song Fit</h2>
            <input
                type="text"
                value={workerId}
                onChange={(e) => setWorkerId(e.target.value)}
                placeholder="Enter Worker ID"
            />
            <div>
                <p>Playlist: {playlist}</p>
                <p>Song: {song}</p>
            </div>
            <button onClick={() => handleVote('y')}>Yes</button>
            <button onClick={() => handleVote('n')}>No</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default VoteInterface;
