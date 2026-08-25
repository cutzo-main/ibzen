import React from "react";
import { useInView } from "@/hooks/useInView";
import { MessageCircle } from "lucide-react";

export function JoinInitiative() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="join" className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-24">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`premium-card p-10 sm:p-16 md:p-20 text-center ${
          inView ? "reveal is-visible" : "reveal"
        }`}
      >
        {/* Dynamic Animated Orbs for Innovation Feel */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-[80px]"
          style={{ animation: "float 10s ease-in-out infinite" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-gold/10 blur-[90px]"
          style={{ animation: "float-reverse 12s ease-in-out infinite" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(18,59,154,0.03)_0,transparent_70%)]"
        />

        <div className="relative z-10 mx-auto max-w-4xl flex flex-col items-center">
          {/* Commanding Typography */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black tracking-[-0.04em] text-navy leading-[1.1] mb-8 font-['Outfit',sans-serif]">
            Join the <span className="text-gold italic font-['Playfair_Display',serif] font-normal block sm:inline mt-2 sm:mt-0">Initiative</span>
          </h2>
          
          <p className="text-xl sm:text-2xl md:text-3xl font-['Playfair_Display',serif] italic font-medium text-muted-foreground mb-12 max-w-3xl mx-auto leading-normal text-balance">
            &ldquo;Are you passionate about empowering the next generation? Join us as a member or volunteer and help shape young minds for the AI era.&rdquo;
          </p>

          {/* Premium Interactive CTA */}
          <a
            href="https://wa.me/" // Note: Add the specific WhatsApp number
            target="_blank"
            rel="noopener noreferrer"
            className="shimmer-btn group inline-flex items-center justify-center rounded-full bg-primary px-10 py-5 text-base md:text-lg font-bold tracking-wide text-primary-foreground shadow-xl shadow-primary/20 hover:bg-primary-hover hover:scale-105 active:scale-95 transition-all duration-300 gap-3"
          >
            <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            <span>Connect on WhatsApp</span>
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5 opacity-80 group-hover:opacity-100">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
