"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext<{ theme: string; handleClick: () => void }>({
  theme: "dark",
  handleClick: () => {},
});

interface Props {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or default to "dark"
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleClick = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, handleClick }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeProvider, useTheme };
