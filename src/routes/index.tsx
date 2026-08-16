import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Hero } from "@/components/landing/Hero";
import { Journey } from "@/components/landing/Journey";
import { Pillars } from "@/components/landing/Pillars";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteNav } from "@/components/landing/SiteNav";
import { BackgroundFog } from "@/components/landing/BackgroundFog";

import { AboutIbzen } from "@/components/landing/AboutIbzen";
import { JoinInitiative } from "@/components/landing/JoinInitiative";
import { Members } from "@/components/landing/Members";
import { Testimonials } from "@/components/landing/Testimonials";

const title = "Ibzen - Innovatio beyond zones, empowring new minds..";
const description =
  "Ibzen runs immersive two-day workshops introducing school students to innovation, technology, engineering, financial literacy and career guidance.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Ibzen",
          slogan: "Innovation. Focused.",
          description,
          email: "hello@ibzen.org",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <div className="site-canvas min-h-screen">
        <BackgroundFog />
        <SiteNav />
        <main className="relative z-10">
          <Hero />
          <AboutIbzen />
          <Pillars />
          <Journey />
          <Members />
          <Testimonials />
          <JoinInitiative />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
