import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/landing/SiteNav";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { BackgroundFog } from "@/components/landing/BackgroundFog";
import { IdeathonGuide } from "@/components/landing/IdeathonGuide";

export const Route = createFileRoute("/curriculum")({
  head: () => ({
    meta: [
      { title: "Curriculum - Ibzen Guidelines" },
      { name: "description", content: "Learn about the selection, collaboration, and guidelines for the Ibzen 48-hour sprint." },
    ]
  }),
  component: HowItWorksRoute,
});

function HowItWorksRoute() {
  return (
    <div className="site-canvas min-h-screen">
      <BackgroundFog />
      <SiteNav />
      {/* Spacer: 3px gold bar + 68px nav = 71px */}
      <div style={{ height: "71px" }} aria-hidden />
      <main className="relative z-10 pt-10">
        <IdeathonGuide />
      </main>
      <SiteFooter />
    </div>
  );
}
