import { motion } from 'framer-motion';

export default function HUDBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Main Container - Centered in Viewport */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] opacity-[0.8]">
        <svg viewBox="0 0 1000 1000" className="w-full h-full" style={{ filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))' }}>
          {/* Outer Ring 1 */}
          <motion.circle
            cx="500"
            cy="500"
            r="480"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeDasharray="5 15"
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          />

          {/* Outer Ring 2 - Triple Line */}
          <motion.g
            animate={{ rotate: -360 }}
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
            style={{ originX: "500px", originY: "500px" }}
          >
            <circle cx="500" cy="500" r="460" fill="none" stroke="#10b981" strokeWidth="1.5" opacity="0.7" />
            <circle cx="500" cy="500" r="462" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.3" />
            <circle cx="500" cy="500" r="458" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.3" />
          </motion.g>

          {/* Large Compass Ticks */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
            style={{ originX: "500px", originY: "500px" }}
          >
            {[...Array(72)].map((_, i) => (
              <line
                key={i}
                x1="500"
                y1="20"
                x2="500"
                y2={i % 6 === 0 ? "50" : "35"}
                stroke="#10b981"
                strokeWidth={i % 6 === 0 ? "2" : "0.5"}
                transform={`rotate(${i * 5}, 500, 500)`}
                opacity={i % 6 === 0 ? 0.6 : 0.2}
              />
            ))}
          </motion.g>

          {/* Scanning Sweep */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ originX: "500px", originY: "500px" }}
          >
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
            <line x1="500" y1="500" x2="500" y2="20" stroke="#10b981" strokeWidth="1" opacity="0.5" />
          </motion.g>

          {/* Inner Complex Geometry */}
          <motion.g
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ originX: "500px", originY: "500px" }}
          >
            <circle cx="500" cy="500" r="300" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="100 200" opacity="0.8" />
            <circle cx="500" cy="500" r="280" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="1 10" opacity="0.6" />
          </motion.g>

          {/* Mid-range HUD Elements */}
          {[...Array(4)].map((_, i) => (
            <motion.g
              key={i}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 30 + i * 10, repeat: Infinity, ease: "linear" }}
              style={{ originX: "500px", originY: "500px" }}
            >
              <rect
                x={495}
                y={200 + i * 40}
                width="10"
                height="2"
                fill="#10b981"
                opacity="0.5"
              />
              <circle
                cx={500}
                cy={200 + i * 40}
                r="2"
                fill="#10b981"
                opacity="0.8"
              />
            </motion.g>
          ))}

          {/* Central Core (No Text) */}
          <g className="core">
            <motion.circle
              cx="500"
              cy="500"
              r="100"
              fill="none"
              stroke="#10b981"
              strokeWidth="1"
              strokeDasharray="10 5"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.circle
              cx="500"
              cy="500"
              r="80"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="40 10"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <circle cx="500" cy="500" r="40" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0.2" />
            <motion.circle
              cx="500"
              cy="500"
              r="5"
              fill="#10b981"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </g>

          {/* Orbiting Data Points */}
          {[...Array(8)].map((_, i) => (
            <motion.g
              key={i}
              animate={{ rotate: 360 }}
              transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
              style={{ originX: "500px", originY: "500px" }}
            >
              <circle
                cx="500"
                cy={150 + i * 20}
                r="1.5"
                fill="#10b981"
                opacity="0.6"
              />
              <line
                x1="500"
                y1={150 + i * 20}
                x2="520"
                y2={150 + i * 20}
                stroke="#10b981"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </motion.g>
          ))}
        </svg>
      </div>

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Dynamic Glow Points */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full blur-[1px]"
            animate={{
              x: ['0vw', '100vw'],
              y: [Math.random() * 100 + 'vh', Math.random() * 100 + 'vh'],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              delay: Math.random() * 10
            }}
          />
        ))}
      </div>

      {/* Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,15,0.9)_100%)]" />
    </div>
  );
}
