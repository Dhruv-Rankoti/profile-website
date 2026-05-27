"use client";
import { useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";

export default function Oneko() {
  const { theme } = useTheme();

  useEffect(() => {
    import("@/assests/oneko.js").then((mod) => mod.oneko());
  }, []);

  useEffect(() => {
    const el = document.getElementById("oneko");
    if (el) el.style.backgroundImage = `url(${theme === "dark" ? "/oneko-dark.gif" : "/oneko.gif"})`;
  }, [theme]);

  return null;
}
