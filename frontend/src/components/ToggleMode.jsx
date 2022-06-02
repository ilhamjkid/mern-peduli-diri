import { useEffect, useState } from "react";

const ToggleMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (!currentTheme || currentTheme === "light") setDarkMode(false);
    else if (currentTheme === "dark") setDarkMode(true);
  }, []);

  const setTheme = () => {
    const currentTheme = localStorage.getItem("theme");
    if (!currentTheme || currentTheme === "light") {
      setDarkMode(true);
      localStorage.setItem("theme", "dark");
      document.querySelector("html").classList.add("dark");
      document.querySelector("html").classList.remove("light");
    } else if (currentTheme === "dark") {
      setDarkMode(false);
      localStorage.setItem("theme", "light");
      document.querySelector("html").classList.add("light");
      document.querySelector("html").classList.remove("dark");
    }
  };

  return (
    <label htmlFor="toggle-mode" className="inline-flex relative items-center cursor-pointer">
      <input type="checkbox" id="toggle-mode" className="sr-only peer" onChange={setTheme} checked={darkMode} />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Change theme</span>
    </label>
  );
};

export default ToggleMode;
