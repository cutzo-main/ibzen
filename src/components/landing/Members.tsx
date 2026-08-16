import React from "react";
import { useInView } from "@/hooks/useInView";

// Mentor data
const members = [
  {
    id: 1,
    name: "Anirudh Nag C V",
    academicDetails: "2nd Year CSE Student, Dr. AIT, Bengaluru",
    photoUrl: "/images/anirudh-balaji.png",
  },
  {
    id: 2,
    name: "Charan J",
    academicDetails: "2nd Year ECE Student, UVCE, Bengaluru",
    photoUrl: "/images/charan-j.png",
  },
  {
    id: 3,
    name: "Manjunath HD",
    academicDetails: "2nd Year ETE Student, Dr. AIT, Bengaluru",
    photoUrl: "/images/manjunath-hd.png",
  },
  {
    id: 4,
    name: "Manya S",
    academicDetails: "2nd Year ECE Student, VVCE, Mysore",
    photoUrl: "/images/manya-s.png",
  },
  {
    id: 5,
    name: "Megharaj Banakar",
    academicDetails: "2nd Year ECE Student, UVCE, Bengaluru",
    photoUrl: "/images/megharaj-banakar.png",
  },
  {
    id: 6,
    name: "Poorvi TB",
    academicDetails: "2nd Year CSE Student, Alva's Institute of Technology, Moodbidri",
    photoUrl: "/images/poorvi-tb.jpg",
  },
  {
    id: 7,
    name: "S Y Ganesh",
    academicDetails: "2nd Year ETE Student, Dr. AIT, Bengaluru",
    photoUrl: "/images/sy-ganesh.png",
  },
  {
    id: 8,
    name: "Sanjay SB",
    academicDetails: "2nd Year CS(AI) Student, RVITM, Bengaluru",
    photoUrl: "/images/sanjay-sb.png",
  },
  {
    id: 9,
    name: "Sharad AI",
    academicDetails: "3rd Year CSE Student, JNNCE, Shivamogga",
    photoUrl: "/images/sharad-ai.jpg",
  },
  {
    id: 10,
    name: "Siri M",
    academicDetails: "2nd Year ECE Student, BIT, Bengaluru",
    photoUrl: "/images/siri-m.jpg",
  },
];

export function Members() {
  const { ref: headRef, inView: headVisible } = useInView();

  return (
    <section
      id="members"
      className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16"
    >
      <div
        ref={headRef as React.RefObject<HTMLDivElement>}
        className={`reveal ${headVisible ? "is-visible" : ""} flex flex-col items-center justify-center text-center mb-10 sm:mb-14`}
      >
        <span className="text-sm font-semibold tracking-[0.3em] text-primary uppercase mb-3">
          Our Team
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-[2.85rem] font-playfair font-normal italic leading-[1.18] tracking-tight text-foreground">
          Meet our <span className="font-sans not-italic font-bold">Mentors.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-stone-600 dark:text-stone-300 text-sm sm:text-base md:text-lg">
          The brilliant minds guiding the next generation of innovators.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
        {members.map((member, idx) => (
          <div
            key={member.id}
            className="group w-full bg-white dark:bg-stone-900 rounded-[16px] sm:rounded-[24px] border p-3 sm:p-6 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="w-20 h-20 sm:w-32 sm:h-32 mb-3 sm:mb-5 rounded-full overflow-hidden border-4 sm:border-[6px] border-primary/5 group-hover:border-primary/20 transition-colors">
              <img
                src={member.photoUrl}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-base sm:text-xl font-bold tracking-tight text-foreground mb-1">
              {member.name}
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
              {member.academicDetails}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
