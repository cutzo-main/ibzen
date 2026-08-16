import React, { useRef, useCallback } from "react";
import { useInView } from "@/hooks/useInView";

const values = [
  {
    index: "01",
    label: "Practical Learning",
    copy: "Students build, break and rebuild - theory only lands when hands are involved.",
    icon: "⚙️",
    tag: "Hands-On",
  },
  {
    index: "02",
    label: "Career Awareness",
    copy: "Honest conversations about paths, trade-offs and what the work actually looks like.",
    icon: "🧭",
    tag: "Mentorship",
  },
  {
    index: "03",
    label: "Future-Ready Skills",
    copy: "Critical thinking, money sense and an innovation-first mindset that outlasts syllabi.",
    icon: "🚀",
    tag: "Life Skills",
  },
];

function TiltCard({
  value,
  delay,
}: {
  value: (typeof values)[0];
  delay: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="reveal-child animated-border premium-card group relative flex flex-col p-7 sm:p-8 cursor-default"
      style={{
        transitionDelay: `${delay}ms`,
        transition: "transform 0.15s ease, box-shadow 0.35s ease, border-color 0.35s ease",
      }}
    >
      {/* Ghost watermark index */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-4 select-none text-7xl font-black text-foreground/[0.04] leading-none"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {value.index}
      </span>


      {/* Content */}
      <h3 className="relative z-10 text-lg font-bold tracking-tight text-foreground">
        {value.label}
      </h3>
      <p className="relative z-10 mt-3 text-sm leading-relaxed text-muted-foreground">
        {value.copy}
      </p>

      {/* Bottom accent line */}
      <div className="mt-6 h-px w-0 bg-primary/30 transition-all duration-500 group-hover:w-full rounded-full" />
    </div>
  );
}

export function Mission() {
  const { ref: headerRef, inView: headerVisible } = useInView();
  const { ref: cardsRef, inView: cardsVisible } = useInView(0.08);

  return (
    <section
      id="about"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28"
    >
      <div
        ref={headerRef as React.RefObject<HTMLDivElement>}
        className={`grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20 ${headerVisible ? "reveal-left is-visible" : "reveal-left"}`}
      >
        <div className="min-w-0">
          <p className="text-[0.6rem] font-medium uppercase tracking-[0.5em] text-muted-foreground">
            About Ibzen
          </p>
          <h2 className="mt-6 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.04em] text-foreground">
            Exposure creates confidence.
          </h2>
        </div>

        <div className={`min-w-0 space-y-6 text-base leading-relaxed text-muted-foreground lg:pt-16 ${headerVisible ? "reveal-right is-visible" : "reveal-right"}`}
          style={{ transitionDelay: "120ms" }}
        >
          <p>
            Most students never meet the people doing the work they might one
            day do. Ibzen closes that gap - connecting young learners with
            passionate engineering students and industry-inspired experiences
            long before they have to choose a direction.
          </p>
          <p>
            We exist to inspire the next generation of builders, leaders and
            changemakers by fostering creativity, critical thinking and an
            innovation-first mindset.
          </p>
        </div>
      </div>

      {/* Value cards */}
      <div
        ref={cardsRef as React.RefObject<HTMLDivElement>}
        className={`reveal-group mt-16 grid gap-5 sm:grid-cols-3 ${cardsVisible ? "is-visible" : ""}`}
      >
        {values.map((value, i) => (
          <TiltCard key={value.label} value={value} delay={i * 100} />
        ))}
      </div>
    </section>
  );
}