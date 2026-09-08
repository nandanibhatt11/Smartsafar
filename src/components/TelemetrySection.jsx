import React from "react";
import { Radio, TrainFront, CloudSun, Clock3, Smile } from "lucide-react";

export const TelemetrySection = ({ telemetry }) => {
  const cards = [
    { label: "Live Density", value: `${telemetry.liveDensity}%`, note: telemetry.densityNote, icon: Radio },
    { label: "Transit Load", value: telemetry.transit, note: "Current route pressure", icon: TrainFront },
    { label: "Weather", value: telemetry.weather, note: "Conditions at destination", icon: CloudSun },
    { label: "Quiet Window", value: telemetry.quietWindow, note: "Best time to explore", icon: Clock3 },
    { label: "Experience", value: telemetry.experience, note: "Predicted comfort score", icon: Smile },
  ];

  return (
    <section id="telemetry" className="bg-[#faf8ff] pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col justify-between gap-4 pb-8 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-600">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-600" />
              TELEMETRY INGESTION ACTIVE
            </div>
            <h2 className="font-display text-3xl font-bold text-slate-900">
              Live Status: {telemetry.name}, {telemetry.state}
            </h2>
          </div>
          <div className="text-xs text-slate-500">
            Updated 3 mins ago • Mall Road Sensor Node #08
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {cards.map(({ label, value, note, icon: Icon }) => (
            <div key={label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-xs font-bold text-slate-500">{label}</div>
                <Icon size={17} className="text-emerald-700" />
              </div>
              <div className="font-display text-3xl font-bold text-slate-900">{value}</div>
              <p className="mt-1 text-xs text-slate-600">{note}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
          <h3 className="font-display text-lg font-bold">
            Hourly Congestion Forecast vs Quiet Windows
          </h3>
          <div className="grid h-56 grid-cols-12 items-end gap-2 pt-6">
            {telemetry.hourlyForecast.map((item) => (
              <div key={item.hour} className="flex h-full flex-col items-center justify-end">
                <div className="mb-1 text-[10px] font-bold text-slate-500">
                  {item.crowdLevel}%
                </div>
                <div
                  title={`${item.hour}: ${item.crowdLevel}% crowd`}
                  style={{ height: `${Math.max(item.crowdLevel, 5)}%` }}
                  className={`w-full rounded-t ${item.crowdLevel >= 70 ? "bg-red-500" : item.crowdLevel >= 45 ? "bg-amber-500" : "bg-emerald-600"}`}
                />
                <span className="mt-2 text-[11px] font-semibold text-slate-600">{item.hour}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};