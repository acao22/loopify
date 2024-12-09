import React from 'react';
import { Share2, Shuffle, Play } from 'lucide-react';
import type { Playlist } from '../types/playlist';

interface PlaylistHeaderProps {
  playlist: Playlist;
}

export function PlaylistHeader({ playlist }: PlaylistHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-start gap-8 p-20">
      <div className="w-48 h-48 shadow-xl">
        <div className="grid grid-cols-2 gap-1 w-full h-full">
          {playlist.coverImages.slice(0, 4).map((url, index) => (
            <img
              key={index}
              src={url}
              alt=""
              className="w-full h-full object-cover"
            />
          ))}
        </div>
      </div>

      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-2">{playlist.name}</h1>
        <p className="text-gray-600 mb-4">{playlist.description}</p>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Last updated: {playlist.lastUpdated}</span>
          <span>•</span>
          <span>{playlist.songCount} songs,</span>
          <span>{playlist.duration}</span>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <button className="bg-black text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-gray-800 transition">
            <Play size={20} fill="white" />
            Play
          </button>
          <button className="p-3 rounded-full hover:bg-black/5 transition">
            <Shuffle size={20} />
          </button>
          <button className="p-3 rounded-full hover:bg-black/5 transition">
            <Share2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
