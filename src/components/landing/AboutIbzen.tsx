import React, { useRef, useCallback } from "react";
import { useInView } from "@/hooks/useInView";
import { Users } from "lucide-react";

function InteractiveCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -6;
    const rotateY = ((x - cx) / cx) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
    }
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)" }}
      className={className}
    >
      {children}
    </div>
  );
}

export function AboutIbzen() {
  const { ref: headerRef, inView: headerVisible } = useInView(0.1);
  const { ref: visionRef, inView: visionVisible } = useInView(0.1);
  const { ref: closingRef, inView: closingVisible } = useInView(0.1);

  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      {/* Background Decorative Ambient Primary Spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/8 blur-[140px]"
      />

      {/* ── SECTION HEADER ── */}
      <div
        ref={headerRef as React.RefObject<HTMLDivElement>}
        className={`text-center max-w-3xl mx-auto ${headerVisible ? "reveal is-visible" : "reveal"}`}
      >

        <h2 className="text-[clamp(2.2rem,5.5vw,4.2rem)] font-extrabold font-['Outfit',sans-serif] leading-[0.98] tracking-[-0.04em] text-navy">
          <span className="font-['Playfair_Display',serif] italic text-gold pr-2 drop-shadow-sm">Ibzen</span> is preparing the next generation for the AI era.
        </h2>

        <p className="mt-6 text-lg sm:text-xl leading-relaxed text-muted-foreground font-normal text-balance">
          In a world where Artificial Intelligence can instantly provide answers, memorizing facts is no longer the competitive advantage. The true superpower is the ability to think critically, solve meaningful problems, innovate fearlessly, and transform ideas into reality.
        </p>
      </div>

      {/* ── BRAND VISION & PHILOSOPHY GRID ── */}
      <div
        ref={visionRef as React.RefObject<HTMLDivElement>}
        className={`mt-16 grid gap-8 md:grid-cols-2 ${visionVisible ? "reveal-group is-visible" : "reveal-group"}`}
      >
        {/* Card 1: The Shift */}
        <InteractiveCard className="reveal-child premium-card p-8 sm:p-10 flex flex-col justify-between bg-card backdrop-blur-xl border border-border">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                The Core Shift
              </span>
            </div>

            <h3 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-navy leading-snug">
              Traditional education rewards memorization. <br />
              <span className="text-gold">The future rewards imagination.</span>
            </h3>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Every student possesses incredible ideas waiting to be discovered. Our responsibility is to unlock that creativity through practical experiences, innovation challenges, engineering thinking, and real-world problem solving.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border/60 flex items-center justify-between text-sm font-semibold text-navy">
            <span>Creators over consumers.</span>
            <span className="text-navy font-semibold">Builders over followers.</span>
          </div>
        </InteractiveCard>

        {/* Card 2: Our Purpose */}
        <InteractiveCard className="reveal-child premium-card p-8 sm:p-10 flex flex-col justify-between bg-card backdrop-blur-xl border border-border">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Our Mandate
              </span>
            </div>

            <h3 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-navy leading-snug">
              We don&apos;t just teach technology. <br />
              <span className="text-gold">We teach students how to think.</span>
            </h3>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The world doesn&apos;t need more students who only memorize answers. It needs students who ask better questions - problem solvers, inventors, leaders, and future entrepreneurs equipped for a rapidly evolving landscape.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border/60 flex items-center justify-between text-sm font-semibold text-navy">
            <span>Innovators over passive learners.</span>
            <span className="text-navy font-semibold">Mindsets that endure.</span>
          </div>
        </InteractiveCard>
      </div>

    </section>
  );
}
