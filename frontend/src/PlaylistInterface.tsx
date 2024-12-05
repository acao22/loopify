import React from "react";
import { PlaylistHeader } from "./components/PlaylistHeader.tsx";
import { SongList } from "./components/SongList.tsx";
import { playlistData, songsData } from "./data/mockData.ts";
import Navbar from "./components/Navbar.js";

function PlaylistInterface() {
  return (
    <div className="min-h-screen bg-gradient-to-b-custom">
      <Navbar />
      <main>
        <PlaylistHeader playlist={playlistData} />
        <SongList songs={songsData} />
      </main>
    </div>
  );
}

export default PlaylistInterface;
