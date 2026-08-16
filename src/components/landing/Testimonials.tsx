import React from "react";
import { useInView } from "@/hooks/useInView";

export function Testimonials() {
  const { ref, inView } = useInView();

  return (
    <section
      id="testimonials"
      className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16"
    >
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`reveal ${inView ? "is-visible" : ""} flex flex-col items-center justify-center text-center`}
      >
        <span className="text-sm font-semibold tracking-[0.3em] text-primary uppercase mb-3">
          Student Feedback
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-[2.85rem] font-playfair font-normal italic leading-[1.18] tracking-tight text-foreground mb-10 sm:mb-14">
          What our <span className="font-sans not-italic font-bold">Students</span> say.
        </h2>

        <div className="relative w-full max-w-3xl mx-auto bg-white dark:bg-stone-900 rounded-[24px] sm:rounded-[32px] border p-8 sm:p-12 shadow-sm hover:shadow-xl transition-shadow duration-300">
          <div className="absolute -top-6 -left-2 sm:-left-6 text-6xl text-primary/20 font-serif">
            "
          </div>
          
          <div className="flex flex-col items-center gap-6">
            <div className="flex-1 space-y-4">
              <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed italic">
                “My experience with IBZEN was really inspiring and exciting. IBZEN gave us a wonderful platform to express our ideas confidently in front of judges and other people. The mentors encouraged us to think creatively, improve our ideas, and develop our technical and problem-solving skills.”
              </p>
              <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed italic">
                “This experience helped us gain confidence, learn new things, and understand how we can turn our ideas into meaningful solutions. We believe IBZEN is a great platform for students to showcase their creativity and ideas.”
              </p>
              <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed font-medium">
                Thank you, IBZEN, for giving us this amazing opportunity to express our ideas and improve our skills!
              </p>
            </div>
            
            <div className="flex flex-col items-center mt-6 pt-6 border-t w-full">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4 rounded-full overflow-hidden border-4 border-primary/10">
                <img
                  src="/images/akash.png"
                  alt="Akash"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Akash&background=random';
                  }}
                />
              </div>
              <h4 className="text-lg font-bold text-foreground">Akash</h4>
              <p className="text-sm text-stone-500">10th std, GJC Shiralkoppa</p>
            </div>
          </div>
          
          <div className="absolute -bottom-10 -right-2 sm:-right-6 text-6xl text-primary/20 font-serif rotate-180">
            "
          </div>
        </div>
      </div>
    </section>
  );
}
