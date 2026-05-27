"use client";

import { GitPullRequestIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import type { GitHubPR } from "@/lib/github";

const STATUS_STYLES = {
  MERGED: { bg: "rgba(168,85,247,0.15)", color: "#a855f7", label: "merged" },
  OPEN:   { bg: "rgba(34,197,94,0.15)",  color: "#22c55e", label: "open" },
  CLOSED: { bg: "rgba(239,68,68,0.15)",  color: "#ef4444", label: "closed" },
};

function StatusBadge({ status }: { status: "MERGED" | "OPEN" | "CLOSED" }) {
  const { bg, color, label } = STATUS_STYLES[status];
  return (
    <span
      className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium"
      style={{ backgroundColor: bg, color }}
    >
      {label}
    </span>
  );
}

function PrCard({ pr, index }: { pr: GitHubPR; index: number }) {
  return (
    <motion.a
      href={pr.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: "easeOut" }}
      className="flex items-start gap-3 rounded-xl border px-3 py-2.5 transition-colors duration-200 hover:bg-[var(--bg-hover)]"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
    >
      <div
        className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)" }}
      >
        <GitPullRequestIcon className="size-3.5" style={{ color: "var(--text-muted)" }} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
            {pr.repository.name}
          </span>
          <time className="shrink-0 text-xs" style={{ color: "var(--text-muted)" }}>
            {formatDistanceToNow(new Date(pr.createdAt), { addSuffix: true })}
          </time>
        </div>
        <p className="line-clamp-1 text-sm font-medium" style={{ color: "var(--text)" }}>
          {pr.title}
        </p>
        <div className="mt-1">
          <StatusBadge status={pr.state} />
        </div>
      </div>
    </motion.a>
  );
}

export function RecentPrs({ prs }: { prs: GitHubPR[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [showAll, setShowAll] = useState(false);

  if (prs.length === 0) return null;

  const initial = prs.slice(0, 5);
  const rest = prs.slice(5);

  return (
    <section id="recent-prs" style={{ borderTop: "1px solid var(--border)" }}>
      <div ref={ref} className="p-4 sm:px-4 sm:py-5">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-xl font-bold mb-5"
          style={{ color: "var(--text)" }}
        >
          Recent Pull Requests
        </motion.h2>

        <div className="flex flex-col gap-2">
          {initial.map((pr, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.4, ease: "easeOut" }}
            >
              <PrCard pr={pr} index={0} />
            </motion.div>
          ))}

          <AnimatePresence initial={false}>
            {showAll && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
                className="flex flex-col gap-2"
              >
                {rest.map((pr, i) => (
                  <PrCard key={`rest-${i}`} pr={pr} index={0} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {rest.length > 0 && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors duration-200"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "transparent" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--bg-hover)")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {showAll ? (
                <>Show Less <ChevronUpIcon className="size-4" /></>
              ) : (
                <>Show More <ChevronDownIcon className="size-4" /></>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
