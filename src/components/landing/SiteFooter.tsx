import React, { useRef, useCallback } from "react";
import { useInView } from "@/hooks/useInView";
import { Linkedin, Youtube, Instagram, MessageCircle } from "lucide-react";

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
      href="mailto:hello@ibzen.in?subject=Partner With Us"
      onClick={handleClick}
      className="ripple-container group relative inline-flex items-center justify-center rounded-full bg-gold px-10 py-5 text-base md:text-lg font-bold tracking-wide text-navy shadow-xl shadow-gold/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold/30 hover:bg-light-gold hover:scale-[1.02] active:scale-95 overflow-hidden"
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

  return (
    <footer className="w-full">
      {/* CTA Banner — hidden on pages that pass hideCta */}
      {!hideCta && (
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 border-t border-border">
          <div
            ref={ctaRef as React.RefObject<HTMLDivElement>}
            className={`reveal ${ctaVisible ? "is-visible" : ""} relative overflow-hidden rounded-[2.5rem] bg-navy border border-primary/30 px-8 py-16 sm:px-16 sm:py-24 text-center sm:text-left sm:flex sm:items-center sm:justify-between shadow-2xl`}
          >
            {/* Dot grid overlay */}
            <div className="dot-grid absolute inset-0 pointer-events-none" />

            {/* Floating orb 1 */}
            <div
              aria-hidden
              className="absolute top-0 right-0 -mr-16 -mt-16 h-[400px] w-[400px] rounded-full bg-gold/15 blur-[100px] pointer-events-none"
              style={{ animation: "float 9s ease-in-out infinite" }}
            />

            {/* Floating orb 2 */}
            <div
              aria-hidden
              className="absolute bottom-0 left-1/4 h-[350px] w-[350px] rounded-full bg-primary/40 blur-[90px] pointer-events-none"
              style={{ animation: "float-reverse 12s ease-in-out infinite 1.5s" }}
            />

            <div className="relative z-10 max-w-2xl">
              <h2
                className="text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl font-['Outfit',sans-serif] leading-[1.1]"
                style={{ animation: ctaVisible ? "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s both" : "none" }}
              >
                Ready to bring <span className="text-gold italic font-['Playfair_Display',serif] font-medium block sm:inline mt-2 sm:mt-0">innovation</span> to your school?
              </h2>
              <p
                className="mt-6 text-lg sm:text-xl text-primary-foreground/80 max-w-xl leading-relaxed"
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

      {/* ── MULTI-COLUMN DARK FOOTER ── */}
      <div className="bg-[#12100e] text-white/70 py-16 px-5 sm:px-8 w-full border-t border-[#2a2622]">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 lg:gap-8">
            
            {/* Column 1: Brand */}
            <div className="col-span-2 md:col-span-1">
              <img
                src="/logo.png"
                alt="Ibzen"
                className="h-20 w-auto -ml-3 mb-6 transition-opacity duration-300 hover:opacity-80"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <p className="text-sm leading-relaxed text-white/50 pr-4">
                A student-led initiative preparing the next generation for the AI era.
                Innovation beyond zones, empowering new minds.
              </p>
            </div>

            {/* Column 2: The Initiative */}
            <div className="col-span-1">
              <h4 className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#e67e22] mb-6 border-b border-white/10 pb-4">The Initiative</h4>
              <ul className="space-y-4 text-sm font-medium text-white/70">
                <li><a href="/about" className="hover:text-white transition-colors">Vision & Beliefs</a></li>
                <li><a href="/curriculum" className="hover:text-white transition-colors">Curriculum</a></li>
                <li><a href="mailto:hello@ibzen.in" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Column 3: Get Involved */}
            <div className="col-span-1">
              <h4 className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#e67e22] mb-6 border-b border-white/10 pb-4">Get Involved</h4>
              <ul className="space-y-4 text-sm font-medium text-white/70">
                <li><a href="https://wa.me/919164228596" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Join as Member</a></li>
                <li><a href="/members" className="hover:text-white transition-colors">Meet our Members</a></li>
                <li><a href="#innovex" className="hover:text-white transition-colors">InnoveX Hub</a></li>
              </ul>
            </div>

            {/* Column 4: Handles */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#e67e22] mb-6 border-b border-white/10 pb-4">Ibzen Handles</h4>
              <ul className="space-y-4 text-sm font-medium text-white/70">
                <li>
                  <a href="https://www.linkedin.com/company/ibzen" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4 opacity-70" />
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@Ibzen-z1g" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                    <Youtube className="w-4 h-4 opacity-70" />
                    YouTube
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/ibzen.in?igsi=MXFncmoxZWF1MXYwdA==" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                    <Instagram className="w-4 h-4 opacity-70" />
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://chat.whatsapp.com/EYIFCIZRh507jz3gGSxHAm" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                    <MessageCircle className="w-4 h-4 opacity-70" />
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-[0.65rem] tracking-[0.15em] uppercase text-white/40">
            <p>
              COPYRIGHT {new Date().getFullYear()} IBZEN - ALL RIGHTS RESERVED.
            </p>
            <div className="bg-[#e67e22] text-white px-4 py-1.5 font-bold tracking-[0.2em] text-[0.6rem] rounded-sm">
              STUDENT LED INITIATIVE
            </div>
            <div className="flex gap-4 font-medium">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <span>·</span>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <span>·</span>
              <a href="https://www.nelsio.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Built by Nelsio</a>
            </div>
          </div>
          <div className="text-center mt-8 text-[0.6rem] tracking-[0.1em] text-white/20 uppercase">
            Ibzen is a platform designed to empower students. Innovation beyond zones.
          </div>
        </div>
      </div>
    </footer>
  );
}