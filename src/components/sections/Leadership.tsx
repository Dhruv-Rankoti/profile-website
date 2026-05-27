"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { activities } from "@/lib/data";
import { MapPin, Calendar, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Leadership() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="leadership" style={{ borderTop: "1px solid var(--border)" }}>
      <div ref={ref} className="p-4 sm:px-4 sm:py-5">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-xl font-bold mb-5"
          style={{ color: "var(--text)" }}
        >
          Leadership
        </motion.h2>

        <div className="relative">
          <div
            className="absolute left-[10px] top-2 bottom-2 w-px"
            style={{ backgroundColor: "var(--border)" }}
          />

          <div className="space-y-5 ml-7">
            {activities.map((act, i) => (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" }}
                className="relative"
              >
                <div
                  className="absolute -left-[22px] top-2 size-2.5 rounded-full border-2"
                  style={{ backgroundColor: "var(--text)", borderColor: "var(--bg)", boxShadow: "0 0 0 1px var(--border)" }}
                />

                <div
                  className="relative rounded-xl border transition-colors duration-200 hover:bg-[var(--bg-hover)] cursor-pointer"
                  style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
                  onClick={() => setExpanded(expanded === act.id ? null : act.id)}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <div className="flex items-center gap-3">
                        <div className="shrink-0 size-9 rounded-lg border overflow-hidden" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}>
                          <Image src={act.logo} alt={act.company} width={36} height={36} className="object-contain w-full h-full" />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm" style={{ color: "var(--text)" }}>{act.role}</h3>
                          <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>{act.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="inline-flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                          <Calendar size={10} />
                          {act.duration}
                        </span>
                        <motion.div animate={{ rotate: expanded === act.id ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown size={14} style={{ color: "var(--text-muted)" }} />
                        </motion.div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                      <MapPin size={10} />
                      {act.location}
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {expanded === act.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <ul className="px-4 pb-4 space-y-1.5" style={{ borderTop: "1px solid var(--border)" }}>
                          <div className="pt-3" />
                          {act.bullets.map((b, j) => (
                            <li key={j} className="flex gap-2 text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                              <span className="shrink-0 mt-0.5" style={{ color: "var(--text)" }}>·</span>
                              {b}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
