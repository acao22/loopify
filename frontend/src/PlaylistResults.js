import React, { useState, useEffect } from "react";
import axios from "axios";

const PlaylistResults = () => {
  const [playlists, setPlaylists] = useState([]);
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    // Fetch playlists
    axios
      .get("http://localhost:5001/api/playlists")
      .then((response) => setPlaylists(response.data))
      .catch((error) => console.error("Error fetching playlists:", error));

    // Fetch votes
    axios
      .get("http://localhost:5001/api/vote")
      .then((response) => setVotes(response.data))
      .catch((error) => console.error("Error fetching votes:", error));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Playlist Results</h1>
      {playlists.length === 0 ? (
        <p className="text-center">No playlists available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <div
              key={playlist._id}
              className="p-6 bg-white rounded-lg shadow-lg border border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-4">{playlist.title}</h2>
              <ul>
                {votes
                  .filter((vote) => vote.playlist === playlist.title)
                  .flatMap((vote) => vote.votes.map((v) => v.song))
                  .map((song, index) => (
                    <li key={index} className="mb-2">
                      <strong>{song}</strong>
                    </li>
                  ))}
                {votes.filter((vote) => vote.playlist === playlist.title).length === 0 && (
                  <p>No songs voted for this playlist yet.</p>
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistResults;
