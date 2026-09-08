import React from "react";
import { MapPin, Navigation } from "lucide-react";

export const OffbeatDestinations = ({ destinations, onViewMap, onNavigate }) => (
  <section id="destinations" className="border-t border-slate-200 bg-white py-16">
    <div className="mx-auto max-w-7xl px-4">
      <div className="mb-12 max-w-3xl">
        <div className="text-xs font-bold uppercase text-emerald-700">
          Eco - Intelligent Divergence
        </div>
        <h2 className="font-display text-3xl font-bold text-slate-900">
          Avoid the Crowd. Explore More.
        </h2>
        <p className="mt-2 text-slate-600">
          Ditch the tourist traps. Nearby hidden gems with peaceful trails.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative h-56">
              <img src={dest.image} alt={dest.name} className="h-full w-full object-cover" />
              <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-emerald-800 shadow-sm">
                {dest.crowdLabel}
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-bold text-slate-900">{dest.name}</h3>
              <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                <MapPin size={13} />
                {dest.distance} ({dest.travelTime})
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-600">{dest.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                <button
                  onClick={() => onViewMap(dest)}
                  className="flex items-center justify-center gap-1 rounded-lg border border-slate-300 py-2 text-xs font-semibold transition hover:bg-slate-50"
                >
                  <MapPin size={14} /> View on Map
                </button>
                <button
                  onClick={() => onNavigate(dest)}
                  className="flex items-center justify-center gap-1 rounded-lg bg-[#1b6d24] py-2 text-xs font-semibold text-white transition hover:bg-[#155a1d]"
                >
                  <Navigation size={14} /> Navigate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);