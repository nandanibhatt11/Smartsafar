import React, { useMemo, useState } from "react";
import { Menu, X, MapPinned, Bell, ChevronDown } from "lucide-react";
import { YatraSenseLogo } from "./components/YatraSenseLogo";
import { HeroSection } from "./components/HeroSection";
import { TelemetrySection } from "./components/TelemetrySection";
import { OffbeatDestinations } from "./components/OffbeatDestinations";
import { LiveCrowdMap } from "./components/LiveCrowdMap";
import { StudentPlanner } from "./components/StudentPlanner";

const telemetry = {
  name: "Mussoorie",
  state: "Uttarakhand",
  liveDensity: 62,
  densityNote: "Moderate — manageable right now",
  transit: "48%",
  weather: "18°C",
  quietWindow: "6–8 AM",
  experience: "8.4/10",
  hourlyForecast: [
    { hour: "6AM", crowdLevel: 18 },
    { hour: "7AM", crowdLevel: 15 },
    { hour: "8AM", crowdLevel: 22 },
    { hour: "9AM", crowdLevel: 35 },
    { hour: "10AM", crowdLevel: 48 },
    { hour: "11AM", crowdLevel: 61 },
    { hour: "12PM", crowdLevel: 72 },
    { hour: "1PM", crowdLevel: 78 },
    { hour: "2PM", crowdLevel: 82 },
    { hour: "3PM", crowdLevel: 76 },
    { hour: "4PM", crowdLevel: 67 },
    { hour: "5PM", crowdLevel: 54 },
  ],
};

const destinations = [
  {
    id: 1,
    name: "Landour Forest Trail",
    distance: "4.8 km",
    travelTime: "18 min",
    crowdLabel: "Very Quiet",
    crowdStatus: "low",
    lat: 30.4546,
    lng: 78.1025,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
    description: "A peaceful pine-lined route away from the busiest tourist lanes.",
  },
  {
    id: 2,
    name: "George Everest View",
    distance: "7.1 km",
    travelTime: "28 min",
    crowdLabel: "Low Crowd",
    crowdStatus: "low",
    lat: 30.4597,
    lng: 78.0308,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80",
    description: "Wide Himalayan views and open walking space for a calmer experience.",
  },
  {
    id: 3,
    name: "Cloud's End",
    distance: "6.5 km",
    travelTime: "24 min",
    crowdLabel: "Moderate",
    crowdStatus: "moderate",
    lat: 30.4268,
    lng: 78.0208,
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=80",
    description: "A forest escape with scenic trails and a quieter alternative to Mall Road.",
  },
];

const mapMarkers = [
  { name: "Mall Road", lat: 30.4598, lng: 78.0667, crowdPercent: 84, crowdStatus: "high" },
  { name: "Library Chowk", lat: 30.4618, lng: 78.0682, crowdPercent: 71, crowdStatus: "high" },
  ...destinations.map(({ name, lat, lng, crowdLabel, crowdStatus, description }) => ({
    name, lat, lng, crowdPercent: crowdStatus === "low" ? 18 : 46, crowdStatus, description,
  })),
];

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [focusMarker, setFocusMarker] = useState(null);

  const markerList = useMemo(() => mapMarkers, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const handleNavigate = (dest) => {
    setFocusMarker(dest);
    scrollTo("live-map");
  };

  const handleViewMap = (dest) => {
    setFocusMarker(dest);
    scrollTo("live-map");
  };

  return (
    <div className="min-h-screen bg-[#faf8ff]">
      <header className="sticky top-0 z-[1100] border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="YatraSense home">
            <YatraSenseLogo />
          </button>

          <nav className="hidden items-center gap-7 md:flex">
            <button onClick={() => scrollTo("telemetry")} className="text-sm font-semibold text-slate-600 hover:text-emerald-700">Live Status</button>
            <button onClick={() => scrollTo("destinations")} className="text-sm font-semibold text-slate-600 hover:text-emerald-700">Destinations</button>
            <button onClick={() => scrollTo("live-map")} className="text-sm font-semibold text-slate-600 hover:text-emerald-700">Live Map</button>
            <button onClick={() => scrollTo("planner")} className="text-sm font-semibold text-slate-600 hover:text-emerald-700">Student Planner</button>
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><Bell size={19} /></button>
            <button onClick={() => scrollTo("planner")} className="rounded-lg bg-[#1b6d24] px-4 py-2 text-sm font-semibold text-white hover:bg-[#155a1d]">
              Plan My Trip
            </button>
          </div>

          <button onClick={() => setMobileOpen((v) => !v)} className="rounded-lg p-2 md:hidden" aria-label="Toggle menu">
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white p-4 md:hidden">
            {[
              ["Live Status", "telemetry"],
              ["Destinations", "destinations"],
              ["Live Map", "live-map"],
              ["Student Planner", "planner"],
            ].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="block w-full rounded-lg px-3 py-3 text-left text-sm font-semibold hover:bg-slate-50">
                {label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main>
        <HeroSection
          onExplore={() => scrollTo("destinations")}
          onViewMap={() => scrollTo("live-map")}
        />

        <TelemetrySection telemetry={telemetry} />

        <OffbeatDestinations
          destinations={destinations}
          onViewMap={handleViewMap}
          onNavigate={handleNavigate}
        />

        <section id="live-map" className="border-t border-slate-200 bg-white py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-emerald-700">
                  <MapPinned size={15} /> Real-time crowd intelligence
                </div>
                <h2 className="mt-1 font-display text-3xl font-bold text-slate-900">Live Crowd Map</h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-600">
                  See busy areas and quieter alternatives around Mussoorie at a glance.
                </p>
              </div>
              <div className="rounded-lg bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-800">
                {mapMarkers.length} sensor locations
              </div>
            </div>
            <LiveCrowdMap markers={markerList} focusMarker={focusMarker} />
          </div>
        </section>

        <StudentPlanner />
      </main>

      <footer className="bg-slate-950 py-10 text-slate-300">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-4 md:flex-row md:items-center">
          <YatraSenseLogo />
          <p className="text-sm text-slate-400">Travel Smart. Experience More. Avoid the Crowd.</p>
          <p className="text-xs text-slate-500">SIH Project Demo • YatraSense</p>
        </div>
      </footer>
    </div>
  );
}