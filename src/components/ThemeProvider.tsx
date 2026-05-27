"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";
const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
  toggleWithRipple: (x: number, y: number) => void;
}>({ theme: "dark", toggle: () => {}, toggleWithRipple: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      setTheme(stored);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const toggleWithRipple = (x: number, y: number) => {
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${maxRadius}px at ${x}px ${y}px)`,
    ];

    if (!document.startViewTransition) {
      toggle();
      return;
    }

    document.startViewTransition(() => {
      setTheme((t) => (t === "dark" ? "light" : "dark"));
    }).ready.then(() => {
      document.documentElement.animate(
        { clipPath },
        { duration: 500, easing: "ease-in", pseudoElement: "::view-transition-new(root)" }
      );
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle, toggleWithRipple }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
