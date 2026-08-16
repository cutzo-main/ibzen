import React, { useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { ExternalLink } from "lucide-react";

function TiltMini({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    el.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "";
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.15s ease" }}
      className="w-full"
    >
      {children}
    </div>
  );
}

const steps = [
  {
    id: "01",
    phase: "Step 01",
    title: "Classroom Outreach",
    desc: "Our student-led team visits school classrooms to introduce the program, spark curiosity, and challenge students to identify real problems.",
    align: "left",
    top: "4%",
    tag: "Outreach",
  },
  {
    id: "02",
    phase: "Step 02",
    title: "Submission & Teams",
    desc: "Students submit ideas. We select top concepts, form balanced 4-member squads, and assign an engineering mentor.",
    align: "right",
    top: "31%",
    tag: "Selection",
  },
  {
    id: "03",
    phase: "Step 03",
    title: "The 2-Day Ideathon",
    desc: "Teams dissect their idea, assess feasibility, and construct a business model on Day 1. On Day 2, they pitch to judges.",
    align: "left",
    top: "60%",
    tag: "Building & Pitch",
  },
  {
    id: "04",
    phase: "Step 04",
    title: "Prizes & Progression",
    desc: "Winning teams gain direct access to InnoveX Hub - our premier engineering lab - taking steps into real-world building.",
    align: "right",
    top: "87%",
    tag: "Incubation",
  },
];

export function Journey() {
  const { ref: headRef, inView: headVisible } = useInView();
  const { ref: sectionRef, inView: sectionVisible } = useInView(0.05);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 80%"],
  });

  const clipPath = useTransform(scrollYProgress, [0, 1], ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]);

  return (
    <section 
      id="journey" 
      ref={sectionRef as React.RefObject<HTMLElement>} 
      className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 relative overflow-hidden"
    >
      <div ref={containerRef} className="w-full h-full relative">
      <div
        ref={headRef as React.RefObject<HTMLDivElement>}
        className={`max-w-2xl mb-12 sm:mb-16 mx-auto text-center reveal ${headVisible ? "is-visible" : ""}`}
      >
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-stone-500 dark:text-stone-400">
          FROM CLASSROOM THOUGHT TO STAGE PITCH
        </p>
        <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-playfair font-normal italic leading-tight tracking-tight text-foreground">
          The <span className="not-italic inline-block">J</span>ourney
        </h2>
      </div>

      {/* DESKTOP CURVED ROPE LAYOUT */}
      <div 
        className="relative hidden md:block w-full h-[1450px] lg:h-[1650px] max-w-5xl mx-auto mt-10"
      >
        {/* SVG Winding Curved Braided Rope */}
        <motion.svg
          style={{ clipPath }}
          className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 ${
            sectionVisible ? "opacity-100" : "opacity-0"
          }`}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="rope-grad-desktop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ECCA99" />
              <stop offset="35%" stopColor="#C99457" />
              <stop offset="70%" stopColor="#AA753C" />
              <stop offset="100%" stopColor="#875628" />
            </linearGradient>
          </defs>

          {/* Base shadow stroke */}
          <path
            d="M 25 0 C 25 18, 75 18, 75 32 C 75 46, 25 46, 25 64 C 25 82, 75 82, 75 100"
            fill="none"
            stroke="#563518"
            strokeWidth="24"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            opacity="0.2"
            style={{ transform: "translate(2px, 6px)" }}
          />

          {/* Main Braided Rope Outer Border */}
          <path
            d="M 25 0 C 25 18, 75 18, 75 32 C 75 46, 25 46, 25 64 C 25 82, 75 82, 75 100"
            fill="none"
            stroke="#6F451F"
            strokeWidth="20"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
          />

          {/* Main Rope Body */}
          <path
            d="M 25 0 C 25 18, 75 18, 75 32 C 75 46, 25 46, 25 64 C 25 82, 75 82, 75 100"
            fill="none"
            stroke="url(#rope-grad-desktop)"
            strokeWidth="15"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
          />

          {/* Rope Fiber Twists (Golden Strands) */}
          <path
            d="M 25 0 C 25 18, 75 18, 75 32 C 75 46, 25 46, 25 64 C 25 82, 75 82, 75 100"
            fill="none"
            stroke="#FBF3DB"
            strokeWidth="7"
            strokeDasharray="6 14"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Secondary Counter Fiber Twist */}
          <path
            d="M 25 0 C 25 18, 75 18, 75 32 C 75 46, 25 46, 25 64 C 25 82, 75 82, 75 100"
            fill="none"
            stroke="#7C4B1E"
            strokeWidth="4"
            strokeDasharray="3 17"
            strokeDashoffset="8"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            opacity="0.7"
          />
        </motion.svg>

        {/* 4 Cards Positioned on desktop curve */}
        {steps.map((step, idx) => (
          <motion.div 
            key={step.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="absolute w-[44%] max-w-[440px] -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ 
              top: step.top, 
              left: step.align === "left" ? "25%" : "75%"
            }}
          >
            <TiltMini>
              <div className="bg-white dark:bg-stone-900 rounded-[28px] border p-7 sm:p-8 relative text-left flex flex-col justify-between group blue-fog-outline">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#F5F2ED] dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                      {step.phase}
                    </span>
                    <span className="text-xs font-semibold text-primary/80">
                      {step.tag}
                    </span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-foreground mb-3 tracking-tight">
                    {step.title}
                  </h4>
                  <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {step.id === "04" && (
                  <a
                    href="https://innovexhub.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    <span>Enter InnoveX Hub</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </TiltMini>

            {/* Hand-crafted Rope Node Wooden Ring Peg Anchor */}
            <div 
              className="absolute left-1/2 top-full w-8 h-20 -translate-x-1/2 z-[-1] flex flex-col items-center"
            >
              {/* Vertical connecting cord */}
              <div className="w-2.5 h-full bg-gradient-to-b from-[#C99457] via-[#A8743A] to-[#6F451F] shadow-sm rounded-full" />
              
              {/* Wooden ring knot */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E6BE90] via-[#B88348] to-[#6E421B] shadow-md border-2 border-amber-200/40 flex items-center justify-center -mt-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[#4A2D13] shadow-inner" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MOBILE & TABLET ELEGANT CURVED ROPE LAYOUT */}
      <div 
        className="relative block md:hidden w-full mt-8 pl-12 sm:pl-16"
      >
        {/* Curved Organic Rope SVG Running Down Left Side */}
        <div className="absolute left-2 sm:left-4 top-0 bottom-0 w-10 sm:w-12 pointer-events-none z-0">
          <motion.svg style={{ clipPath }} className="w-full h-full" viewBox="0 0 40 800" preserveAspectRatio="none">
            <defs>
              <linearGradient id="rope-grad-mobile" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EBCB9B" />
                <stop offset="50%" stopColor="#C89356" />
                <stop offset="100%" stopColor="#855325" />
              </linearGradient>
            </defs>

            {/* Organic Curving Path down mobile timeline */}
            {/* Dark Outline */}
            <path
              d="M 20 0 C 35 100, 5 200, 20 300 C 35 400, 5 500, 20 600 C 35 700, 15 780, 20 800"
              fill="none"
              stroke="#5C3717"
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* Main Rope Body */}
            <path
              d="M 20 0 C 35 100, 5 200, 20 300 C 35 400, 5 500, 20 600 C 35 700, 15 780, 20 800"
              fill="none"
              stroke="url(#rope-grad-mobile)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Twist Fiber Details */}
            <path
              d="M 20 0 C 35 100, 5 200, 20 300 C 35 400, 5 500, 20 600 C 35 700, 15 780, 20 800"
              fill="none"
              stroke="#FFF8E7"
              strokeWidth="5"
              strokeDasharray="5 11"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M 20 0 C 35 100, 5 200, 20 300 C 35 400, 5 500, 20 600 C 35 700, 15 780, 20 800"
              fill="none"
              stroke="#683F19"
              strokeWidth="3"
              strokeDasharray="3 13"
              strokeDashoffset="6"
              strokeLinecap="round"
              opacity="0.6"
            />
          </motion.svg>
        </div>

        {/* Vertical Step Cards */}
        <div className="flex flex-col space-y-10 sm:space-y-12 py-4">
          {steps.map((step, idx) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative z-10"
            >
              {/* Hand-tied Rope Knot & Connecting Wooden Arm */}
              <div className="absolute top-8 -left-10 sm:-left-12 flex items-center z-10">
                {/* Wooden Rope Ring Knot */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#E6BE90] via-[#C58E50] to-[#784A1F] border-2 border-amber-200/50 shadow-md flex items-center justify-center shrink-0">
                  <span className="text-[0.65rem] font-bold text-white leading-none">
                    {step.id}
                  </span>
                </div>
                {/* Horizontal rope connector cord into card */}
                <div className="h-1 sm:h-1.5 w-5 sm:w-6 bg-gradient-to-r from-[#C58E50] to-[#E7D6C1] shadow-sm rounded-r-full" />
              </div>

              {/* Step Card */}
              <div className="bg-white dark:bg-stone-900 rounded-[24px] sm:rounded-[28px] border p-6 sm:p-7 relative blue-fog-outline">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-0.5 rounded-full text-[0.7rem] font-bold tracking-wider uppercase bg-[#F5F2ED] dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                    {step.phase}
                  </span>
                  <span className="text-[0.7rem] font-medium text-stone-400">
                    {step.tag}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2 tracking-tight">
                  {step.title}
                </h4>
                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                  {step.desc}
                </p>

                {step.id === "04" && (
                  <a
                    href="https://innovexhub.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    <span>Enter InnoveX Hub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
