import React, { useState, useEffect } from "react";
import "./styles.css"; // Assuming this is the path to your CSS file

const DarkModeToggle = () => {
  // Get the current theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    // Apply the theme class to the body element
    document.body.className = theme + "-mode";

    // Save the current theme to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
};

export default DarkModeToggle;
