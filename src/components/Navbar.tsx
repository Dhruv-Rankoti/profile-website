"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
  { href: "#", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#connect", label: "Connect" },
];

export default function Navbar() {
  const { theme, toggleWithRipple } = useTheme();

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: theme === "dark" ? "rgba(0,0,0,0.88)" : "rgba(255,255,255,0.88)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto flex h-[53px] max-w-3xl items-center justify-between px-4">
        {/* Logo — X style */}
        <a
          href=""
          className="text-sm font-black tracking-tight transition-colors hover:opacity-70"
          style={{ color: "var(--text)" }}
          aria-label="Home"
        >
          DR
          <span style={{ color: "var(--accent)" }}>.</span>
        </a>

        {/* Nav */}
        <nav className="hidden sm:flex items-center gap-0">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded-full hover:bg-[var(--bg-hover)]"
              style={{ color: "var(--text-muted)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Theme toggle */}
        <button
          id="theme-toggle-btn"
          onClick={(e) => toggleWithRipple(e.clientX, e.clientY)}
          aria-label="Toggle theme"
          className="flex items-center justify-center size-9 rounded-full transition-all duration-200 hover:bg-[var(--bg-hover)]"
          style={{ color: "var(--text-muted)" }}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </motion.header>
  );
}
