import React, { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(() =>
    localStorage.getItem("theme") === "dark" ||
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button
      className="fixed top-2 right-2 px-3 py-1 text-sm bg-gray-300 dark:bg-gray-700 rounded"
      onClick={() => setIsDark(!isDark)}
    >
      {isDark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};

export default DarkModeToggle;
