"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { socialLinks } from "@/lib/data";
import { ArrowUpRight, Mail } from "lucide-react";

export default function Connect() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="connect" style={{ borderTop: "1px solid var(--border)" }}>
      <div ref={ref} className="p-4 sm:px-4 sm:py-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-xl font-bold mb-1" style={{ color: "var(--text)" }}>
            Connect With Me
          </h2>
          <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>
            Find me across the internet
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              id={`connect-${link.name.toLowerCase().replace(/\s/g, "-")}`}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.45, ease: "easeOut" }}
              className="group flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 hover:bg-[var(--bg-hover)]"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg-card)",
              }}
            >
              {/* Icon box */}
              <div
                className="relative size-10 shrink-0 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
                style={{
                  backgroundColor: "var(--bg-hover)",
                  border: "1px solid var(--border)",
                }}
              >
                {link.isLinkedIn ? (
                  <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" style={{ color: "#0a66c2" }}>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                ) : link.isEmail ? (
                  <Mail size={18} style={{ color: "#ea4335" }} />
                ) : (
                  <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" style={{ color: "var(--text-muted)" }}>
                    <path d={link.iconPath!} />
                  </svg>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3
                  className="font-bold text-sm transition-colors group-hover:underline underline-offset-4"
                  style={{ color: "var(--text)" }}
                >
                  {link.name}
                </h3>
                <p className="text-xs truncate mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {link.handle}
                </p>
              </div>

              <ArrowUpRight
                size={15}
                className="shrink-0 transition-all duration-200 group-hover:-translate-y-px group-hover:translate-x-px"
                style={{ color: "var(--text-muted)" }}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
