export default function HUDBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <style>{`
        @keyframes hud-rotate-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes hud-rotate-ccw {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes hud-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes hud-scan {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-hud-cw { animation: hud-rotate-cw 120s linear infinite; }
        .animate-hud-cw-fast { animation: hud-rotate-cw 60s linear infinite; }
        .animate-hud-ccw { animation: hud-rotate-ccw 180s linear infinite; }
        .animate-hud-ccw-fast { animation: hud-rotate-ccw 40s linear infinite; }
        .animate-hud-pulse { animation: hud-pulse 4s ease-in-out infinite; }
        .animate-hud-scan { animation: hud-scan 10s linear infinite; transform-origin: center; }
        
        .hud-layer { will-change: transform; transform-origin: center; }
      `}</style>

      {/* Main Container - Centered in Viewport */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] opacity-[1.0]">
        <svg viewBox="0 0 1000 1000" className="w-full h-full" style={{ filter: 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.5))' }}>
          {/* Outer Ring 1 - Dashed */}
          <circle
            cx="500"
            cy="500"
            r="480"
            fill="none"
            stroke="#10b981"
            strokeWidth="6"
            strokeDasharray="10 30"
            className="hud-layer animate-hud-cw"
          />

          {/* Outer Ring 2 - Solid Thin */}
          <g className="hud-layer animate-hud-ccw">
            <circle cx="500" cy="500" r="465" fill="none" stroke="#10b981" strokeWidth="3" opacity="0.8" />
            <circle cx="500" cy="500" r="462" fill="none" stroke="#10b981" strokeWidth="1.5" opacity="0.5" />
          </g>

          {/* Compass Ticks - Static (Rotated by Group) */}
          <g className="hud-layer animate-hud-cw-fast">
            {[...Array(60)].map((_, i) => (
              <line
                key={i}
                x1="500"
                y1="20"
                x2="500"
                y2={i % 5 === 0 ? "60" : "40"}
                stroke="#10b981"
                strokeWidth={i % 5 === 0 ? "4" : "1.5"}
                transform={`rotate(${i * 6}, 500, 500)`}
                opacity={i % 5 === 0 ? 1.0 : 0.6}
              />
            ))}
          </g>

          {/* Scanning Sweep - High Performance CSS */}
          <g className="hud-layer animate-hud-scan">
            <defs>
              <linearGradient id="scanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path
              d="M 500 500 L 500 20 A 480 480 0 0 1 850 200 Z"
              fill="url(#scanGradient)"
            />
            <line x1="500" y1="500" x2="500" y2="20" stroke="#10b981" strokeWidth="1.5" opacity="0.6" />
          </g>

          {/* Inner Complex Geometry */}
          <g className="hud-layer animate-hud-ccw-fast">
            <circle cx="500" cy="500" r="300" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="80 120" opacity="0.9" />
            <circle cx="500" cy="500" r="280" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="2 10" opacity="0.7" />
          </g>

          {/* Central Core */}
          <g className="hud-layer animate-hud-pulse">
            <circle cx="500" cy="500" r="100" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="15 5" opacity="0.4" />
            <circle cx="500" cy="500" r="85" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="30 10" opacity="0.6" />
            <circle cx="500" cy="500" r="5" fill="#10b981" />
          </g>

          {/* Orbiting Points - Minimal elements */}
          <g className="hud-layer animate-hud-cw">
            <circle cx="500" cy="150" r="3" fill="#10b981" opacity="0.8" />
            <circle cx="500" cy="850" r="3" fill="#10b981" opacity="0.8" />
            <circle cx="150" cy="500" r="3" fill="#10b981" opacity="0.8" />
            <circle cx="850" cy="500" r="3" fill="#10b981" opacity="0.8" />
          </g>
        </svg>
      </div>

      {/* Static Grid Overlay - Optimized */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,15,0.9)_100%)]" />
    </div>
  );
}
