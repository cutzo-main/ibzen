import React, { useRef, useCallback, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { ExternalLink } from "lucide-react";

function TiltMini({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    el.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "";
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.15s ease" }}
      className="w-full"
    >
      {children}
    </div>
  );
}

const steps = [
  {
    id: "01",
    phase: "Step 01",
    title: "Classroom Outreach",
    desc: "Our student-led team visits school classrooms to introduce the programme, spark curiosity, and challenge students to spot real-world problems worth solving.",
    align: "left" as const,
    tag: "Outreach",
  },
  {
    id: "02",
    phase: "Step 02",
    title: "Idea Submission",
    desc: "Every interested student submits their own idea before the event. Our mentors review all entries and shortlist the strongest concepts to move forward into the sprint.",
    align: "right" as const,
    tag: "Selection",
  },
  {
    id: "03",
    phase: "Step 03",
    title: "Teams & Mentors Assigned",
    desc: "Selected ideas become the foundation of each squad (2–4 students). Every team — whether your idea was picked or not — is paired with one dedicated engineering mentor for the full 48 hours.",
    align: "left" as const,
    tag: "Formation",
  },
  {
    id: "04",
    phase: "Step 04",
    title: "The 2-Day Sprint & Pitch",
    desc: "Teams spend 48 hours developing a complete business model. No prototypes — pure thinking, research, and strategy. On Day 2, they present to a panel of judges.",
    align: "right" as const,
    tag: "Building & Pitch",
  },
  {
    id: "05",
    phase: "Step 05",
    title: "Prizes & Progression",
    desc: "Winning teams gain direct access to InnoveX Hub — our premier engineering lab — where they take their first real steps into building what they envisioned.",
    align: "left" as const,
    tag: "Incubation",
  },
];

/** Measures an element's height and keeps it updated via ResizeObserver */
function useElementHeight(ref: React.RefObject<HTMLElement | null>) {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return height;
}


export function Journey() {
  const { ref: headRef, inView: headVisible } = useInView();
  const { ref: sectionRef, inView: sectionVisible } = useInView(0.05);

  // Desktop
  const desktopRef = useRef<HTMLDivElement>(null);
  const desktopH = useElementHeight(desktopRef as React.RefObject<HTMLElement>);

  const { scrollYProgress: desktopScroll } = useScroll({
    target: desktopRef,
    offset: ["start 60%", "end 80%"],
  });
  const desktopClipH = useTransform(desktopScroll, [0, 1], [0, desktopH]);

  // Mobile
  const mobileRef = useRef<HTMLDivElement>(null);
  const mobileH = useElementHeight(mobileRef as React.RefObject<HTMLElement>);

  const { scrollYProgress: mobileScroll } = useScroll({
    target: mobileRef,
    offset: ["start 65%", "end 85%"],
  });
  const mobileClipH = useTransform(mobileScroll, [0, 1], [0, mobileH]);

  return (
    <section
      id="journey"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 relative overflow-hidden"
    >
      {/* Section Header */}
      <div
        ref={headRef as React.RefObject<HTMLDivElement>}
        className={`max-w-2xl mb-16 sm:mb-20 mx-auto text-center reveal ${headVisible ? "is-visible" : ""}`}
      >
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-muted-foreground">
          FROM CLASSROOM THOUGHT TO STAGE PITCH
        </p>
        <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-playfair font-normal italic leading-tight tracking-tight text-navy">
          The <span className="not-italic inline-block">J</span>ourney
        </h2>
      </div>

      {/* ── DESKTOP LAYOUT (md+) ── */}
      <div
        ref={desktopRef}
        className="relative hidden md:block max-w-5xl mx-auto"
      >
        {/* Faint spine behind the road */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-border/30 pointer-events-none" />

        {/* Road — full natural height, revealed by animated clipPath */}
        {desktopH > 0 && (
          <div
            className="absolute left-1/2 top-0 pointer-events-none"
            style={{ transform: "translateX(-50%)", width: 26, height: desktopH }}
          >
            {/* Override the static clipPath rect height with a motion value */}
            <svg
              width={26}
              height={desktopH}
              style={{ display: "block", overflow: "visible", position: "absolute", inset: 0 }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="d-dashes" x={0} y={0} width={26} height={32} patternUnits="userSpaceOnUse">
                  <rect x={11} y={4} width={4} height={16} rx={2} fill="white" />
                </pattern>
                <clipPath id="d-road-clip">
                  <motion.rect x={0} y={0} width={26} height={desktopClipH} />
                </clipPath>
              </defs>

              <g clipPath="url(#d-road-clip)">
                {/* Outer border (dark gold) */}
                <rect x={0} y={0} width={26} height={desktopH} fill="#c28500" />
                {/* Inner track (main gold) */}
                <rect x={3} y={0} width={20} height={desktopH} fill="#f2a900" />
                {/* Center dashes */}
                <rect x={0} y={0} width={26} height={desktopH} fill="url(#d-dashes)" />
              </g>
            </svg>
          </div>
        )}

        {/* Step cards */}
        <div className="flex flex-col gap-16 py-4">
          {steps.map((step, idx) => {
            const isLeft = step.align === "left";
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.65, delay: 0.05, ease: "easeOut" }}
                className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-0"
              >
                {/* Left side — card or spacer */}
                <div className={isLeft ? "pr-10" : ""}>
                  {isLeft && (
                    <TiltMini>
                      <div className="bg-card rounded-[28px] border border-border p-7 sm:p-8 text-left flex flex-col gap-3 blue-fog-outline">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-muted text-muted-foreground">
                            {step.phase}
                          </span>
                          <span className="text-xs font-semibold text-gold">{step.tag}</span>
                        </div>
                        <h4 className="text-xl sm:text-2xl font-bold text-navy tracking-tight">{step.title}</h4>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{step.desc}</p>
                        {step.id === "05" && (
                          <a
                            href="https://innovexhub.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                          >
                            <span>Enter InnoveX Hub</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </TiltMini>
                  )}
                </div>

                {/* Centre node on the spine */}
                <div className="flex flex-col items-center relative z-10 shrink-0">
                  {isLeft && (
                    <div className="absolute right-full top-1/2 -translate-y-1/2 h-[3px] w-10 bg-gold rounded-l-full" />
                  )}
                  <div className="w-10 h-10 rounded-full bg-gold border-2 border-amber-300 shadow-[0_0_14px_rgba(242,169,0,0.5)] flex items-center justify-center shrink-0">
                    <span className="text-[0.65rem] font-bold text-white leading-none">{step.id}</span>
                  </div>
                  {!isLeft && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 h-[3px] w-10 bg-gold rounded-r-full" />
                  )}
                </div>

                {/* Right side — card or spacer */}
                <div className={!isLeft ? "pl-10" : ""}>
                  {!isLeft && (
                    <TiltMini>
                      <div className="bg-card rounded-[28px] border border-border p-7 sm:p-8 text-left flex flex-col gap-3 blue-fog-outline">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-muted text-muted-foreground">
                            {step.phase}
                          </span>
                          <span className="text-xs font-semibold text-gold">{step.tag}</span>
                        </div>
                        <h4 className="text-xl sm:text-2xl font-bold text-navy tracking-tight">{step.title}</h4>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{step.desc}</p>
                        {step.id === "05" && (
                          <a
                            href="https://innovexhub.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                          >
                            <span>Enter InnoveX Hub</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </TiltMini>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── MOBILE LAYOUT (< md) ── */}
      <div
        ref={mobileRef}
        className="relative block md:hidden w-full mt-4 pl-12 sm:pl-16"
      >
        {/* Road — full natural height, clipPath reveals it */}
        {mobileH > 0 && (
          <div
            className="absolute left-2 sm:left-3 top-0 pointer-events-none"
            style={{ width: 16, height: mobileH }}
          >
            <svg
              width={16}
              height={mobileH}
              style={{ display: "block", overflow: "visible", position: "absolute", inset: 0 }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="m-dashes" x={0} y={0} width={16} height={24} patternUnits="userSpaceOnUse">
                  <rect x={6} y={4} width={4} height={12} rx={2} fill="white" />
                </pattern>
                <clipPath id="m-road-clip">
                  <motion.rect x={0} y={0} width={16} height={mobileClipH} />
                </clipPath>
              </defs>

              <g clipPath="url(#m-road-clip)">
                {/* Outer border (dark gold) */}
                <rect x={0} y={0} width={16} height={mobileH} fill="#c28500" />
                {/* Inner track (main gold) */}
                <rect x={2} y={0} width={12} height={mobileH} fill="#f2a900" />
                {/* Center dashes */}
                <rect x={0} y={0} width={16} height={mobileH} fill="url(#m-dashes)" />
              </g>
            </svg>
          </div>
        )}

        {/* Step cards */}
        <div className="flex flex-col space-y-10 sm:space-y-12 py-4">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative z-10"
            >
              {/* Gold node + horizontal connector */}
              <div className="absolute top-7 -left-10 sm:-left-12 flex items-center z-10">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gold border-2 border-amber-300 shadow-[0_0_10px_rgba(242,169,0,0.45)] flex items-center justify-center shrink-0">
                  <span className="text-[0.6rem] font-bold text-white leading-none">{step.id}</span>
                </div>
                <div className="h-[3px] w-5 sm:w-6 bg-gold rounded-r-full" />
              </div>

              {/* Card */}
              <div className="bg-card rounded-[24px] sm:rounded-[28px] border border-border p-6 sm:p-7 blue-fog-outline">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-0.5 rounded-full text-[0.7rem] font-bold tracking-wider uppercase bg-muted text-muted-foreground">
                    {step.phase}
                  </span>
                  <span className="text-[0.7rem] font-medium text-gold">{step.tag}</span>
                </div>
                <h4 className="text-xl font-bold text-navy mb-2 tracking-tight">{step.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed font-normal">{step.desc}</p>
                {step.id === "05" && (
                  <a
                    href="https://innovexhub.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    <span>Enter InnoveX Hub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
