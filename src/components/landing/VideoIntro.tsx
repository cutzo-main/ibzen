import { useEffect, useRef, useState } from "react";

interface VideoIntroProps {
  onFinished: () => void;
}

export function VideoIntro({ onFinished }: VideoIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [fading, setFading] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const finishedRef = useRef(false);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setFading(true);
    setTimeout(onFinished, 700);
  };

  useEffect(() => {
    const portrait = window.innerWidth < window.innerHeight;
    setVideoSrc(portrait ? "/intro-mobile.mp4?v=3" : "/intro.mp4?v=3");
  }, []);

  useEffect(() => {
    if (!videoSrc) return;
    const video = videoRef.current;
    if (!video) return;

    video.play().catch((err) => {
      if (err.name !== "AbortError") finish();
    });

    video.addEventListener("ended", finish);
    return () => video.removeEventListener("ended", finish);
  }, [videoSrc]); // eslint-disable-line react-hooks/exhaustive-deps

  const fadeStyle = {
    opacity: fading ? 0 : 1,
    transition: "opacity 0.7s ease",
    pointerEvents: (fading ? "none" : "auto") as React.CSSProperties["pointerEvents"],
  };

  return (
    <>
      {/* Black background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 9998, backgroundColor: "#000", ...fadeStyle }} />

      {/* Video — explicit vw/dvh so objectFit:cover works reliably */}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100dvh",
            objectFit: "cover",
            objectPosition: "center center",
            zIndex: 9999,
            display: "block",
            ...fadeStyle,
          }}
        />
      )}

      {/* Skip */}
      {videoSrc && (
        <button
          onClick={finish}
          aria-label="Skip intro"
          style={{
            position: "fixed",
            bottom: "max(2rem, env(safe-area-inset-bottom, 2rem))",
            right: "max(2rem, env(safe-area-inset-right, 2rem))",
            zIndex: 10000,
            ...fadeStyle,
          }}
          className="rounded-full border border-white/25 bg-black/40 px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-white/70 backdrop-blur-sm transition-colors duration-200 hover:border-white/50 hover:text-white"
        >
          Skip →
        </button>
      )}
    </>
  );
}
