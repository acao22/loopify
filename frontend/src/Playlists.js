import React from "react";
import Navbar from "./components/Navbar";
import { Link } from 'react-router-dom';

const Playlists = () => {
  const playlists = [
    { title: "hitting the gym", bgColor: "bg-orange-500" },
    {
      title: "getting over a three week-long situationship",
      bgColor: "bg-blue-400",
    },
    { title: "walking 30 minutes to trader joe’s", bgColor: "bg-green-300" },
    { title: "locking in before 11:59 PM deadline", bgColor: "bg-teal-600" },
  ];

  return (
    <div className="bg-gradient-to-b-custom min-h-screen font-gabarito">
    {/* Navbar */}
    <Navbar />
    <div className="text-center p-8">
      <h1 className="text-5xl font-bold text-white mb-6">Playlists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playlists.map((playlist) => (
          <Link
            key={playlist.title}
            to={`/playlist/${encodeURIComponent(playlist.title)}`}
            className={`${playlist.bgColor} p-6 rounded-lg shadow-md text-white hover:opacity-90 transition`}
          >
            <h2 className="text-xl font-semibold">{playlist.title}</h2>
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Playlists;
