"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { projects } from "@/lib/data";
import Image from "next/image";

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" style={{ borderTop: "1px solid var(--border)" }}>
      <div ref={ref} className="p-4 sm:px-4 sm:py-5">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-xl font-bold mb-5"
          style={{ color: "var(--text)" }}
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {projects.map((project, i) => (
            <motion.a
              key={project.id}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              className="group rounded-xl border overflow-hidden transition-colors duration-200 hover:bg-[var(--bg-hover)] block"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
            >
              {/* Image preview */}
              <div className="relative w-full aspect-[16/9] overflow-hidden" style={{ borderBottom: "1px solid var(--border)" }}>
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, 350px"
                />
              </div>

              {/* Info */}
              <div className="px-3 py-3">
                <h3 className="font-bold text-sm" style={{ color: "var(--text)" }}>
                  {project.name}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-full text-[10px] border"
                      style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
