import { useEffect, useRef } from "react";

function HeroWord({ word, delay }: { word: string; delay: number }) {
  return (
    <span
      className="inline-block"
      style={{
        opacity: 0,
        animation: `word-reveal 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms both`,
      }}
    >
      {word}
    </span>
  );
}

export function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      glowRef.current.style.transform = `translateX(calc(-50% + ${x}px)) translateY(${y}px)`;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const line1Words = ["Innovation", "beyond", "zones,"];
  const line2Words = ["Empowering", "New", "Minds."];

  return (
    <section
      id="top"
      className="relative mx-auto flex max-w-6xl flex-col items-center px-5 pb-12 pt-20 text-center sm:px-8 sm:pb-16 sm:pt-32 overflow-hidden"
    >
      {/* Parallax glow blob */}
      <div
        ref={glowRef}
        aria-hidden
        className="hero-glow pointer-events-none absolute left-1/2 top-0 h-[520px] w-[720px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/8 blur-[140px] transition-transform duration-700 ease-out"
      />

      {/* Floating orb — upper right */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-12 top-16 h-40 w-40 rounded-full bg-primary/6 blur-[70px]"
        style={{ animation: "float 9s ease-in-out infinite" }}
      />

      {/* Floating orb — lower left */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-8 bottom-28 h-28 w-28 rounded-full bg-primary/5 blur-[60px]"
        style={{ animation: "float-reverse 11s ease-in-out infinite 2s" }}
      />

      {/* Floating orb — upper left */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-10 h-16 w-16 rounded-full bg-primary/4 blur-[40px]"
        style={{ animation: "float-slow 13s ease-in-out infinite 1s" }}
      />

      {/* Inspired mixed typography layout */}
      <h1 className="flex flex-col items-center gap-2" style={{ perspective: "600px" }}>
        {/* Top line: Elegant, small, italic serif */}
        <span className="flex flex-wrap justify-center gap-x-[0.25em] gap-y-1 font-['Playfair_Display',serif] italic font-medium text-3xl sm:text-4xl text-muted-foreground/80 tracking-wide lowercase">
          {line1Words.map((w, i) => (
            <HeroWord key={w + i} word={w} delay={220 + i * 80} />
          ))}
        </span>
        {/* Bottom line: Massive, bold sans-serif with tight tracking */}
        <span className="mt-1 flex flex-wrap justify-center gap-x-[0.2em] gap-y-1 text-[clamp(3.5rem,11vw,7.5rem)] font-extrabold font-['Outfit',sans-serif] leading-[0.85] tracking-[-0.04em] text-foreground drop-shadow-sm">
          {line2Words.map((w, i) => (
            <HeroWord key={w + i} word={w} delay={420 + i * 80} />
          ))}
        </span>
      </h1>

      <p className="hero-body mt-8 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
        Connecting school dreamers with engineering mentors. We turn raw ideas
        into real-world solutions through structured ideathons, practical
        problem-solving, and future-ready skills.
      </p>

      <div className="hero-cta mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href="https://wa.me/919164228596"
          target="_blank"
          rel="noopener noreferrer"
          className="shimmer-btn group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-semibold tracking-tight text-primary-foreground shadow-sm transition-all duration-300 hover:scale-[1.05] hover:shadow-lg hover:shadow-primary/20"
        >
          Submit Your Idea
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          >
            →
          </span>
        </a>
        <a
          href="mailto:hello@ibzen.org?subject=Host at Your School"
          className="group inline-flex items-center gap-3 rounded-full border border-border bg-background px-8 py-4 text-sm font-semibold tracking-tight text-foreground transition-all duration-300 hover:bg-card hover:border-primary/25 hover:scale-[1.05] hover:shadow-md"
        >
          Host at Your School
          <span
            aria-hidden
            className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground"
          >
            →
          </span>
        </a>
      </div>

      {/* Nelsio attribution */}
      <a
        href="https://www.nelsio.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hero-cta group mt-16 flex items-center justify-center transition-all duration-300 hover:scale-[1.02]"
        aria-label="From Nelsio"
      >
        <div className="flex items-center gap-3 transition-opacity duration-500">
          <span className="text-[0.7rem] font-bold uppercase tracking-[0.4em] text-foreground/40 group-hover:text-foreground/60 transition-colors">
            FROM
          </span>
          <span className="h-14 w-[1px] bg-border rounded-full"></span>
          <img
            src="/nelsio.png"
            alt="Nelsio"
            className="h-24 w-auto opacity-60 group-hover:opacity-80 transition-opacity"
            style={{ filter: "brightness(0) saturate(0)" }}
          />
        </div>
      </a>

      <div className="hero-rule rule-x mt-16 h-px w-full" />
    </section>
  );
}