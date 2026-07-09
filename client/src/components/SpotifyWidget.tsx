import React from 'react';
import { Music } from 'lucide-react';
export default function SpotifyWidget() {
  return (
    <div className="fixed bottom-8 right-8 z-40">
      {/* Spotify Widget Container */}
      <a
        href="https://open.spotify.com"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-block"
      >
        {/* Spinning vinyl record background */}
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-700 shadow-lg shadow-green-500/50 animate-spin hover:shadow-green-400/70 transition-shadow duration-300"
          style={{
            animationDuration: '8s',
            animation: 'spin 8s linear infinite'
          }}
        >
          {/* Inner circle */}
          <div className="absolute inset-2 rounded-full bg-black/80 flex items-center justify-center">
            {/* Spotify logo or music icon */}
            <Music className="w-8 h-8 text-green-400" />
          </div>
          {/* Outer ring glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-black/90 text-green-400 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Now Playing on Spotify
        </div>
      </a>
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
