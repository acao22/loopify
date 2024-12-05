import React from 'react';
import { Clock } from 'lucide-react';
import type { Song } from '../types/playlist';

interface SongListProps {
  songs: Song[];
}

export function SongList({ songs }: SongListProps) {
  return (
    <div className="px-20">
      <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-2 border-b text-sm text-gray-500">
        <span>#</span>
        <span>TITLE</span>
        <span>ALBUM</span>
        <Clock size={16} />
      </div>
      
      <div className="divide-y">
        {songs.map((song, index) => (
          <div
            key={song.id}
            className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-3 hover:bg-black/5 transition items-center"
          >
            <span className="text-gray-400">{index + 1}</span>
            <div className="flex items-center gap-3">
              <img
                src={song.coverUrl}
                alt=""
                className="w-10 h-10 object-cover"
              />
              <div>
                <div className="font-medium">{song.title}</div>
                <div className="text-sm text-gray-500">{song.artist}</div>
              </div>
            </div>
            <span className="text-gray-500">{song.album}</span>
            <span className="text-gray-500">{song.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
}