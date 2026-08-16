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

        <h2 className="text-[clamp(2.2rem,5.5vw,4.2rem)] font-extrabold font-['Outfit',sans-serif] leading-[0.98] tracking-[-0.04em] text-foreground">
          <span className="font-['Playfair_Display',serif] italic bg-gradient-to-br from-primary via-primary/80 to-primary/40 bg-clip-text text-transparent pr-2 drop-shadow-sm">Ibzen</span> is preparing the next generation for the AI era.
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

            <h3 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-snug">
              Traditional education rewards memorization. <br />
              <span className="text-foreground">The future rewards imagination.</span>
            </h3>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Every student possesses incredible ideas waiting to be discovered. Our responsibility is to unlock that creativity through practical experiences, innovation challenges, engineering thinking, and real-world problem solving.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border/60 flex items-center justify-between text-sm font-semibold text-foreground">
            <span>Creators over consumers.</span>
            <span className="text-foreground font-semibold">Builders over followers.</span>
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

            <h3 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-snug">
              We don&apos;t just teach technology. <br />
              <span className="text-foreground">We teach students how to think.</span>
            </h3>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The world doesn&apos;t need more students who only memorize answers. It needs students who ask better questions - problem solvers, inventors, leaders, and future entrepreneurs equipped for a rapidly evolving landscape.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border/60 flex items-center justify-between text-sm font-semibold text-foreground">
            <span>Innovators over passive learners.</span>
            <span className="text-foreground font-semibold">Mindsets that endure.</span>
          </div>
        </InteractiveCard>
      </div>

      {/* ── CLOSING STATEMENT & CORE BELIEF ── */}
      <div
        ref={closingRef as React.RefObject<HTMLDivElement>}
        className={`mt-24 text-center max-w-4xl mx-auto rounded-[28px] sm:rounded-[36px] border border-border bg-card p-6 sm:p-12 md:p-16 backdrop-blur-2xl shadow-xl relative overflow-hidden ${
          closingVisible ? "reveal is-visible" : "reveal"
        }`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[130px]"
        />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            Our Belief
          </div>

          <blockquote className="mt-8 font-['Playfair_Display',serif] italic text-2xl sm:text-4xl text-foreground font-medium leading-snug">
            &ldquo;Every great startup, every revolutionary invention, every life-changing innovation started as a simple idea in someone&apos;s mind. Those ideas already exist inside today&apos;s students.&rdquo;
          </blockquote>

          <p className="mt-8 text-lg sm:text-xl text-muted-foreground font-normal max-w-2xl mx-auto leading-relaxed">
            The future won&apos;t belong to those who know the most. It will belong to those who can imagine, adapt, create, and build what has never existed before.
          </p>

          <div className="mt-10 inline-flex flex-col items-center text-center gap-3 sm:gap-4">
            <h4 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground tracking-tight uppercase max-w-2xl leading-snug">
              At Ibzen, we&apos;re not preparing students for exams.
            </h4>
            <p className="font-['Playfair_Display',serif] text-2xl sm:text-3xl md:text-4xl italic font-medium text-foreground tracking-wide">
              We&apos;re preparing them to shape the future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
