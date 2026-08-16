import React, { useRef, useCallback } from "react";
import { useInView } from "@/hooks/useInView";

function RippleButton() {
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ripple = document.createElement("span");
    ripple.className = "ripple-wave";
    const size = Math.max(rect.width, rect.height) * 2;
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x - size / 2}px;top:${y - size / 2}px;`;
    btn.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  }, []);

  return (
    <a
      ref={btnRef}
      href="mailto:hello@ibzen.org?subject=Partner With Us"
      onClick={handleClick}
      className="ripple-container shimmer-btn group relative inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/25 overflow-hidden"
    >
      <span className="relative z-10 flex items-center gap-2">
        Partner With Us
        <svg
          className="w-4 h-4 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </span>
    </a>
  );
}

export function SiteFooter({ hideCta = false }: { hideCta?: boolean }) {
  const { ref: ctaRef, inView: ctaVisible } = useInView(0.1);
  const { ref: bottomRef, inView: bottomVisible } = useInView(0.1);

  return (
    <footer className="border-t border-border">
      {/* CTA Banner — hidden on pages that pass hideCta */}
      {!hideCta && (
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div
            ref={ctaRef as React.RefObject<HTMLDivElement>}
            className={`reveal ${ctaVisible ? "is-visible" : ""} relative overflow-hidden rounded-[2rem] bg-foreground px-8 py-16 sm:px-16 sm:py-20 text-center sm:text-left sm:flex sm:items-center sm:justify-between`}
          >
            {/* Dot grid overlay */}
            <div className="dot-grid absolute inset-0 pointer-events-none" />

            {/* Floating orb 1 */}
            <div
              aria-hidden
              className="absolute top-0 right-0 -mr-16 -mt-16 h-72 w-72 rounded-full bg-primary/18 blur-3xl pointer-events-none"
              style={{ animation: "float 9s ease-in-out infinite" }}
            />

            {/* Floating orb 2 */}
            <div
              aria-hidden
              className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-primary/10 blur-2xl pointer-events-none"
              style={{ animation: "float-reverse 12s ease-in-out infinite 1.5s" }}
            />

            <div className="relative z-10 max-w-2xl">
              <h2
                className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl"
                style={{ animation: ctaVisible ? "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s both" : "none" }}
              >
                Ready to bring innovation to your school?
              </h2>
              <p
                className="mt-4 text-lg text-primary-foreground/55 max-w-xl"
                style={{ animation: ctaVisible ? "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) 0.25s both" : "none" }}
              >
                Partner with us to create a future-ready curriculum that empowers your students and transforms your educational environment.
              </p>
            </div>

            <div
              className="relative z-10 mt-10 sm:mt-0 flex-shrink-0"
              style={{ animation: ctaVisible ? "scale-in-spring 0.7s cubic-bezier(0.22,1,0.36,1) 0.4s both" : "none" }}
            >
              <RippleButton />
            </div>
          </div>
        </div>
      )}

      {/* Footer bottom bar */}
      <div
        ref={bottomRef as React.RefObject<HTMLDivElement>}
        className={`reveal ${bottomVisible ? "is-visible" : ""} mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:px-8 border-t border-border`}
      >
        <div className="min-w-0 relative z-10">
          <img
            src="/logo.png"
            alt="Ibzen"
            className="h-36 w-auto -my-12 -ml-6 transition-opacity duration-300 hover:opacity-80"
            style={{ filter: "brightness(0) saturate(0) contrast(1.1)" }}
          />
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground sm:justify-end">
          {[
            { label: "hello@ibzen.org", href: "mailto:hello@ibzen.org" },
            { label: "About", href: "#about" },
            { label: "Curriculum", href: "#workshops" },
            { label: "Process", href: "#journey" },
            { label: "InnoveX Hub", href: "#innovex" },
          ].map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link transition-colors hover:text-foreground"
              style={{ transitionDelay: `${bottomVisible ? i * 50 : 0}ms` }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-10 sm:px-8">
        <p className="border-t border-border pt-6 text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} Ibzen. A student-led initiative.{" "}
          <span className="mx-1.5 opacity-40">·</span>
          Built by{" "}
          <a
            href="https://www.nelsio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-muted-foreground underline underline-offset-2"
          >
            Nelsio
          </a>
        </p>
      </div>
    </footer>
  );
}