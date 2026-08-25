import React, { useState } from "react";

const ITEMS = [
  "Innovation. Focused.",
  "48-Hour Ideathon Sprint",
  "Real-World Problem Solving",
  "Student-Led Initiative",
  "Mentor-Guided Teams",
  "Build. Think. Present.",
  "No Code. Pure Strategy.",
  "InnoveX Hub Partner",
  "Workshops Across Schools",
  "Future Founders Welcome",
];

function buildTrack() {
  return Array.from({ length: 4 }, () => ITEMS).flat();
}

export function MarqueeTicker() {
  const [paused, setPaused] = useState(false);
  const items = buildTrack();

  return (
    <div
      className="ticker-root"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Ibzen highlights ticker"
    >
      <div className="ticker-fade ticker-fade-left" aria-hidden />
      <div className="ticker-fade ticker-fade-right" aria-hidden />

      <div className="ticker-viewport">
        <div className={`ticker-track${paused ? " ticker-track--paused" : ""}`}>
          {items.map((text, i) => (
            <React.Fragment key={i}>
              <span className="ticker-item">{text}</span>
              <span
                aria-hidden
                className="ticker-dot"
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
