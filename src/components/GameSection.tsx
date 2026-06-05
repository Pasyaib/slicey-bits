import { useState } from "react";
import { ArrowUpRight, X, Gamepad2, Zap, Code2, Layers } from "lucide-react";
import SectionHeader from "./SectionHeader";

const controls = [
  { keys: ["A", "D"], label: "Move" },
  { keys: ["W", "SPACE"], label: "Jump" },
  { keys: ["J", "K", "L"], label: "Attack" },
  { keys: ["S"], label: "Block" },
];

const tags = [
  { icon: <Code2 className="w-3 h-3" />, label: "Vanilla JS" },
  { icon: <Layers className="w-3 h-3" />, label: "Canvas API" },
  { icon: <Zap className="w-3 h-3" />, label: "Pixel Art" },
  { icon: <Gamepad2 className="w-3 h-3" />, label: "Beat‑em‑up" },
];

const GAME_URL = "https://shinobi-mbg-shipudden.vercel.app/";

const GameSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ── Section ───────────────────────────────────────────── */}
      <section className="container-portfolio section-spacing border-t border-foreground/10">
        <SectionHeader title="Featured Game" number="05" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mt-8">

          {/* ── Left: metadata column ─────────────────────────── */}
          <div className="md:col-span-4 flex flex-col gap-8">
            {/* Category label */}
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-foreground font-bold block mb-1">TYPE /</span>
              BROWSER GAME<br />
              INTERACTIVE EXPERIENCE
            </div>

            {/* Tech tags */}
            <div>
              <span className="font-mono text-xs text-foreground font-bold block mb-3">TECH /</span>
              <div className="flex flex-wrap gap-2">
                {tags.map(({ icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest border border-foreground/20 px-2.5 py-1.5 text-muted-foreground"
                  >
                    {icon}
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div>
              <span className="font-mono text-xs text-foreground font-bold block mb-3">CONTROLS /</span>
              <div className="flex flex-col divide-y divide-foreground/10 border-t border-foreground/10">
                {controls.map(({ keys, label }) => (
                  <div key={label} className="flex items-center justify-between py-2.5 font-mono text-xs text-muted-foreground">
                    <div className="flex gap-1.5">
                      {keys.map((k) => (
                        <span
                          key={k}
                          className="inline-flex items-center justify-center bg-foreground text-background px-2 py-0.5 text-[10px] font-bold min-w-[28px]"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                    <span className="uppercase tracking-widest">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: game card ──────────────────────────────── */}
          <div className="md:col-span-8 flex flex-col gap-6">
            {/* Title */}
            <div>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight uppercase leading-none mb-3">
                Shinobi Kota<br />
                <span className="text-muted-foreground text-2xl md:text-3xl font-normal tracking-wide">MBG Shipudden</span>
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
                A fast‑paced browser beat‑em‑up built from scratch using the HTML5 Canvas API and Vanilla JavaScript. 
                Fight through waves of enemies across 3 rounds with fluid combat mechanics and pixel-art aesthetics.
              </p>
            </div>

            {/* Playable preview card */}
            <div
              onClick={() => setIsOpen(true)}
              className="relative w-full aspect-video bg-black border border-foreground/20 cursor-pointer group overflow-hidden"
            >
              {/* Iframe preview (non-interactive) */}
              <iframe
                src={GAME_URL}
                className="w-full h-full pointer-events-none scale-[1.01]"
                title="Shinobi Kota Preview"
                tabIndex={-1}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 border-2 border-white flex items-center justify-center">
                  <Gamepad2 className="w-7 h-7 text-white" />
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-white">CLICK TO PLAY</span>
              </div>

              {/* Corner badge */}
              <div className="absolute top-3 right-3 font-mono text-[9px] uppercase tracking-widest bg-foreground text-background px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                LIVE
              </div>
            </div>

            {/* CTA row */}
            <div className="flex items-center gap-6 border-t border-foreground/10 pt-5">
              <button
                onClick={() => setIsOpen(true)}
                className="btn-outline-portfolio text-sm"
              >
                Play In Portfolio
                <Gamepad2 className="w-4 h-4" />
              </button>
              <a
                href={GAME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors group"
              >
                Open Full Screen
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Fullscreen Modal ─────────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9998] bg-black/95 flex flex-col"
          style={{ animation: "fadeIn 0.25s ease-out" }}
        >
          <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          `}</style>

          {/* Modal top bar */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3 font-mono text-xs text-white/50 uppercase tracking-widest">
              <Gamepad2 className="w-4 h-4 text-white/70" />
              <span>SHINOBI KOTA — MBG SHIPUDDEN</span>
              <span className="text-white/20">|</span>
              <span className="text-emerald-400 animate-pulse">● LIVE</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={GAME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-1.5"
              >
                Open Tab <ArrowUpRight className="w-3 h-3" />
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Iframe fullscreen */}
          <iframe
            src={GAME_URL}
            className="flex-1 w-full border-none"
            title="Shinobi Kota — Play"
            allow="autoplay"
          />
        </div>
      )}
    </>
  );
};

export default GameSection;
