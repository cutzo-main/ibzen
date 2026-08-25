import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/landing/SiteNav";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { BackgroundFog } from "@/components/landing/BackgroundFog";
import { AboutIbzen } from "@/components/landing/AboutIbzen";
import { Pillars } from "@/components/landing/Pillars";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Ibzen - Our Mission & Pillars" },
      { name: "description", content: "Learn about Ibzen's mission to prepare the next generation for the AI era and our four core pillars of education." },
    ]
  }),
  component: AboutRoute,
});

function AboutRoute() {
  return (
    <div className="site-canvas min-h-screen">
      <BackgroundFog />
      <SiteNav />
      {/* Spacer: 3px gold bar + 68px nav = 71px */}
      <div style={{ height: "71px" }} aria-hidden />
      <main className="relative z-10 pt-10">
        <AboutIbzen />
        <Pillars />
      </main>
      <SiteFooter />
    </div>
  );
}
