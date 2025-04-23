import React, { useEffect, useState } from "react";
import { MOODS } from "./utils/moodOption";
import CalendarView from "./components/CalendarView";
import DarkModeToggle from "./components/DarkModeToggle";
import ExportButtons from "./components/ExportButtons";
import MoodTrendChart from "./components/MoodTrendChart";

const App = () => {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [entries, setEntries] = useState(() =>
    JSON.parse(localStorage.getItem("journalEntries") || "[]")
  );
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const {  } = pos.coords;
      fetch(
        `https://api.weatherapi.com/v1/current.json?key=b43422a979c24eaba5e72656252304&q=London&aqi=no`
      )
        .then((res) => res.json())
        .then(setWeather);
    });
  }, []);

  const handleSave = () => {
    if (!mood) return alert("Please select a mood");
    const entry = {
      date: new Date().toLocaleDateString(),
      mood,
      note,
      weather: {
        temp: weather?.main?.temp ?? "N/A",
        desc: weather?.weather?.[0]?.main ?? "N/A",
      },
    };
    const updated = [entry, ...entries];
    setEntries(updated);
    localStorage.setItem("journalEntries", JSON.stringify(updated));
    setMood("");
    setNote("");
    alert("Saved!");
  };

  return (
    <div className="p-4 max-w-3xl mx-auto min-h-screen dark:bg-gray-900 dark:text-white">
      <DarkModeToggle />
      <h1 className="text-2xl font-bold mb-4">Mood Journal</h1>
      <div className="text-gray-600 mb-2">{new Date().toDateString()}</div>

      <div className="flex gap-2 mb-4">
        {MOODS.map((m) => (
          <button
            key={m.label}
            onClick={() => setMood(m.label)}
            className={`text-3xl p-2 rounded-full ${mood === m.label ? m.color : ""}`}
          >
            {m.emoji}
          </button>
        ))}
      </div>

      <input
        className="border p-2 w-full mb-2"
        placeholder="How are you feeling today?"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <div className="mb-2 text-sm">
       {weather?.weather?.[0]?.main && weather?.main?.temp && (
       <>Weather: {weather.weather[0].main}, {weather.main.temp}°C</>
       )}
      </div>


      <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">
        Save Entry
      </button>

      <ExportButtons entries={entries} />
      <CalendarView entries={entries} filter={filter} setFilter={setFilter} />
      <MoodTrendChart entries={entries} />
    </div>
  );
};

export default App;
