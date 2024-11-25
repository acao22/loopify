import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { Sparkle, CaretLeft } from "phosphor-react";

function VotingInterface() {
  const { playlistName } = useParams(); // Get playlist name from URL
  const [playlist, setPlaylist] = useState(playlistName || "Default Playlist");
  const [songs, setSongs] = useState([]);
  const [votes, setVotes] = useState({});
  const [message, setMessage] = useState("");
  const [currentSongIndex, setCurrentSongIndex] = useState(0); // Track current song index
  const [accessToken, setAccessToken] = useState(""); // Spotify Access Token

  const location = useLocation();
  const navigate = useNavigate();
  const { workerId } = location.state || {}; // Get workerId from state

  useEffect(() => {
    fetchAccessToken(); // Fetch Spotify Access Token on component mount
  }, []);

  // Fetch Spotify Access Token
  const fetchAccessToken = async () => {
    try {
      const clientId = "e3066dec50c9433ca3edc5c4bf8eefb8";
      const clientSecret = "1b628186831d407f82a1a9fd7560930c";

      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        },
        body: "grant_type=client_credentials",
      });

      const data = await response.json();
      setAccessToken(data.access_token);
      fetchSongs(data.access_token, playlistName); // Fetch songs for the playlist
    } catch (error) {
      console.error("Error fetching Spotify access token:", error);
    }
  };

  // Fetch songs from Spotify API
  const fetchSongs = async (token, playlistName) => {
    try {
      // Mock song data based on playlist name
      const trackQueries = playlistName === "hitting the gym"
        ? [
            { title: "Blinding Lights", artist: "The Weeknd" },
            { title: "Uptown Funk", artist: "Mark Ronson" },
          ]
        : [
            { title: "Levitating", artist: "Dua Lipa" },
            { title: "Rolling in the Deep", artist: "Adele" },
          ];

      const songPromises = trackQueries.map(async (track) => {
        const response = await fetch(
          `https://api.spotify.com/v1/search?q=track:${encodeURIComponent(
            track.title
          )}%20artist:${encodeURIComponent(track.artist)}&type=track&limit=1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        const trackInfo = data.tracks.items[0];

        return {
          title: trackInfo?.name || track.title,
          artist: trackInfo?.artists[0]?.name || track.artist,
          imageUrl: trackInfo?.album?.images[0]?.url || "",
          previewUrl: trackInfo?.preview_url || "",
          spotifyId: trackInfo?.id || "", // Track ID for Spotify link
          duration: formatDuration(trackInfo?.duration_ms || 0),
        };
      });

      const fetchedSongs = await Promise.all(songPromises);
      setSongs(fetchedSongs);
    } catch (error) {
      console.error("Error fetching songs from Spotify:", error);
    }
  };

  // Format duration from milliseconds to mm:ss
  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleVote = async (song, vote) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [song]: vote,
    }));

    // Submit the vote immediately
    try {
      await fetch("http://localhost:5001/api/vote", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workerId,
          playlist,
          votes: [{ song, vote }],
        }),
      });
      setMessage("Vote submitted successfully!");
    } catch (error) {
      console.error("Error submitting vote:", error);
      setMessage("Error submitting vote");
    }

    // Move to the next song
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setMessage("All songs voted on!");
    }
  };

  const handleSkip = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setMessage("All songs skipped!");
    }
  };

  const handleBack = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    }
  };

  const currentSong = songs[currentSongIndex];

  return (
    <div className="bg-gradient-to-b-custom min-h-screen">
      <Navbar />

      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 cursor-pointer flex items-center space-x-2 text-white hover:text-gray-500"
      >
        <CaretLeft size={24} weight="bold" />
        <span className="font-medium">Back</span>
      </Link>

      <div className="flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold text-white mb-6">
          Help build our playlists
        </h1>
        <div className="bg-white rounded-3xl shadow-lg p-6 max-w-sm w-full">
          <h2 className="text-xl font-semibold text-center mb-2">{playlist}</h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Select yes if the song fits the playlist.
          </p>

          {currentSong && (
            <>
              {/* Album Art */}
              <img
                src={currentSong.imageUrl}
                alt={currentSong.title}
                className="w-full mx-auto mb-6"
              />
              {/* Song Title and Artist */}
              <div className="flex justify-between items-center mb-2">
                <p className="text-lg font-bold">{currentSong.title}</p>
                <p className="text-gray-600">{currentSong.artist}</p>
              </div>
              {/* Audio Controls */}
              {currentSong.previewUrl ? (
                <audio
                  controls
                  src={currentSong.previewUrl}
                  className="w-full mb-4"
                >
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <div className="mb-4 flex">
                  <p className="text-sm text-gray-500 mb-2">
                    Preview not available.
                  </p>
                  <a
                    href={`https://open.spotify.com/track/${currentSong.spotifyId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 underline hover:text-gray-700 mb-2 ml-1"
                  >
                    Listen on Spotify
                  </a>
                </div>
              )}
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={handleBack}
                  className={`w-12 h-12 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 ${
                    currentSongIndex === 0 && "opacity-50 pointer-events-none"
                  }`}
                >
                  &#8592;
                </button>
                <button
                  onClick={() => handleVote(currentSong.title, "y")}
                  className="bg-blue-500 text-white font-semibold py-2 px-8 rounded-3xl shadow-lg hover:bg-blue-600"
                >
                  Yes
                </button>
                <button
                  onClick={() => handleVote(currentSong.title, "n")}
                  className="bg-red-500 text-white font-semibold py-2 px-8 rounded-3xl shadow-lg hover:bg-red-600"
                >
                  No
                </button>
                <button
                  onClick={handleSkip}
                  className="px-8 py-2 rounded-3xl bg-gray-200 text-gray-600 hover:bg-gray-300"
                >
                  Skip
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default VotingInterface;
