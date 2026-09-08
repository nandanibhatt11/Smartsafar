import React, { useMemo, useState } from "react";
import { Wallet, CalendarDays, Bookmark, Download } from "lucide-react";

export const StudentPlanner = () => {
  const [budget, setBudget] = useState(3000);
  const [duration, setDuration] = useState("2");

  const plan = useMemo(() => {
    if (budget < 3000) {
      return {
        title: `${duration}-Day Budget Trek`,
        note: `Optimized for ₹${budget.toLocaleString()} with low-cost stays and local transit.`,
      };
    }
    if (budget < 6000) {
      return {
        title: `${duration}-Day Offbeat Mussoorie & Landour Trekker`,
        note: `Under ₹${budget.toLocaleString()} Budget`,
      };
    }
    return {
      title: `${duration}-Day Premium Quiet-Hills Escape`,
      note: `Comfort-focused plan within ₹${budget.toLocaleString()}.`,
    };
  }, [budget, duration]);

  return (
    <section id="planner" className="bg-[#faf8ff] py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-100 p-2 text-emerald-800"><Wallet size={22} /></div>
          <div>
            <h2 className="font-display text-3xl font-bold">Student Travel Planner</h2>
            <p className="mt-1 text-sm text-slate-600">Build a practical trip around your budget.</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-5">
            <div className="flex justify-between">
              <span className="font-medium">Your Budget</span>
              <span className="font-bold text-emerald-800">₹{budget.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1500"
              max="15000"
              step="500"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="mt-3 w-full accent-[#1b6d24]"
            />

            <div className="mt-7">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <CalendarDays size={16} /> Trip Duration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["2", "3", "5"].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`rounded-lg border py-2 text-sm font-semibold ${duration === d ? "border-[#1b6d24] bg-[#1b6d24] text-white" : "border-slate-300 text-slate-700"}`}
                  >
                    {d} Days
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-bold">{plan.title}</h3>
                <p className="mt-2 text-xs font-semibold text-emerald-700">✓ {plan.note}</p>
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg border border-slate-300 p-2 text-slate-600" title="Save plan">
                  <Bookmark size={17} />
                </button>
                <button className="rounded-lg border border-slate-300 p-2 text-slate-600" title="Download plan">
                  <Download size={17} />
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ["Stay", "Budget hostel"],
                ["Transit", "Shared / local"],
                ["Best time", "Early morning"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-slate-50 p-4">
                  <div className="text-xs text-slate-500">{k}</div>
                  <div className="mt-1 text-sm font-bold text-slate-900">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};