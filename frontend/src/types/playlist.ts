export interface Song {
    id: string;
    title: string;
    artist: string;
    album: string;
    duration: string;
    addedDate: string;
    coverUrl: string;
  }
  
  export interface Playlist {
    id: string;
    name: string;
    description: string;
    lastUpdated: string;
    duration: string;
    songCount: number;
    coverImages: string[];
  }