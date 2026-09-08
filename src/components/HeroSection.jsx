import React from "react";
import { Compass } from "lucide-react";

export const HeroSection = ({ onExplore, onViewMap }) => (
  <section className="relative min-h-[720px] overflow-hidden bg-slate-900">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=2200&q=85')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-950/40" />
    </div>

    <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-12">
      <div className="max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3.5 py-1.5 text-xs font-semibold text-emerald-300">
          <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
          REAL-TIME CROWD INTELLIGENCE
        </div>

        <h1 className="font-display text-5xl font-bold text-white lg:text-7xl">
          Travel Smart, <br />
          <span className="text-emerald-400">Not Crowded.</span>
        </h1>

        <p className="max-w-2xl text-lg leading-8 text-slate-200">
          Travel Smart. Experience More. Avoid the Crowd. Check crowd levels,
          discover hidden destinations, and enjoy better travel experiences.
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <button
            onClick={onExplore}
            className="rounded-lg bg-[#1b6d24] px-6 py-3.5 font-semibold text-white shadow-lg transition hover:bg-[#155a1d]"
          >
            Explore Destinations
          </button>
          <button
            onClick={onViewMap}
            className="rounded-lg border border-white/30 bg-white/15 px-6 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:bg-white/25"
          >
            View Live Map
          </button>
        </div>

        <div className="flex items-center gap-2 pt-6 text-sm text-white/75">
          <Compass size={18} className="text-emerald-300" />
          Live intelligence for smarter, calmer journeys
        </div>
      </div>
    </div>
  </section>
);