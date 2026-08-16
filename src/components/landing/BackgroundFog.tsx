import { useEffect, useRef } from "react";

export function BackgroundFog() {
  const cursorFogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorFogRef.current) return;
      const x = e.clientX;
      const y = e.clientY + window.scrollY;
      cursorFogRef.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      style={{ minHeight: "100%" }}
    >
      {/* Subtle Cursor Fog Spotlight */}
      <div
        ref={cursorFogRef}
        className="pointer-events-none absolute top-0 left-0 h-[600px] w-[600px] rounded-full transition-transform duration-700 ease-out opacity-30 blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, rgba(58, 111, 216, 0.8) 0%, rgba(58, 111, 216, 0.4) 45%, transparent 70%)",
          willChange: "transform",
        }}
      />

      {/* Hero Soft Glow */}
      <div
        className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[1000px] h-[550px] rounded-full blur-[160px] opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(58, 111, 216, 0.6) 0%, rgba(58, 111, 216, 0.3) 50%, transparent 80%)",
          animation: "fog-pulse 10s ease-in-out infinite alternate",
        }}
      />

      {/* Subtle Floating Orb 1 */}
      <div
        className="absolute top-[12%] left-[-10%] w-[800px] h-[800px] rounded-full blur-[140px] opacity-35"
        style={{
          background:
            "radial-gradient(circle, rgba(58, 111, 216, 0.7) 0%, transparent 70%)",
          animation: "fog-float-1 22s ease-in-out infinite alternate",
        }}
      />

      {/* Subtle Floating Orb 2 */}
      <div
        className="absolute top-[35%] right-[-10%] w-[850px] h-[850px] rounded-full blur-[150px] opacity-35"
        style={{
          background:
            "radial-gradient(circle, rgba(58, 111, 216, 0.7) 0%, transparent 70%)",
          animation: "fog-float-2 26s ease-in-out infinite alternate",
        }}
      />

      {/* Additional Floating Orb 3 */}
      <div
        className="absolute top-[60%] left-[15%] w-[900px] h-[900px] rounded-full blur-[160px] opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(58, 111, 216, 0.6) 0%, transparent 70%)",
          animation: "fog-float-3 20s ease-in-out infinite alternate",
        }}
      />

      {/* Additional Floating Orb 4 */}
      <div
        className="absolute bottom-[-10%] right-[20%] w-[700px] h-[700px] rounded-full blur-[130px] opacity-35"
        style={{
          background:
            "radial-gradient(circle, rgba(58, 111, 216, 0.7) 0%, transparent 70%)",
          animation: "fog-float-1 24s ease-in-out infinite alternate-reverse",
        }}
      />
    </div>
  );
}
