import React from "react";
import { useInView } from "@/hooks/useInView";
import { MessageCircle } from "lucide-react";

export function JoinInitiative() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="join" className="relative mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-20">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] border border-border bg-card p-8 sm:p-14 text-center shadow-2xl backdrop-blur-3xl ${
          inView ? "reveal is-visible" : "reveal"
        }`}
      >
        {/* Background Decorative */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]"
        />

        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-primary mb-8 border border-primary/20">
            <MessageCircle className="h-4 w-4" />
            Get Involved
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight mb-6">
            Join this <span className="text-primary italic font-['Playfair_Display',serif]">Initiative</span>
          </h2>
          
          <p className="text-xl sm:text-2xl text-muted-foreground font-medium mb-10 max-w-3xl mx-auto leading-relaxed text-balance">
            &ldquo;Are you passionate about empowering the next generation? Join us as a mentor or volunteer and help shape young minds for the AI era.&rdquo;
          </p>

          <a
            href="https://wa.me/" // Note: Add the specific WhatsApp number after the slash, e.g., https://wa.me/1234567890
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base md:text-lg font-bold text-primary-foreground shadow-[0_0_30px_-5px_rgba(var(--primary),0.5)] hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 gap-3"
          >
            <MessageCircle className="h-5 w-5" />
            Connect on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
