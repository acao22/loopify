import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Sparkle, CaretLeft } from "phosphor-react";
import Footer from "./Footer";

function VotingInterface() {
  const navigate = useNavigate();
  const { playlistName } = useParams();
  const [playlist, setPlaylist] = useState(playlistName || "Default Playlist");
  const [songs, setSongs] = useState([]);
  const [votes, setVotes] = useState([]); // Votes array
  const [message, setMessage] = useState("");
  const [currentSongIndex, setCurrentSongIndex] = useState(0); // Track current song index
  const [accessToken, setAccessToken] = useState(""); // Spotify Access Token
  const [workerId, setWorkerId] = useState(""); // Worker ID

  useEffect(() => {
    generateWorkerId();
    fetchAccessToken(); // Fetch Spotify Access Token on component mount
  }, []);

  // Generate a unique Worker ID
  const generateWorkerId = () => {
    const id = `worker_${Math.random().toString(36).substr(2, 9)}`;
    setWorkerId(id);
  };

  // Fetch Spotify Access Token
  const fetchAccessToken = async () => {
    try {
      const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
      const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

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
      fetchSongs(data.access_token); // Fetch song previews after receiving token
    } catch (error) {
      console.error("Error fetching Spotify access token:", error);
    }
  };

  // Fetch songs from Spotify API
  const fetchSongs = async (token) => {
    try {
      const trackQueries = [
        { title: "Blinding Lights", artist: "The Weeknd" },
        { title: "Levitating", artist: "Dua Lipa" },
        { title: "Uptown Funk", artist: "Mark Ronson" },
        { title: "Rolling in the Deep", artist: "Adele" },
        { title: "Take Me to Church", artist: "Hozier" },
        { title: "Watermelon Sugar", artist: "Harry Styles" },
        { title: "Dance Monkey", artist: "Tones and I" },
        { title: "Bad Guy", artist: "Billie Eilish" },
        { title: "Señorita", artist: "Shawn Mendes" },
        { title: "Perfect", artist: "Ed Sheeran" },
        { title: "Stay", artist: "The Kid LAROI" },
        { title: "Closer", artist: "The Chainsmokers" },
        { title: "Someone Like You", artist: "Adele" },
        { title: "Save Your Tears", artist: "The Weeknd" },
        { title: "Shallow", artist: "Lady Gaga" },
        { title: "Peaches", artist: "Justin Bieber" },
        { title: "Montero (Call Me By Your Name)", artist: "Lil Nas X" },
        { title: "Old Town Road", artist: "Lil Nas X" },
        { title: "Happier Than Ever", artist: "Billie Eilish" },
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

  const handleVote = (song, vote) => {
    // Add current vote to votes array
    setVotes((prevVotes) => [...prevVotes, { song, vote }]);

    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      handleFinish(); // Submit all votes at the end
    }
  };

  const handleFinish = () => {
    submitVotes();
    navigate("/thank-you");
  };

  const submitVotes = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/vote", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workerId,
          playlist,
          votes,
        }),
      });

      if (response.ok) {
        setMessage("All votes submitted successfully!");
      } else {
        const result = await response.json();
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting votes:", error);
      setMessage("Error submitting votes");
    }
  };

  const handleSkip = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      handleFinish();
      setMessage("All songs completed!");
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
      <Link
        to="/"
        className="fixed top-30 left-12 py-6 cursor-pointer flex items-center space-x-2 text-white hover:text-gray-500"
      >
        <CaretLeft size={24} weight="bold" />
        <span className="font-medium">Back</span>
      </Link>
      {/* Generate Song Button */}
      <div className="fixed bottom-8 right-8">
        <Link to="/generatesong">
          <button className="bg-white text-black font-semibold py-2 px-4 rounded-3xl shadow-lg hover:bg-green-600 flex items-center space-x-2 ease-in-out">
            <Sparkle size={20} weight="fill" className="text-black" />
            <span>Use AI to Generate Song</span>
          </button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-start p-6 min-h-[calc(100vh+50px)]">
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
                  onClick={() => handleVote(currentSong.title, "yes")}
                  className="bg-blue-500 text-white font-semibold py-2 px-8 rounded-3xl shadow-lg hover:bg-blue-600"
                >
                  Yes
                </button>
                <button
                  onClick={() => handleVote(currentSong.title, "no")}
                  className="bg-red-500 text-white font-semibold py-2 px-8 rounded-3xl shadow-lg hover:bg-red-600"
                >
                  No
                </button>
                <button
                  onClick={
                    currentSongIndex < songs.length - 1
                      ? handleSkip
                      : handleFinish
                  }
                  className={`px-8 py-2 rounded-3xl bg-gray-200 text-gray-600 hover:bg-gray-300`}
                >
                  Skip
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VotingInterface;
