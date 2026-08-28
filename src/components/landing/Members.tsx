import React from "react";
import { useInView } from "@/hooks/useInView";

const founders = [
  { id: "f1", name: "Mohammed Nadeem", role: "Founder", photoUrl: "/images/mohammed-nadeem.png" },
  { id: "f2", name: "Pavan UG", role: "Founder", photoUrl: "/images/pavan-ug.png" },
];


const coreTeam = [
  { id: 0, name: "Anirudh Nag C V", details: "2nd Year, CSE, Dr. AIT", photoUrl: "/images/anirudh-balaji.png" },
  { id: 1, name: "Charan J", details: "2nd Year, ECE, UVCE", photoUrl: "/images/charan-j.png" },
  { id: 2, name: "Darshan B K", details: "2nd Year, AIML, JNNCE", photoUrl: "/images/darshan.png" },
  { id: 3, name: "Kushal M.Bharadwaj", details: "2nd Year, AI(DS), AIT", photoUrl: "/images/kushal.png" },
  { id: 4, name: "Manjunath HD", details: "2nd Year, ETE, Dr. AIT", photoUrl: "/images/manjunath-hd.png" },
  { id: 5, name: "Manoj H", details: "2nd Year, ECE, EPCET", photoUrl: "/images/manoj.png" },
  { id: 6, name: "Manya S", details: "2nd Year, ECE, VVCE", photoUrl: "/images/manya-s.png" },
  { id: 7, name: "Megharaj Banakar", details: "2nd Year, ECE, UVCE", photoUrl: "/images/megharaj-banakar.png" },
  { id: 8, name: "Mohammed Ayan KK", details: "2nd Year, CS(DS), GMU", photoUrl: "/images/mohammed-ayan.png" },
  { id: 9, name: "Mohith S", role: "Chief of Members", details: "2nd Year, EEE, Dr. AIT", photoUrl: "/images/mohith-s.jpg" },
  { id: 10, name: "Poorvi TB", details: "2nd Year, CSE, Alva's IT", photoUrl: "/images/poorvi-tb.jpg" },
  { id: 11, name: "Prajwal Biradar", details: "2nd Year, ETE, Dr. AIT", photoUrl: "/images/prajwal-biradar.png" },
  { id: 12, name: "S Y Ganesh", details: "2nd Year, ETE, Dr. AIT", photoUrl: "/images/sy-ganesh.png" },
  { id: 13, name: "Sanjay SB", details: "2nd Year, CS(AI), RVITM", photoUrl: "/images/sanjay-sb.png" },
  { id: 14, name: "Sharad AI", details: "3rd Year, CSE, JNNCE", photoUrl: "/images/sharad-ai.jpg" },
  { id: 15, name: "Shushanth S", details: "2nd Year, CSE, KLE BVB", photoUrl: "/images/shushanth.png" },
  { id: 16, name: "Siri M", details: "2nd Year, ECE, BIT", photoUrl: "/images/siri-m.jpg" },
];

function Avatar({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-2 ring-primary/20 hover:ring-primary/50 transition-all duration-300 flex-shrink-0 bg-stone-100 dark:bg-stone-800">
      <img src={src} alt={alt} className="w-full h-full object-cover object-top" />
    </div>
  );
}

export function Members() {
  const { ref, inView } = useInView();

  return (
    <section id="members" className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">

      {/* Header */}
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`reveal ${inView ? "is-visible" : ""} text-center mb-10`}
      >
        <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">Our Team</span>
        <h2 className="mt-2 text-3xl sm:text-4xl font-playfair italic font-normal text-foreground">
          Meet our <span className="font-sans not-italic font-bold">Members.</span>
        </h2>
      </div>

      {/* ── Founders ── */}
      <div className="mb-8">
        <p className="text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase text-center mb-5">Founders</p>
        <div className="flex justify-center gap-8 sm:gap-16">
          {founders.map((f) => (
            <div key={f.id} className="flex flex-col items-center gap-3 group">
              <Avatar src={f.photoUrl} alt={f.name} />
              <div className="text-center">
                <p className="font-bold text-foreground text-sm sm:text-base">{f.name}</p>
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mt-0.5">{f.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}


      {/* ── Core Team ── */}
      <div>
        <p className="text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase text-center mb-6">Core Team</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-4 gap-y-7">
          {coreTeam.map((m) => (
            <div key={m.id} className="flex flex-col items-center gap-2 group">
              <Avatar src={m.photoUrl} alt={m.name} />
              <div className="text-center">
                <p className="font-semibold text-foreground text-xs leading-tight">{m.name}</p>
                {m.role && (
                  <p className="text-[0.6rem] font-bold text-primary uppercase tracking-wider mt-0.5 leading-tight">{m.role}</p>
                )}
                <p className="text-[0.65rem] text-stone-500 dark:text-stone-400 mt-0.5 leading-tight">{m.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
