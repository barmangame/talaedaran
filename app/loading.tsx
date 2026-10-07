export default function Loading() {
  return (
    <main
      dir="rtl"
      className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-white"
    >
      {/* Soft water glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="water-glow absolute right-[20%] top-[20%] h-64 w-64 rounded-full bg-cyan-100/40 blur-3xl" />

        <div className="water-glow-delayed absolute bottom-[15%] left-[15%] h-56 w-56 rounded-full bg-sky-100/30 blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Ripple */}
        <div className="relative flex h-32 w-32 items-center justify-center">
          <div className="ripple absolute inset-0 rounded-full border border-cyan-200" />

          <div className="ripple-delay absolute inset-3 rounded-full border border-cyan-300/70" />

          <div className="ripple-delay-2 absolute inset-7 rounded-full border border-cyan-400/60" />

          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500 text-lg font-black text-white shadow-[0_12px_40px_rgba(6,182,212,0.25)]">
            W
          </div>
        </div>

        {/* Brand */}
        <div className="mt-7 text-xl font-black tracking-[-0.06em]">
          WATER<span className="text-cyan-500">.</span>
        </div>

        <div className="mt-2 text-[9px] font-black tracking-[0.3em] text-slate-300">
          WATER POLO
        </div>

        {/* Loading line */}
        <div className="mt-7 h-px w-24 overflow-hidden bg-slate-100">
          <div className="loading-line h-full w-1/2 bg-cyan-500" />
        </div>
      </div>

      <style>{`
        @keyframes ripple {
          0% {
            transform: scale(0.72);
            opacity: 0.15;
          }

          50% {
            opacity: 0.8;
          }

          100% {
            transform: scale(1.08);
            opacity: 0;
          }
        }

        @keyframes rippleDelay {
          0% {
            transform: scale(0.72);
            opacity: 0;
          }

          25% {
            opacity: 0.65;
          }

          100% {
            transform: scale(1.08);
            opacity: 0;
          }
        }

        @keyframes loadingLine {
          0% {
            transform: translateX(220%);
          }

          100% {
            transform: translateX(-220%);
          }
        }

        @keyframes glow {
          0%,
          100% {
            transform: scale(0.95);
            opacity: 0.35;
          }

          50% {
            transform: scale(1.08);
            opacity: 0.65;
          }
        }

        .ripple {
          animation: ripple 2.2s ease-out infinite;
        }

        .ripple-delay {
          animation: rippleDelay 2.2s ease-out infinite 0.55s;
        }

        .ripple-delay-2 {
          animation: rippleDelay 2.2s ease-out infinite 1.1s;
        }

        .loading-line {
          animation: loadingLine 1.2s ease-in-out infinite;
        }

        .water-glow {
          animation: glow 4s ease-in-out infinite;
        }

        .water-glow-delayed {
          animation: glow 4s ease-in-out infinite 1.5s;
        }

        @media (prefers-reduced-motion: reduce) {
          .ripple,
          .ripple-delay,
          .ripple-delay-2,
          .loading-line,
          .water-glow,
          .water-glow-delayed {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}
