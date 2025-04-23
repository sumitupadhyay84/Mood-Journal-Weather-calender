import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const MoodTrendChart = ({ entries }: any) => {
  const moodCounts: any = {};
  entries.forEach((e: any) => {
    const date = e.date;
    if (!moodCounts[date]) moodCounts[date] = { date };
    moodCounts[date][e.mood] = (moodCounts[date][e.mood] || 0) + 1;
  });

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Mood Trends</h2>
      <LineChart width={700} height={300} data={Object.values(moodCounts)}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Line type="monotone" dataKey="Happy" stroke="#facc15" />
        <Line type="monotone" dataKey="Sad" stroke="#60a5fa" />
        <Line type="monotone" dataKey="Angry" stroke="#f87171" />
        <Line type="monotone" dataKey="Neutral" stroke="#9ca3af" />
        <Line type="monotone" dataKey="Tired" stroke="#c4b5fd" />
      </LineChart>
    </div>
  );
};

export default MoodTrendChart;
