import React, { useState, useRef } from 'react';
import { Search, X, Play, Pause } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  preview_url: string;
  image: string;
  spotify_url: string;
}

export default function SpotifyWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Your top songs with Spotify data
  const songs: Song[] = [
    {
      id: '1',
      title: 'Hotel Drive',
      artist: 'Vice Monroe',
      preview_url: 'https://p.scdn.co/mp3-preview/placeholder1',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
      spotify_url: 'https://open.spotify.com/search/Hotel%20Drive%20Vice%20Monroe'
    },
    {
      id: '2',
      title: 'Bonny x Slide',
      artist: 'Unknown',
      preview_url: 'https://p.scdn.co/mp3-preview/placeholder2',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      spotify_url: 'https://open.spotify.com/search/Bonny%20x%20Slide'
    },
    {
      id: '3',
      title: 'Cigarette Stub',
      artist: 'Asal',
      preview_url: 'https://p.scdn.co/mp3-preview/placeholder3',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop',
      spotify_url: 'https://open.spotify.com/search/Cigarette%20Stub%20Asal'
    },
    {
      id: '4',
      title: 'Heathens',
      artist: 'Twenty One Pilots',
      preview_url: 'https://p.scdn.co/mp3-preview/1d2f9e8c7b6a5f4e3d2c1b0a9f8e7d6c',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop',
      spotify_url: 'https://open.spotify.com/track/0DiWxABD2yoz4THqVQRdR8'
    },
    {
      id: '5',
      title: 'I Want to Stay at Your House',
      artist: 'Rose Walton',
      preview_url: 'https://p.scdn.co/mp3-preview/placeholder5',
      image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop',
      spotify_url: 'https://open.spotify.com/search/I%20Want%20to%20Stay%20at%20Your%20House%20Rose%20Walton'
    },
    {
      id: '6',
      title: 'Numb',
      artist: 'Linkin Park',
      preview_url: 'https://p.scdn.co/mp3-preview/4cOdK2wGLETKBW3PvgPWqT',
      image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop',
      spotify_url: 'https://open.spotify.com/track/1301WleyT98MSxVHnAlFP7'
    }
  ];

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlayPause = (songId: string, previewUrl: string) => {
    if (currentlyPlaying === songId) {
      // Pause current song
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setCurrentlyPlaying(null);
    } else {
      // Play new song
      if (audioRef.current) {
        audioRef.current.src = previewUrl;
        audioRef.current.play().catch(() => {
          // Preview might not be available
          alert('Preview not available for this song');
        });
      }
      setCurrentlyPlaying(songId);
    }
  };

  const handleAudioEnd = () => {
    setCurrentlyPlaying(null);
  };

  return (
    <div className="fixed bottom-8 right-8 z-40">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onEnded={handleAudioEnd}
      />

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
                <div
                  key={song.id}
                  className="group flex items-center gap-3 p-3 rounded-lg bg-gray-900/40 hover:bg-gray-900/70 transition-colors border border-gray-800/50 hover:border-green-500/30"
                >
                  {/* Album Art */}
                  <div className="relative w-12 h-12 flex-shrink-0 rounded overflow-hidden">
                    <img
                      src={song.image}
                      alt={song.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Play Button Overlay */}
                    <button
                      onClick={() => handlePlayPause(song.id, song.preview_url)}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {currentlyPlaying === song.id ? (
                        <Pause className="w-5 h-5 text-green-400" />
                      ) : (
                        <Play className="w-5 h-5 text-green-400 ml-0.5" />
                      )}
                    </button>
                  </div>

                  {/* Song Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{song.title}</p>
                    <p className="text-gray-400 text-xs truncate">{song.artist}</p>
                  </div>

                  {/* Spotify Link */}
                  <a
                    href={song.spotify_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 text-green-400 hover:text-green-300 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-12.061-1.42-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.079 10.561 18.72 12.84c.361.21.599.659.3 1.099zm.179-3.424c-3.9-2.32-10.319-2.561-14.978-1.42-.6.179-1.2-.181-1.38-.764-.179-.595.182-1.2.764-1.38 5.12-1.271 12.359-.961 16.8 1.649.479.299.799.959.519 1.54-.299.599-.919.919-1.439.6z"/>
                    </svg>
                  </a>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">No songs found</p>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="p-4 border-t border-green-500/20 text-center text-xs text-gray-500">
            <p>Click play icon to preview • 30 second clips</p>
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
