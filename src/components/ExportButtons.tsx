import React from "react";
import Papa from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ExportButtons = ({ entries }: any) => {
  const handleCSV = () => {
    const csv = Papa.unparse(entries);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "mood-journal.csv";
    link.click();
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Date", "Mood", "Note", "Weather"]],
      body: entries.map((e: any) => [
        e.date,
        e.mood,
        e.note,
        `${e.weather?.desc} ${e.weather?.temp}°C`,
      ]),
    });
    doc.save("mood-journal.pdf");
  };

  return (
    <div className="flex gap-4 mt-6">
      <button onClick={handleCSV} className="bg-blue-500 text-white px-4 py-2 rounded">
        Export CSV
      </button>
      <button onClick={handlePDF} className="bg-red-500 text-white px-4 py-2 rounded">
        Export PDF
      </button>
    </div>
  );
};

export default ExportButtons;
