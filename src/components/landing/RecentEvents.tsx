import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Users, Lightbulb, GraduationCap, School } from "lucide-react";

// ─────────────────────────────────────────────────────────────
//  CONTENT — Update these as Ibzen grows.
//  Add new schools to SCHOOLS. Update LATEST_EVENT to reflect
//  the most recent ideathon. Stats are cumulative totals.
// ─────────────────────────────────────────────────────────────

const SCHOOLS = [
  "GJC Shiralakoppa",
  // Add new schools here as Ibzen expands
  // "School Name",
];

const LATEST_EVENT = {
  school: "GJC Shiralakoppa",
  label: "Latest Event · 2026",
  sublabel: "Ideathon 2026",
  description:
    "Students collaborated relentlessly over 48 hours — challenging assumptions, stress-testing ideas, and defending business models before a panel of industry judges.",
  imageSrc: "/images/GJCshiralakoppa.jpg",
  imageFallback:
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop",
};

// Cumulative stats — update numbers as Ibzen scales
const STATS = [
  { value: "40+", label: "Students Reached", icon: "users" },
  { value: "11+", label: "Ideas Pitched", icon: "lightbulb" },
  { value: `${SCHOOLS.length}+`, label: "Schools Partnered", icon: "school" },
];

// ─────────────────────────────────────────────────────────────

function buildTrack() {
  // Repeat the list enough times for a seamless infinite scroll
  const repeated = Array.from({ length: Math.max(3, Math.ceil(12 / SCHOOLS.length)) }, () => SCHOOLS).flat();
  return repeated;
}

export function RecentEvents() {
  const { ref, inView } = useInView(0.1);
  const [paused, setPaused] = useState(false);
  const marqueeItems = buildTrack();

  return (
    <section id="impact" className="relative mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-24 overflow-hidden">
      {/* Background Decorative Ambient Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]"
      />

      {/* ── SECTION HEADER — timeless, not tied to any single school ── */}
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`relative z-10 max-w-2xl mb-10 sm:mb-16 reveal ${inView ? "is-visible" : ""}`}
      >
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-gold mb-2">
          OUR IMPACT
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[3.5rem] font-extrabold font-['Outfit',sans-serif] leading-[1.1] tracking-tight text-navy">
          Taking Ideathons{" "}
          <br className="hidden sm:block" />
          <span className="font-['Playfair_Display',serif] italic text-navy/90 block mt-1 sm:mt-2 text-2xl sm:text-[2.5rem] font-medium">
            Directly Into Schools.
          </span>
        </h2>
        <p className="mt-5 text-sm sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
          We partner with schools to run structured 48-hour innovation sprints — equipping students with real-world problem-solving frameworks, dedicated mentorship, and the confidence to pitch bold ideas.
        </p>
      </div>

      {/* ── BENTO GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 relative z-10 mb-8 sm:mb-12">

        {/* Latest Event Spotlight — update LATEST_EVENT above to refresh this card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group relative md:col-span-2 bg-card/60 backdrop-blur-xl rounded-[24px] sm:rounded-[28px] border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 blue-fog-outline min-h-[240px] sm:min-h-[300px] flex flex-col justify-end"
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/50 to-transparent z-10" />

          {/* Event image */}
          <img
            src={LATEST_EVENT.imageSrc}
            onError={(e) => { e.currentTarget.src = LATEST_EVENT.imageFallback; }}
            alt={`Students at the ${LATEST_EVENT.school} Ideathon`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
          />

          {/* Event info overlay */}
          <div className="relative z-20 mt-auto p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[0.65rem] sm:text-xs font-bold uppercase tracking-wider bg-gold/90 text-navy mb-3 sm:mb-4 shadow-sm backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-navy animate-pulse" />
              {LATEST_EVENT.label}
            </div>
            <h3 className="text-xl sm:text-3xl font-bold text-white mb-0.5 sm:mb-1 font-['Outfit']">
              {LATEST_EVENT.school}
            </h3>
            <p className="text-gold/80 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-widest mb-2 sm:mb-3">
              {LATEST_EVENT.sublabel}
            </p>
            <p className="text-white/80 max-w-md text-xs sm:text-base">
              {LATEST_EVENT.description}
            </p>
          </div>
        </motion.div>

        {/* Cumulative Stats Column */}
        <div className="grid grid-cols-3 md:flex md:flex-col gap-4 sm:gap-6 md:col-span-1">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="bg-card rounded-[24px] sm:rounded-[28px] border border-border p-4 sm:p-6 flex flex-col gap-2 sm:gap-3 relative overflow-hidden group hover:border-gold/50 transition-colors duration-300 flex-1 justify-center"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                style={{ background: i === 1 ? "rgb(var(--color-gold)/0.1)" : "rgb(var(--color-primary)/0.1)" }}>
                {stat.icon === "users" && <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />}
                {stat.icon === "lightbulb" && <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />}
                {stat.icon === "school" && <School className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />}
              </div>
              <div>
                <h4 className="text-2xl sm:text-4xl font-extrabold text-navy font-['Outfit']">{stat.value}</h4>
                <p className="text-[0.6rem] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider mt-0.5 sm:mt-1 leading-tight">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── SCHOOLS MARQUEE — add schools to the SCHOOLS array above ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 w-full rounded-[24px] sm:rounded-[28px] border border-border bg-card/40 backdrop-blur-sm p-4 sm:p-8 overflow-hidden shadow-sm flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
      >
        <div className="flex-shrink-0 flex items-center gap-3 pr-4 sm:pr-6 border-b sm:border-b-0 sm:border-r border-border/60 pb-3 sm:pb-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-navy text-gold flex items-center justify-center">
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h4 className="font-bold text-navy text-base sm:text-lg font-['Outfit']">{SCHOOLS.length}+ School{SCHOOLS.length !== 1 ? "s" : ""}</h4>
            <p className="text-[0.65rem] sm:text-xs text-muted-foreground uppercase tracking-wider font-medium">Partnered so far</p>
          </div>
        </div>

        <div className="flex-1 w-full overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-card to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-card to-transparent z-10" />

          <div
            className="ticker-viewport w-full"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className={`ticker-track${paused ? " ticker-track--paused" : ""}`}>
              {marqueeItems.map((school, i) => (
                <React.Fragment key={i}>
                  <span className="flex-shrink-0 text-navy font-bold text-xs sm:text-base px-2 uppercase tracking-widest whitespace-nowrap transition-colors hover:text-gold">
                    {school}
                  </span>
                  <span aria-hidden className="ticker-dot bg-gold/50" />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

    </section>
  );
}
