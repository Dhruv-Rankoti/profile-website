"use client";

import { personalInfo } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop: "1px solid var(--border)" }}>
      <div className="p-6 text-center">
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Built by{" "}
          <a
            href={personalInfo.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-4 transition-colors"
            style={{ color: "var(--accent)" }}
          >
            {personalInfo.handle}
          </a>{" "}
          · {year}
        </p>
        <p className="text-[11px] mt-1" style={{ color: "var(--text-muted)", opacity: 0.5 }}>
          building ML systems that work
          <span className="animate-blink" style={{ color: "var(--accent)" }}>_</span>
        </p>
      </div>
    </footer>
  );
}
