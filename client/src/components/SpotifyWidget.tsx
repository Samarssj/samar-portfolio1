import React, { useState } from 'react';
import { Search, X, Play } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  spotifyUrl: string;
}

export default function SpotifyWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Your top songs with direct Spotify links
  const topSongs: Song[] = [
    { 
      id: '1', 
      title: 'Hotel Drive', 
      artist: 'Vice Monroe',
      spotifyUrl: 'https://open.spotify.com/track/5kkPSLxLpG7GoUXhxVNqvP'
    },
    { 
      id: '2', 
      title: 'Bonny x Slide', 
      artist: 'Unknown',
      spotifyUrl: 'https://open.spotify.com/search/Bonny%20x%20Slide'
    },
    { 
      id: '3', 
      title: 'Cigarette Stub', 
      artist: 'Asal',
      spotifyUrl: 'https://open.spotify.com/search/Cigarette%20Stub%20Asal'
    },
    { 
      id: '4', 
      title: 'Heathens', 
      artist: 'Twenty One Pilots',
      spotifyUrl: 'https://open.spotify.com/track/0DiWzAVjucZsgKjVXVNLAe'
    },
    { 
      id: '5', 
      title: 'I Want to Stay at Your House', 
      artist: 'Rose Walton',
      spotifyUrl: 'https://open.spotify.com/search/I%20Want%20to%20Stay%20at%20Your%20House%20Rose%20Walton'
    },
    { 
      id: '6', 
      title: 'Numb', 
      artist: 'Linkin Park',
      spotifyUrl: 'https://open.spotify.com/track/1D7My7JsrjlqJKf6DCeWEV'
    },
  ];

  const filteredSongs = topSongs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed bottom-8 right-8 z-40">
      {/* Spotify Widget Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative inline-block focus:outline-none"
        aria-label="Toggle Spotify player"
      >
        {/* Spinning vinyl record background */}
        <div 
          className="relative w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/50 hover:shadow-green-400/70 transition-all duration-300 flex items-center justify-center cursor-pointer"
          style={{
            animation: 'spin 8s linear infinite'
          }}
        >
          {/* Spotify Logo SVG */}
          <svg
            className="w-10 h-10 text-black"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-12.061-1.42-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.079 10.561 18.72 12.84c.361.21.599.659.3 1.099zm.179-3.424c-3.9-2.32-10.319-2.561-14.978-1.42-.6.179-1.2-.181-1.38-.764-.179-.595.182-1.2.764-1.38 5.12-1.271 12.359-.961 16.8 1.649.479.299.799.959.519 1.54-.299.599-.919.919-1.439.6z"/>
          </svg>

          {/* Outer ring glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-black/90 text-green-400 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          {isOpen ? 'Close Player' : 'My Music'}
        </div>
      </button>

      {/* Spotify Player Window */}
      {isOpen && (
        <div className="absolute bottom-24 right-0 w-96 bg-black/95 border border-green-500/30 rounded-lg shadow-2xl shadow-green-500/20 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-300 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-green-500/20">
            <div className="flex items-center gap-2">
              <svg
                className="w-6 h-6 text-green-400"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-12.061-1.42-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.079 10.561 18.72 12.84c.361.21.599.659.3 1.099zm.179-3.424c-3.9-2.32-10.319-2.561-14.978-1.42-.6.179-1.2-.181-1.38-.764-.179-.595.182-1.2.764-1.38 5.12-1.271 12.359-.961 16.8 1.649.479.299.799.959.519 1.54-.299.599-.919.919-1.439.6z"/>
              </svg>
              <h3 className="text-green-400 font-bold">My Top Tracks</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-green-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b border-green-500/20">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search songs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900/50 border border-green-500/30 rounded-lg pl-10 pr-4 py-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-green-400/50 transition-colors"
              />
            </div>
          </div>

          {/* Songs List */}
          <div className="p-4 max-h-96 overflow-y-auto space-y-3">
            {filteredSongs.length > 0 ? (
              filteredSongs.map((song) => (
                <a
                  key={song.id}
                  href={song.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-3 rounded-lg bg-gray-900/40 hover:bg-gray-900/70 transition-colors border border-gray-800/50 hover:border-green-500/30"
                >
                  {/* Play Icon */}
                  <div className="flex-shrink-0 w-10 h-10 rounded bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/40 transition-colors">
                    <Play className="w-5 h-5 text-green-400 ml-0.5" />
                  </div>

                  {/* Song Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{song.title}</p>
                    <p className="text-gray-400 text-xs truncate">{song.artist}</p>
                  </div>

                  {/* Spotify Icon */}
                  <svg className="flex-shrink-0 w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-12.061-1.42-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.079 10.561 18.72 12.84c.361.21.599.659.3 1.099zm.179-3.424c-3.9-2.32-10.319-2.561-14.978-1.42-.6.179-1.2-.181-1.38-.764-.179-.595.182-1.2.764-1.38 5.12-1.271 12.359-.961 16.8 1.649.479.299.799.959.519 1.54-.299.599-.919.919-1.439.6z"/>
                  </svg>
                </a>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">No songs found</p>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="p-4 border-t border-green-500/20 text-center text-xs text-gray-500">
            <p>Click any song to open on Spotify • Works with free accounts</p>
          </div>
        </div>
      )}

      {/* CSS Animation */}
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
