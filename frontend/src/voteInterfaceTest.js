import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function VotingInterface() {
    const [playlist, setPlaylist] = useState('');
    const [songs, setSongs] = useState([]);
    const [votes, setVotes] = useState({});
    const [message, setMessage] = useState('');
    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    const location = useLocation();
    const { workerId } = location.state || {};

    // Fetch playlist and songs
    const fetchPlaylistAndSongs = async () => {
        setPlaylist('Feel-Good Classics');
        setSongs([
            { name: 'Billie Jean', image: 'https://via.placeholder.com/300x300.png?text=Album+Cover' },
            { name: 'Bohemian Rhapsody', image: 'https://via.placeholder.com/300x300.png?text=Album+Cover' },
            { name: 'Rolling in the Deep', image: 'https://via.placeholder.com/300x300.png?text=Album+Cover' },
            { name: 'Blinding Lights', image: 'https://via.placeholder.com/300x300.png?text=Album+Cover' },
        ]);
    };

    useEffect(() => {
        fetchPlaylistAndSongs();
    }, []);

    const handleVote = (song, vote) => {
        setVotes((prevVotes) => ({
            ...prevVotes,
            [song]: vote,
        }));
    };

    const handleNextSong = () => {
        if (currentSongIndex < songs.length - 1) {
            setCurrentSongIndex(currentSongIndex + 1);
        } else {
            setMessage('Thanks for voting!');
        }
    };

    const currentSong = songs[currentSongIndex];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#4D9B0E] to-[#1A3505] flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold text-white mb-6">Help build our playlists</h1>
            <div className="bg-white rounded-lg shadow-md max-w-sm w-full p-6">
                <h2 className="text-center text-xl font-semibold mb-2">{playlist}</h2>
                <p className="text-center text-gray-700 mb-4">Select yes if the song fits the playlist.</p>

                {currentSong && (
                    <>
                        <img
                            src={currentSong.image}
                            alt="Album Cover"
                            className="w-full h-64 object-cover rounded-lg mb-4"
                        />
                        <p className="text-center text-lg font-bold mb-4">{currentSong.name}</p>
                        <div className="flex justify-center items-center gap-4 mb-4">
                            <button className="p-3 rounded-full bg-gray-300 shadow-md">
                                <svg className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M10 19L4 12l6-7v14zm9-14v14l-6-7 6-7z" fill="currentColor" />
                                </svg>
                            </button>
                            <button className="p-3 rounded-full bg-blue-500 text-white shadow-md">
                                <svg className="h-6 w-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7L8 5z" />
                                </svg>
                            </button>
                            <button className="p-3 rounded-full bg-gray-300 shadow-md">
                                <svg className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M14 5v14l6-7-6-7zM5 5l6 7-6 7V5z" fill="currentColor" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={() => {
                                    handleVote(currentSong.name, 'y');
                                    handleNextSong();
                                }}
                                className="w-24 bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-600"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => {
                                    handleVote(currentSong.name, 'n');
                                    handleNextSong();
                                }}
                                className="w-24 bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600"
                            >
                                No
                            </button>

                            <button
                                onClick={handleNextSong}
                                className="w-24 bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600"
                            >
                                Next Song
                            </button>

                        </div>
                    </>
                )}

                {message && <p className="text-center text-gray-700 mt-4">{message}</p>}
            </div>
        </div>
    );
}

export default VotingInterface;
