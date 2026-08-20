import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function OmnitrixEmblem() {
  const [flashActive, setFlashActive] = useState(false);
  const [flashKey, setFlashKey] = useState(0);
  const [redActive, setRedActive] = useState(false);
  const controlRef = useRef<HTMLButtonElement>(null);
  const redTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    controlRef.current?.removeAttribute('title');
  }, []);

  useEffect(() => {
    return () => {
      if (redTimeoutRef.current !== null) {
        window.clearTimeout(redTimeoutRef.current);
      }
    };
  }, []);

  const activateFlash = () => {
    setFlashKey((key) => key + 1);
    setFlashActive(true);
    setRedActive(true);

    if (redTimeoutRef.current !== null) {
      window.clearTimeout(redTimeoutRef.current);
    }

    redTimeoutRef.current = window.setTimeout(() => {
      setRedActive(false);
      redTimeoutRef.current = null;
    }, 10_000);
  };

  return (
    <>
      <button
        ref={controlRef}
        type="button"
        onPointerEnter={(event) => event.currentTarget.removeAttribute('title')}
        onFocus={(event) => event.currentTarget.removeAttribute('title')}
        onClick={activateFlash}
        data-red-state={redActive}
        className="omnitrix-shell group relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <style>{`
          @keyframes omnitrix-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes omnitrix-transformation-flash {
            0% { opacity: 0; }
            10% { opacity: 1; }
            30% { opacity: 0.65; }
            100% { opacity: 0; }
          }

          @keyframes omnitrix-expanding-ring {
            0% { transform: scale(0.12); opacity: 0.95; }
            100% { transform: scale(2.6); opacity: 0; }
          }

          .omnitrix-rotor {
            animation: omnitrix-spin 18s linear infinite;
            transform-origin: center;
            will-change: transform;
          }

          .omnitrix-glow,
          .omnitrix-core {
            transition: filter 240ms cubic-bezier(0.23, 1, 0.32, 1), fill 240ms cubic-bezier(0.23, 1, 0.32, 1), stroke 240ms cubic-bezier(0.23, 1, 0.32, 1);
          }


          .omnitrix-shell:hover .omnitrix-glow,
          .omnitrix-shell:focus-visible .omnitrix-glow {
            filter: drop-shadow(0 0 3px rgba(190, 242, 100, 0.98)) drop-shadow(0 0 7px rgba(132, 204, 22, 0.82));
            stroke: #d9f99d;
          }

          .omnitrix-shell:hover .omnitrix-core,
          .omnitrix-shell:focus-visible .omnitrix-core {
            fill: #bef264;
            filter: drop-shadow(0 0 4px rgba(190, 242, 100, 0.98));
          }

          .omnitrix-shell[data-red-state="true"] .omnitrix-core {
            fill: #ef4444;
            filter: drop-shadow(0 0 4px rgba(239, 68, 68, 0.98));
          }

          .omnitrix-shell[data-red-state="true"] .omnitrix-glow {
            filter: drop-shadow(0 0 3px rgba(248, 113, 113, 0.98)) drop-shadow(0 0 7px rgba(220, 38, 38, 0.82));
            stroke: #fecaca;
          }

          .omnitrix-shell:active .omnitrix-rotor {
            animation-duration: 0.8s;
          }

          .omnitrix-screen-flash {
            position: fixed;
            inset: 0;
            z-index: 100;
            pointer-events: none;
            overflow: hidden;
            background-color: rgba(5, 150, 105, 0.84);
            background-image: radial-gradient(circle at 4% 4%, rgba(236, 252, 203, 0.98) 0%, rgba(190, 242, 100, 0.78) 15%, rgba(16, 185, 129, 0.42) 46%, transparent 76%);
            animation: omnitrix-transformation-flash 850ms cubic-bezier(0.18, 0.8, 0.28, 1) forwards;
            will-change: opacity;
          }

          .omnitrix-screen-flash::after {
            content: '';
            position: absolute;
            top: 3.5rem;
            left: 3.5rem;
            width: min(62vmax, 920px);
            aspect-ratio: 1;
            border-radius: 999px;
            border: 2px solid rgba(217, 249, 157, 0.9);
            box-shadow: 0 0 24px rgba(163, 230, 53, 0.85), inset 0 0 22px rgba(163, 230, 53, 0.42);
            animation: omnitrix-expanding-ring 760ms cubic-bezier(0.12, 0.75, 0.25, 1) forwards;
            transform-origin: center;
            will-change: transform, opacity;
          }

          @media (prefers-reduced-motion: reduce) {
            .omnitrix-rotor { animation: none; }
            .omnitrix-screen-flash { animation-duration: 180ms; }
            .omnitrix-screen-flash::after { display: none; }
          }
        `}</style>

        <svg viewBox="0 0 100 100" className="omnitrix-rotor h-full w-full" aria-hidden="true">
          {/* Metallic outer case */}
          <circle cx="50" cy="50" r="41" fill="#5c6466" stroke="#090b0c" strokeWidth="5" />
          <circle cx="50" cy="50" r="35" fill="#111a1e" stroke="#06090a" strokeWidth="4" />
          <circle cx="50" cy="50" r="29" fill="#666d6c" stroke="#06090a" strokeWidth="4" />
          <circle cx="50" cy="50" r="24" fill="#080b0b" stroke="#0f1615" strokeWidth="2" />

          {/* Hourglass core: green normally, red for ten seconds after each click */}
          <path d="M29 27 H71 L57 50 L71 73 H29 L43 50 Z" fill="#9bea00" stroke="#050807" strokeWidth="2.5" className="omnitrix-core" />
          <path d="M29 31 L43 50 L29 69 Z" fill="#050807" />
          <path d="M71 31 L57 50 L71 69 Z" fill="#050807" />
          <circle cx="50" cy="50" r="3.2" fill="#080b0b" stroke="#b8f24a" strokeWidth="1" className="omnitrix-glow" />

          {/* Four glowing case nodes */}
          <g className="omnitrix-glow" stroke="#050807" strokeWidth="2.5">
            <circle cx="50" cy="7" r="8" fill="#1a1f20" />
            <circle cx="50" cy="7" r="4.5" fill="#9bea00" />
            <circle cx="93" cy="50" r="8" fill="#1a1f20" />
            <circle cx="93" cy="50" r="4.5" fill="#9bea00" />
            <circle cx="50" cy="93" r="8" fill="#1a1f20" />
            <circle cx="50" cy="93" r="4.5" fill="#9bea00" />
            <circle cx="7" cy="50" r="8" fill="#1a1f20" />
            <circle cx="7" cy="50" r="4.5" fill="#9bea00" />
          </g>
        </svg>
        <span className="sr-only">Activate transformation flash</span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-[calc(100%+0.6rem)] z-[110] translate-y-1 whitespace-nowrap font-mono text-[9px] font-semibold leading-none tracking-[0.08em] text-emerald-300 opacity-0 drop-shadow-[0_0_6px_rgba(16,185,129,0.7)] transition-[opacity,transform] duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] will-change-[opacity,transform] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none"
        >
          Activate transformation flash
        </span>
      </button>

      {flashActive && createPortal(
        <div key={flashKey} className="omnitrix-screen-flash" aria-hidden="true" onAnimationEnd={() => setFlashActive(false)} />,
        document.body,
      )}
    </>
  );
}
