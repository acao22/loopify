import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

function GenerateSong() {
  const CLIENTID =
    "Eq8KSecb2Yz4Lq--EUjuGWH_8OifHCRwdwHr1ztKdLx5Qk_zCZG--AXPSQzMXhL-";
  const CLIENTSECRET =
    "-3Ynmxt9BZab3Qs5sbr_GdzGxXoGqSqbSISFuEQwquYeVm-5-A3nFIcgUOvDSY731GT-hhJtvTK5jYDccT7juQ";
  const accessToken =
    "?access_token=CXyFeSBw2lAdG41xkuU3LS6a_nwyxwwCz2dCkUohw-rw0C49x2HqP__6_4is5RPx";
  const APISong = "https://api.genius.com/songs/";
  const maxSong = 2471960;

  const [song, setSong] = useState(null);
  const [songID, setSongID] = useState(2471960);

  useEffect(() => {
    fetchSong(songID);
  }, [songID]);

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async function fetchSong(id) {
    try {
      const response = await fetch(`${APISong}${id}${accessToken}`);
      if (response.ok) {
        const data = await response.json();
        if (data.response.song) {
          setSong(data.response.song);
        } else {
          fetchNewRandomSong(); // Handle invalid songs
        }
      } else {
        fetchNewRandomSong(); // Handle invalid songs
      }
    } catch (error) {
      console.error("Error fetching song:", error);
    }
  }

  function fetchNewRandomSong() {
    const randomID = getRandomInt(1, maxSong);
    setSongID(randomID);
  }

  function tweetSong() {
    if (song) {
      const tweetUrl = `https://twitter.com/intent/tweet?hashtags=songs&text=Found a cool song today. "${song.title}" by ${song.primary_artist.name}`;
      window.open(tweetUrl, "_blank");
    }
  }

  return (
    <div className="bg-gradient-to-b-custom">
      <Navbar />
      <div className="flex flex-col md:flex-row items-start justify-center min-h-screen p-6">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-4">Genius</h1>
          <h2 className="text-xl font-semibold text-center mb-6">
            Random Song Generator
          </h2>

          {song && (
            <div className="flex flex-col items-center mb-6">
              <img
                src={song.song_art_image_url}
                alt="Album Art"
                className="w-48 h-48 rounded-lg shadow mb-4"
              />
              <p className="text-lg font-semibold mb-2">
                SONG:{" "}
                <a
                  href={song.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {song.title.toUpperCase()}
                </a>
              </p>
              <p className="text-lg font-semibold mb-2">
                ARTIST:{" "}
                <a
                  href={song.primary_artist.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {song.primary_artist.name.toUpperCase()}
                </a>
              </p>
              <p className="text-gray-700">RELEASE DATE: {song.release_date}</p>
            </div>
          )}

          <div className="flex justify-around">
            <button
              onClick={fetchNewRandomSong}
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
            >
              New Song
            </button>
            <button
              onClick={tweetSong}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
            >
              Tweet Song
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerateSong;
