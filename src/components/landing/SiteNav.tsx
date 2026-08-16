import React, { useState, useEffect, useRef, useCallback } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Curriculum", href: "/#workshops" },
  { label: "How It Works", href: "/#journey" },
  { label: "Ideas", href: "/members" },
  { label: "InnoveX Hub", href: "https://innovexhub.in", external: true },
];

function MagneticLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "";
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="nav-link text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground"
      style={{ transition: "transform 0.2s ease, color 0.2s ease" }}
    >
      {children}
    </a>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md transition-all duration-500 ${
        scrolled ? "nav-scrolled shadow-sm" : ""
      }`}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-2 sm:px-8">
        <a href="/" className="min-w-0 flex items-center relative z-10 group">
          <img
            src="/logo.png"
            alt="Ibzen"
            className="h-32 w-auto -mt-8 -mb-16 -ml-6 transition-all duration-300 group-hover:scale-[1.04] group-hover:opacity-90"
            style={{ filter: "brightness(0) saturate(0) contrast(1.1)" }}
          />
        </a>

        <nav className="hidden shrink-0 items-center gap-8 md:flex">
          {links.map((link) => (
            <MagneticLink key={link.href} href={link.href} external={link.external}>
              {link.label}
            </MagneticLink>
          ))}
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
          className="shrink-0 rounded-full border border-border px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-all duration-200 hover:text-foreground hover:border-foreground/30 hover:scale-105 active:scale-95 md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile menu */}
      <nav
        aria-hidden={!open}
        className={`overflow-hidden border-border transition-all duration-300 ease-in-out md:hidden ${
          open
            ? "max-h-64 border-t opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-5 pb-5 pt-2">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}
              className={`block py-3 text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground hover:translate-x-1.5 ${
                open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}