"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { aboutBullets } from "@/lib/data";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" style={{ borderTop: "1px solid var(--border)" }}>
      <div ref={ref} className="p-4 sm:px-4 sm:py-5">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-xl font-bold mb-4"
          style={{ color: "var(--text)" }}
        >
          About
        </motion.h2>

        <ul className="space-y-3">
          {aboutBullets.map((bullet, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.4, ease: "easeOut" }}
              className="flex gap-3 text-sm leading-relaxed group"
              style={{ color: "var(--text-muted)" }}
            >
              <span className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }}>·</span>
              <span
                className="transition-colors duration-200"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {bullet}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
