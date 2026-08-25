import React, { useState, useEffect, useRef, useCallback } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Curriculum", href: "/curriculum" },
  { label: "Ideas", href: "/members" },
];

function NavLink({
  href,
  external,
  children,
  onClick,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 4;
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
      onClick={onClick}
      className="ibzen-nav-link"
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Gold accent top bar ───────────────────────────── */}
      <div className="ibzen-nav-topbar" aria-hidden />

      {/* ── Main nav ─────────────────────────────────────── */}
      <header className={`ibzen-nav${scrolled ? " ibzen-nav--scrolled" : ""}`}>
        <div className="ibzen-nav-inner">

          {/* Logo */}
          <a href="/" className="ibzen-nav-logo group" aria-label="Ibzen Home">
            <img
              src="/logo.png"
              alt="Ibzen"
              className="ibzen-nav-logo-img"
              style={{ filter: "invert(1) brightness(0)" }}
            />
          </a>

          {/* Desktop links — centred */}
          <nav className="ibzen-nav-links" aria-label="Main navigation">
            {links.map((link) => (
              <NavLink key={link.href} href={link.href} external={link.external}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="ibzen-nav-actions">
            <a
              href="https://wa.me/919164228596"
              target="_blank"
              rel="noopener noreferrer"
              className="ibzen-nav-cta shimmer-btn"
              id="nav-apply-cta"
            >
              Join as Member
              <span aria-hidden className="ibzen-nav-cta-arrow">→</span>
            </a>

            {/* Hamburger (mobile only) */}
            <button
              type="button"
              aria-expanded={open}
              aria-label="Toggle navigation"
              onClick={() => setOpen((v) => !v)}
              className={`ibzen-nav-burger${open ? " ibzen-nav-burger--open" : ""}`}
              id="nav-mobile-toggle"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Subtle bottom rule */}
        <div className="ibzen-nav-rule" aria-hidden />
      </header>

      {/* ── Mobile drawer ────────────────────────────────── */}
      <div
        className={`ibzen-mobile-overlay${open ? " ibzen-mobile-overlay--open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <nav
        aria-label="Mobile navigation"
        aria-hidden={!open}
        className={`ibzen-mobile-drawer${open ? " ibzen-mobile-drawer--open" : ""}`}
      >
        {/* Drawer header */}
        <div className="ibzen-mobile-header">
          <img
            src="/logo.png"
            alt="Ibzen"
            className="ibzen-mobile-logo"
            style={{ filter: "invert(1) brightness(0)" }}
          />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="ibzen-mobile-close"
          >
            ✕
          </button>
        </div>

        {/* Drawer links */}
        <div className="ibzen-mobile-links">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              onClick={() => setOpen(false)}
              className="ibzen-mobile-link"
              style={{ transitionDelay: open ? `${i * 55}ms` : "0ms" }}
            >
              <span className="ibzen-mobile-link-num">0{i + 1}</span>
              {link.label}
              {link.external && (
                <span className="ibzen-mobile-link-ext" aria-hidden>↗</span>
              )}
            </a>
          ))}
        </div>

        {/* Drawer CTA */}

      </nav>
    </>
  );
}