import React, { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { ChevronLeft, ChevronRight } from "lucide-react";

const pillars = [
  {
    index: "01",
    indexFormatted: "Pillar 1",
    title: "Technology",
    copy: "A ground-level tour of the tools shaping the decade - from code and AI to the hardware underneath.",
    tags: ["Artificial Intelligence", "Web Engineering", "Hardware & Systems"],
  },
  {
    index: "02",
    indexFormatted: "Pillar 2",
    title: "Engineering",
    copy: "Design thinking, prototyping and the discipline of turning an idea into something that stands up.",
    tags: ["Design Thinking", "3D Prototyping", "Systems Architecture"],
  },
  {
    index: "03",
    indexFormatted: "Pillar 3",
    title: "Financial Literacy",
    copy: "Money, value and decision-making - the skill schools skip and adults wish they had earlier.",
    tags: ["Compounding", "Capital Allocation", "Venture Economics"],
  },
  {
    index: "04",
    indexFormatted: "Pillar 4",
    title: "Problem-Solving",
    copy: "Structured thinking under constraint: break the problem, test the assumption, ship the answer.",
    tags: ["First Principles", "Agile Execution", "Strategic Pitching"],
  },
];

function StudyDeckCard({
  pillar,
}: {
  pillar: (typeof pillars)[0];
}) {
  return (
    <div className="w-full bg-white dark:bg-stone-900 rounded-[28px] sm:rounded-[32px] border p-7 sm:p-9 md:p-11 relative overflow-hidden blue-fog-outline">
      {/* Ghost index watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-6 sm:right-10 top-2 sm:top-4 select-none text-7xl sm:text-8xl md:text-[10rem] font-black text-[#EDE9E1]/80 dark:text-stone-800/40 leading-none tracking-tighter"
      >
        {pillar.index}
      </span>

      <div>
        {/* Top row: Index label */}
        <div className="flex items-center justify-between relative z-10 mb-4 sm:mb-6">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-stone-400 dark:text-stone-500 uppercase">
            {pillar.indexFormatted}
          </span>
        </div>

        {/* Title */}
        <h3 className="relative z-10 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          {pillar.title}
        </h3>

        {/* Copy */}
        <p className="relative z-10 mt-3 sm:mt-4 max-w-2xl text-stone-600 dark:text-stone-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
          {pillar.copy}
        </p>
      </div>


    </div>
  );
}

export function Pillars() {
  const { ref: headRef, inView: headVisible } = useInView();
  const [activeDeckIndex, setActiveDeckIndex] = useState(0);

  const nextDeckCard = () => {
    setActiveDeckIndex((prev) => (prev + 1) % pillars.length);
  };

  const prevDeckCard = () => {
    setActiveDeckIndex((prev) => (prev - 1 + pillars.length) % pillars.length);
  };

  return (
    <section
      id="workshops"
      className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16"
    >
      {/* Top Header Section */}
      <div
        ref={headRef as React.RefObject<HTMLDivElement>}
        className={`reveal ${headVisible ? "is-visible" : ""} flex flex-col items-center justify-center text-center mb-10 sm:mb-14`}
      >
        <div className="max-w-2xl">
          <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-[2.85rem] font-playfair font-normal italic leading-[1.18] tracking-tight text-foreground">
            <span className="font-sans not-italic font-bold text-[0.92em]">4</span> Pillars of Ibzen.
          </h2>
        </div>
      </div>

      {/* STUDY DECK MODE ONLY */}
      <div className="flex flex-col items-center">
        <div className="w-full max-w-3xl">
          <StudyDeckCard pillar={pillars[activeDeckIndex]} />
        </div>

        {/* Deck Controls */}
        <div className="mt-8 flex items-center justify-between w-full max-w-3xl px-2">
          <button
            onClick={prevDeckCard}
            type="button"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-semibold text-foreground shadow-sm hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Deck Progress Dots */}
          <div className="flex items-center gap-2">
            {pillars.map((p, idx) => (
              <button
                key={p.index}
                onClick={() => setActiveDeckIndex(idx)}
                type="button"
                aria-label={`Go to pillar ${p.index}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${activeDeckIndex === idx
                    ? "w-8 bg-primary"
                    : "w-2.5 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400"
                  }`}
              />
            ))}
          </div>

          <button
            onClick={nextDeckCard}
            type="button"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-semibold text-foreground shadow-sm hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <p className="mt-4 text-xs text-stone-400">
          Pillar {activeDeckIndex + 1} of {pillars.length}
        </p>
      </div>
    </section>
  );
}