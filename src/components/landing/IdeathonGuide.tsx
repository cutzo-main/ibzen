import React from "react";
import { useInView } from "@/hooks/useInView";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Lightbulb, Users, Network, Target, Award } from "lucide-react";

export function IdeathonGuide() {
  const { ref: headerRef, inView: headerVisible } = useInView(0.1);
  const { ref: accordionRef, inView: accordionVisible } = useInView(0.1);

  return (
    <section id="ideathon-guide" className="relative mx-auto max-w-4xl px-4 py-12 sm:px-8 sm:py-24">
      {/* Background Decorative Ambient Primary Spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-20 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]"
      />

      {/* ── SECTION HEADER ── */}
      <div
        ref={headerRef as React.RefObject<HTMLDivElement>}
        className={`text-center max-w-3xl mx-auto mb-10 sm:mb-16 px-2 sm:px-0 ${headerVisible ? "reveal is-visible" : "reveal"}`}
      >
        <h2 className="text-3xl sm:text-4xl md:text-[3.5rem] font-extrabold font-['Outfit',sans-serif] leading-[1.2] sm:leading-[1.1] tracking-[-0.04em] text-navy">
          Our Curriculum <br className="hidden sm:block" />
          <span className="font-['Playfair_Display',serif] italic text-navy/90 pr-0 sm:pr-2 block sm:inline text-[1.75rem] sm:text-[inherit] mt-2 sm:mt-0 font-medium">Rules, Regulations & Guidelines</span>
        </h2>

      </div>

      {/* ── ACCORDION ── */}
      <div
        ref={accordionRef as React.RefObject<HTMLDivElement>}
        className={`relative z-10 w-full rounded-[28px] border border-border bg-card/60 backdrop-blur-xl p-4 sm:p-10 shadow-xl ${
          accordionVisible ? "reveal is-visible" : "reveal"
        }`}
      >
        <Accordion type="single" collapsible className="w-full space-y-4">

          {/* STEP 1 */}
          <AccordionItem value="item-1" className="border-border/60 rounded-xl px-1 sm:px-2">
            <AccordionTrigger className="hover:no-underline text-left text-base sm:text-xl font-bold text-navy py-4 data-[state=open]:text-primary transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Lightbulb className="h-5 w-5" />
                </div>
                1. You Submit Your Idea
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-2 pb-6 pl-2 sm:pl-14">
              <p className="mb-4">
                Every participant submits their idea individually before the event begins. This is your first opportunity to put your thinking on paper - what problem does your idea solve, and who does it solve it for?
              </p>
              <p className="mb-4">
                Our mentors then review every submission and evaluate them against three core pillars to decide which ideas move forward to the sprint:
              </p>
              <ul className="space-y-3 mb-4">
                <li className="flex gap-2">
                  <span className="text-gold font-bold">⚬</span>
                  <span><strong>Real-World Impact:</strong> Does it address a clear, everyday problem for a specific group of people?</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold font-bold">⚬</span>
                  <span><strong>Practical Feasibility:</strong> Can it be logically researched, debated, and realistically applied - not just theorised?</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold font-bold">⚬</span>
                  <span><strong>Creative Innovation:</strong> Does it bring a fresh perspective or a unique twist to an existing challenge?</span>
                </li>
              </ul>
              <p className="text-primary/80 font-medium">
                Once the strongest ideas are shortlisted, it's time to build the teams that will bring them to life. →
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* STEP 2 */}
          <AccordionItem value="item-2" className="border-border/60 rounded-xl px-1 sm:px-2">
            <AccordionTrigger className="hover:no-underline text-left text-base sm:text-xl font-bold text-navy py-4 data-[state=open]:text-primary transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Network className="h-5 w-5" />
                </div>
                2. Teams Are Formed Around Selected Ideas
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-2 pb-6 pl-2 sm:pl-14">
              <p className="mb-4">
                The ideas that pass the selection criteria become the foundation of each team. Students whose ideas were selected become the starting point - but not the "owner." Everyone who joins is an equal contributor.
              </p>
              <p className="mb-4">
                Students whose ideas were not selected are randomly assigned to one of the shortlisted teams. This is intentional - at Ibzen, the goal is not to protect your idea, it's to learn how to think, build, and grow collaboratively.
              </p>
              <ul className="space-y-3 mb-4">
                <li className="flex gap-2">
                  <span className="text-gold font-bold">⚬</span>
                  <span><strong>Squad Size:</strong> Every team has a minimum of 2 and a maximum of 4 students - small enough that no one can hide, large enough to cover different perspectives.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold font-bold">⚬</span>
                  <span><strong>No Team Leaders:</strong> There are no assigned roles or hierarchies. Every member has an equal voice in shaping the final concept.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold font-bold">⚬</span>
                  <span><strong>Dedicated Mentor:</strong> From the moment your team is formed, you are assigned exactly one engineering mentor - not shared, not floating. They are yours for the entire 48-hour sprint.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold font-bold">⚬</span>
                  <span><strong>The Mentor's Role:</strong> Your mentor will not give you answers. They ask the right questions to push your thinking, challenge your assumptions, and help you structure a logic that can stand in front of judges.</span>
                </li>
              </ul>
              <p className="text-primary/80 font-medium">
                Now that your team is set and your mentor is by your side, you might wonder - why work on an idea that wasn't yours? →
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* STEP 3 */}
          <AccordionItem value="item-3" className="border-border/60 rounded-xl px-1 sm:px-2">
            <AccordionTrigger className="hover:no-underline text-left text-base sm:text-xl font-bold text-navy py-4 data-[state=open]:text-primary transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Users className="h-5 w-5" />
                </div>
                3. Why You Work on Someone Else's Idea
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-2 pb-6 pl-2 sm:pl-14">
              <p className="mb-4 italic text-navy/80">
                "Why should I spend 48 hours on a project that wasn't originally mine?"
              </p>
              <p className="mb-4">
                Because that's exactly how the real world works. No successful product was ever built by one person alone. At Ibzen, you are not just building an idea - you are learning the skill of turning any idea into a structured, defensible business concept. That skill belongs to you, regardless of where the idea came from.
              </p>
              <p className="mb-4">
                The initial idea is just a starting point. Once your team comes together, you will completely transform it - reframing the problem, challenging the assumptions, and building something none of you could have created individually.
              </p>
              <p className="text-primary/80 font-medium">
                To make the most of the 48 hours, every team follows a set of core guidelines that keep the sprint focused and productive. →
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* STEP 4 */}
          <AccordionItem value="item-4" className="border-border/60 rounded-xl px-1 sm:px-2">
            <AccordionTrigger className="hover:no-underline text-left text-base sm:text-xl font-bold text-navy py-4 data-[state=open]:text-primary transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Target className="h-5 w-5" />
                </div>
                4. The 48-Hour Sprint & Final Pitch
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-2 pb-6 pl-2 sm:pl-14">
              <p className="mb-4">
                The sprint is where everything comes together. Your team has 48 hours to take a raw idea and develop it into a complete, well-reasoned business model ready to be presented to a panel of judges. There is no code. No prototype. Just rigorous thinking, strategic research, and a pitch that proves you understand the problem deeply.
              </p>
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <span className="text-gold font-bold">⚬</span>
                  <span><strong>Think First, Build Later:</strong> Day one is strictly conceptual. The focus is entirely on understanding the customer, validating the business logic, and stress-testing your core assumptions - no physical builds.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold font-bold">⚬</span>
                  <span><strong>Know Your User:</strong> When you present to the judges, you must demonstrate a deep, evidence-backed understanding of the real people your product or service is designed for.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold font-bold">⚬</span>
                  <span><strong>Own Your Limitations:</strong> The strongest teams are the ones who can honestly identify their idea's flaws, acknowledge the competition, and articulate the risks - because that's what real founders do.</span>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* STEP 5 */}
          <AccordionItem value="item-5" className="border-border/60 rounded-xl px-1 sm:px-2 border-b-0">
            <AccordionTrigger className="hover:no-underline text-left text-base sm:text-xl font-bold text-navy py-4 data-[state=open]:text-primary transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Award className="h-5 w-5" />
                </div>
                5. How You Will Be Judged
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-2 pb-6 pl-2 sm:pl-14">
              <p className="mb-4">
                IBZEN is a platform for your ideas to take flight. We understand that this might be your first time developing a solution from scratch, and we want you to focus entirely on innovation. Our judges are not expecting corporate business pitches or flawless public speaking. Instead, they are looking for teams who think critically, collaborate deeply, and are passionate about solving real-world problems.
              </p>
              <p className="mb-4 font-semibold text-navy">
                Here is how your journey will be evaluated across the two days:
              </p>

              <h4 className="font-bold text-primary mt-6 mb-3 text-base">Day 1: Teamwork & The Build Phase (25% of your score)</h4>
              <ul className="space-y-3 mb-6">
                <li className="flex gap-2">
                  <span className="text-gold font-bold">⚬</span>
                  <span><strong>Team Coordination:</strong> How well are the three students working together? We want to see you sharing the work, talking things out, and acting like one united group. A strong team listens to each other's suggestions and makes decisions together.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold font-bold">⚬</span>
                  <span><strong>Student Involvement:</strong> Is every single person participating? We want to see that everyone is actively helping and answering the judges' questions - not just the person who originally brought the idea. (Remember, in your team, everyone is equal!) Judges will notice if someone is left out, so make sure everyone has a clear role in building the project.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold font-bold">⚬</span>
                  <span><strong>Understanding the Problem Statement:</strong> Does the team really know why this problem exists? We want to make sure you fully understand the issue before you start building your solution. A great idea always starts with a deep understanding of who is facing the problem and why it is happening.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold font-bold">⚬</span>
                  <span><strong>Mentor Guidance:</strong> Did you listen to your mentor and try to improve your idea based on their advice? We love to see teams that are open to feedback and willing to adjust their original thoughts to make the final solution stronger.</span>
                </li>
              </ul>

              <h4 className="font-bold text-primary mt-6 mb-3 text-base">Day 2: The Final Presentation (75% of your score)</h4>
              <ul className="space-y-3 mb-4">
                <li className="flex gap-2">
                  <span className="text-gold font-bold">⚬</span>
                  <span><strong>Innovation & The Idea (30%):</strong> How creative is your solution? Did you think differently and build something unique, rather than just copying an idea that already exists? We are looking for fresh thinking that takes a smart, new approach to solving the problem.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold font-bold">⚬</span>
                  <span><strong>Impact (20%):</strong> If this idea comes to life, how much will it help people? We want to see that your solution makes a real, positive difference for the problem you chose. The best solutions are the ones that are practical and can truly change things for the better in the real world.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold font-bold">⚬</span>
                  <span><strong>Answering Judges' Questions (20%):</strong> After your presentation, the judges will ask a few simple questions. Do you really understand your own idea? Can you explain why you made certain choices? This is your chance to confidently show the judges the logic and teamwork behind your project.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold font-bold">⚬</span>
                  <span><strong>Presentation Effort (5%):</strong> This has the lowest marks because we just want to see that you tried your best to share your journey! We are looking at your hard work and passion, not flawless English or perfect slides. If you speak from the heart and believe in your idea, that is all that matters to us.</span>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </section>
  );
}
