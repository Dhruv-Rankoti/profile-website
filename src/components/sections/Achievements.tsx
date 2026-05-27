"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { education } from "@/lib/data";
import { GraduationCap, MapPin } from "lucide-react";

const achievements = [
  {
    icon: "♟️",
    title: "Founded U-Knighted Chess Society",
    subtitle: "MSIT · Mar 2025 – Present",
    detail: "Scaled to 500+ active members in one semester. Organized inter-college tournaments and analytical thinking sessions.",
    badge: "500+ members",
  },
  {
    icon: "🏆",
    title: "Head of DSA — Microsoft Student Chapter",
    subtitle: "MSIT · Aug 2024 – Aug 2025",
    detail: "Mentored 100+ students through structured DSA bootcamps. Introduced peer code reviews.",
    badge: "100+ mentored",
  },
  {
    icon: "🤖",
    title: "AI Hallucination Detection System",
    subtitle: "SachAI · Production",
    detail: "RAG pipeline with 4-type taxonomy — NLI + semantic similarity. Deployed serverless on Render.",
    badge: "Production deployed",
  },
  {
    icon: "🧠",
    title: "GPT-2 from Scratch",
    subtitle: "PyTorch · 3.2M parameters",
    detail: "Trained decoder-only Transformer on 2M Wikipedia characters. Custom tokenizer + cosine LR decay.",
    badge: "3.2M params",
  },
  {
    icon: "🚗",
    title: "Honda Cars India — Automation",
    subtitle: "Internship · Jun–Jul 2025",
    detail: "Built sales support automation tool reducing manual call-handling effort by 30%.",
    badge: "−30% effort",
  },
];

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const eduRef = useRef(null);
  const eduInView = useInView(eduRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* Education */}
      <section id="education" style={{ borderTop: "1px solid var(--border)" }}>
        <div ref={eduRef} className="p-4 sm:px-4 sm:py-5">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={eduInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-xl font-bold mb-5"
            style={{ color: "var(--text)" }}
          >
            Education
          </motion.h2>

          <div className="space-y-3">
            {education.map((edu, i) => (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, y: 12 }}
                animate={eduInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.45, ease: "easeOut" }}
                className="relative group p-4 rounded-xl border transition-all duration-200 hover:bg-[var(--bg-hover)]"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <GraduationCap
                      size={16}
                      className="shrink-0 mt-0.5"
                      style={{ color: "var(--accent)" }}
                    />
                    <div>
                      <h3 className="font-bold text-sm" style={{ color: "var(--text)" }}>
                        {edu.institution}
                      </h3>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                        {edu.degree}
                      </p>
                      <span
                        className="text-xs flex items-center gap-1 mt-1"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <MapPin size={10} /> {edu.location}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {edu.duration}
                    </p>
                    <p
                      className="text-sm font-bold mt-1"
                      style={{ color: "var(--accent)" }}
                    >
                      {edu.grade}
                    </p>
                    {edu.current && (
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full mt-1 inline-block font-medium"
                        style={{
                          color: "#00ba7c",
                          backgroundColor: "rgba(0, 186, 124, 0.1)",
                        }}
                      >
                        current
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements / Highlights */}
      <section id="achievements" style={{ borderTop: "1px solid var(--border)" }}>
        <div ref={ref} className="p-4 sm:px-4 sm:py-5">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-xl font-bold mb-5"
            style={{ color: "var(--text)" }}
          >
            Highlights
          </motion.h2>

          <div className="space-y-2">
            {achievements.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.45, ease: "easeOut" }}
                className="group p-4 rounded-xl border transition-all duration-200 hover:bg-[var(--bg-hover)]"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg shrink-0">{a.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <h3 className="font-bold text-sm" style={{ color: "var(--text)" }}>
                          {a.title}
                        </h3>
                        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                          {a.subtitle}
                        </p>
                      </div>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full border shrink-0 font-medium"
                        style={{
                          color: "var(--accent)",
                          borderColor: "var(--accent)",
                          backgroundColor: "var(--accent-subtle)",
                        }}
                      >
                        {a.badge}
                      </span>
                    </div>
                    <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {a.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
