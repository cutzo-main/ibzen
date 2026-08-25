import React from "react";
import { useInView } from "@/hooks/useInView";
import { Users } from "lucide-react";

export function OurBelief() {
  const { ref: closingRef, inView: closingVisible } = useInView(0.1);

  return (
    <section className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <div
        ref={closingRef as React.RefObject<HTMLDivElement>}
        className={`text-center max-w-4xl mx-auto rounded-[28px] sm:rounded-[36px] border border-border bg-card p-6 sm:p-12 md:p-16 backdrop-blur-2xl shadow-xl relative overflow-hidden ${
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

          <blockquote className="mt-8 font-['Playfair_Display',serif] italic text-2xl sm:text-4xl text-navy font-medium leading-snug">
            &ldquo;Every great startup, every revolutionary invention, every life-changing innovation started as a simple idea in someone&apos;s mind. Those ideas already exist inside today&apos;s students.&rdquo;
          </blockquote>

          <p className="mt-8 text-lg sm:text-xl text-muted-foreground font-normal max-w-2xl mx-auto leading-relaxed">
            The future won&apos;t belong to those who know the most. It will belong to those who can imagine, adapt, create, and build what has never existed before.
          </p>

          <div className="mt-10 inline-flex flex-col items-center text-center gap-3 sm:gap-4">
            <h4 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-navy tracking-tight uppercase max-w-2xl leading-snug">
              At Ibzen, we&apos;re not preparing students for exams.
            </h4>
            <p className="font-['Playfair_Display',serif] text-2xl sm:text-3xl md:text-4xl italic font-medium text-gold tracking-wide">
              We&apos;re preparing them to shape the future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
