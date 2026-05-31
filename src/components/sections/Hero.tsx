"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { personalInfo, stats } from "@/lib/data";
import { MapPin, Download, Phone, Calendar } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bannerY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const [currentTime, setCurrentTime] = useState("");
  const taglines = ["20, Dev", "AI/ML Engineer", "CS Student", "Builder"];
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [taglineVisible, setTaglineVisible] = useState(true);
  useEffect(() => {
    const id = setInterval(() => {
      setTaglineVisible(false);
      setTimeout(() => { setTaglineIndex((i) => (i + 1) % taglines.length); setTaglineVisible(true); }, 400);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section ref={ref} className="relative">
      {/* Banner — X style: dark, minimal */}
      <div className="relative aspect-[3/1] sm:aspect-[4/1] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: bannerY }}>
          <Image
            src="/banner.jpg"
            alt="Profile Banner"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
          {/* X-style subtle bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </motion.div>
      </div>

      {/* Profile Content — exactly like X */}
      <motion.div
        className="relative z-10 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Avatar + Actions row */}
        <div className="flex items-end justify-between -mt-12 sm:-mt-16 mb-3">
          {/* Avatar */}
          <motion.div variants={fadeUp} className="relative">
            <div
              className="rounded-full p-[3px]"
              style={{ backgroundColor: "var(--bg)" }}
            >
              <div
                className="relative size-[72px] sm:size-[90px] md:size-[112px] rounded-full overflow-hidden"
                style={{ border: "4px solid var(--bg)" }}
              >
                <Image
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
            </div>
          </motion.div>

          {/* Action buttons — X style */}
          <motion.div variants={fadeUp} className="flex items-center gap-2 mb-1">
            <a
              href="https://calendly.com/dhruvrankoti/book-a-call"
              target="_blank"
              id="download-resume-btn"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200 hover:opacity-80"
              style={{
                backgroundColor: "var(--text)",
                color: "var(--bg)",
              }}
            >
              <Phone size={13} />
              Book a Call
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              id="github-hero-btn"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold border transition-all duration-200 hover:bg-[var(--bg-hover)]"
              style={{ borderColor: "var(--border)", color: "var(--text)" }}
            >
              <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub
            </a>
          </motion.div>
        </div>

        {/* Name & Handle — X style typography */}
        <motion.div variants={fadeUp} className="mb-2">
          <h1
            className="text-xl sm:text-2xl font-extrabold leading-tight"
            style={{ color: "var(--text)" }}
          >
            {personalInfo.name}
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
            {personalInfo.handle}
          </p>
        </motion.div>

        {/* Bio / tagline — X style */}
        <motion.p
          variants={fadeUp}
          className="text-sm leading-relaxed mb-3"
          style={{ color: "var(--text-soft)" }}
        >
          {personalInfo.bio}
        </motion.p>

        {/* Meta info row — X style */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm mb-3"
          style={{ color: "var(--text-muted)" }}
        >
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {personalInfo.location}
          </span>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline transition-colors"
            style={{ color: "var(--accent)" }}
          >
            <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            github.com/dhruvrankoti
          </a>
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            Joined {personalInfo.joinedYear}
          </span>
          {currentTime && (
            <span className="flex items-center gap-1.5">
              <span
                className="size-2 rounded-full animate-pulse-dot"
                style={{ backgroundColor: "#00ba7c" }}
              />
              {currentTime} IST
            </span>
          )}
        </motion.div>

        {/* Social icon links */}
        <motion.div variants={fadeUp} className="flex items-center gap-2 mb-5">
          {[
            {
              href: personalInfo.github,
              label: "GitHub",
              path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
            },
            {
              href: personalInfo.linkedin,
              label: "LinkedIn",
              path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
            },
            {
              href: personalInfo.twitter,
              label: "X / Twitter",
              path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
            },
          ].map(({ href, label, path }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center justify-center size-9 rounded-full transition-all duration-200 hover:bg-[var(--accent-subtle)]"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor">
                <path d={path} />
              </svg>
            </a>
          ))}
        </motion.div>

        {/* Rotating tagline */}
        <motion.div variants={fadeUp} className="mb-5" style={{ minHeight: "1.5rem" }}>
          <span
            style={{
              color: "var(--text-muted)",
              opacity: taglineVisible ? 1 : 0,
              transform: taglineVisible ? "translateY(0)" : "translateY(6px)",
              display: "inline-block",
              transition: "opacity 0.4s ease, transform 0.4s ease",
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            {taglines[taglineIndex]}
          </span>
        </motion.div>

        {/* Stats grid — X style: following/followers feel */}
        {/* <motion.div variants={fadeUp}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.45, ease: "easeOut" }}
                className="px-3 py-2.5 rounded-xl border transition-all duration-200 hover:bg-[var(--bg-hover)] cursor-default"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
              >
                <p className="text-base sm:text-lg font-bold" style={{ color: "var(--accent)" }}>
                  {stat.value}
                  <span className="text-xs font-normal ml-0.5" style={{ color: "var(--text-muted)" }}>
                    {stat.suffix}
                  </span>
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div> */}

        {/* Status — X style badge */}
        {/* <motion.div variants={fadeUp} className="mt-3">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-muted)",
              backgroundColor: "var(--bg-card)",
            }}
          >
            <span
              className="size-1.5 rounded-full animate-pulse-dot"
              style={{ backgroundColor: "var(--accent)" }}
            />
            {personalInfo.status}
          </div>
        </motion.div> */}
      </motion.div>
    </section>
  );
}
