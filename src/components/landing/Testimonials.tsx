import React, { useState, useEffect } from "react";
import { useInView } from "@/hooks/useInView";

const testimonialsData = [
  {
    id: 1,
    name: "Aishwarya",
    details: "10th std, GJC Shiralkoppa",
    image: "/images/aishwarya.png",
    paragraphs: [
      "“Before the IBZEN team visited our school, we had ideas but didn't know where or how to express them. The members gave us the confidence to take the first step and supported us throughout. Their guidance taught us that beyond just having an idea, how we present it and work together as a team is what truly makes an impact.”",
      "“This journey helped us understand the power of teamwork, coordination, and clear communication. Even during the final presentations, the judges and members were extremely supportive and made sure we felt confident on stage.”",
      "Thank you, IBZEN, for providing this platform and encouraging us to share our ideas!"
    ]
  },
  {
    id: 2,
    name: "Akash",
    details: "10th std, GJC Shiralkoppa",
    image: "/images/akash.png",
    paragraphs: [
      "“My experience with IBZEN was really inspiring and exciting. IBZEN gave us a wonderful platform to express our ideas confidently in front of judges and other people. The members encouraged us to think creatively, improve our ideas, and develop our technical and problem-solving skills.”",
      "“This experience helped us gain confidence, learn new things, and understand how we can turn our ideas into meaningful solutions. We believe IBZEN is a great platform for students to showcase their creativity and ideas.”",
      "Thank you, IBZEN, for giving us this amazing opportunity to express our ideas and improve our skills!"
    ]
  }
];

export function Testimonials() {
  const { ref, inView } = useInView();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex((current) => (current + 1) % testimonialsData.length);
        setIsAnimating(false);
      }, 500); // Match transition duration
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonialsData[activeIndex];

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
          
          <div 
            className={`flex flex-col items-center gap-6 transition-opacity duration-500 ease-in-out ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
          >
            <div className="flex-1 space-y-4">
              {currentTestimonial.paragraphs.map((para, idx) => (
                <p 
                  key={idx} 
                  className={`text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed ${idx === currentTestimonial.paragraphs.length - 1 ? 'font-medium' : 'italic'}`}
                >
                  {para}
                </p>
              ))}
            </div>
            
            <div className="flex flex-col items-center mt-6 pt-6 border-t w-full">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4 rounded-full overflow-hidden border-4 border-primary/10">
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${currentTestimonial.name}&background=random`;
                  }}
                />
              </div>
              <h4 className="text-lg font-bold text-foreground">{currentTestimonial.name}</h4>
              <p className="text-sm text-stone-500">{currentTestimonial.details}</p>
            </div>
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (idx !== activeIndex) {
                    setIsAnimating(true);
                    setTimeout(() => {
                      setActiveIndex(idx);
                      setIsAnimating(false);
                    }, 500);
                  }
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? 'bg-primary scale-125' : 'bg-primary/20 hover:bg-primary/50'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
          
          <div className="absolute -bottom-10 -right-2 sm:-right-6 text-6xl text-primary/20 font-serif rotate-180">
            "
          </div>
        </div>
      </div>
    </section>
  );
}
