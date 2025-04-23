import React from "react";

const CalendarView = ({ entries, filter, setFilter }: any) => {
  const filtered = filter === "All" ? entries : entries.filter((e: any) => e.mood === filter);
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Calendar</h2>
        <select
          className="border px-2 py-1"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {["All", "Happy", "Sad", "Angry", "Neutral", "Tired"].map((m) => <option key={m}>{m}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {filtered.map((e: any, i: number) => (
          <div key={i} className="border p-2 rounded text-sm">
            <div>{e.date}</div>
            <div className="text-xl">{e.mood}</div>
            <div>{e.note}</div>
            <div>{e.weather?.desc} - {e.weather?.temp}°C</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
