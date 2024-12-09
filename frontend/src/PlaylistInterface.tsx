import React from "react";
import { useParams } from "react-router-dom";
import { PlaylistHeader } from "./components/PlaylistHeader.tsx";
import { SongList } from "./components/SongList.tsx";
import { mockPlaylists } from "./data/mockData.ts";
import Navbar from "./components/Navbar.js";

function PlaylistInterface() {
  const { playlistName = "" } = useParams();

  // Find the playlist by name (case insensitive)
  const playlist = mockPlaylists.find(
    (p) =>
      p.id.toLowerCase() === decodeURIComponent(playlistName).toLowerCase() ||
      p.name.toLowerCase() === decodeURIComponent(playlistName).toLowerCase()
  );



  return (
    <div className="min-h-screen bg-gradient-to-b-custom">
      <Navbar />
      {playlist ? (
        <main>
          <PlaylistHeader playlist={playlist} />
          <SongList songs={playlist.songs} />
        </main>
      ) : (
        <div className="text-center text-white mt-20">
          <h1 className="text-3xl font-bold">Playlist Not Found</h1>
          <p className="text-gray-300">
            The playlist "{decodeURIComponent(playlistName)}" does not exist.
          </p>
        </div>
      )}
    </div>
  );
}

export default PlaylistInterface;
