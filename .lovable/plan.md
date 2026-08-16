## Ibzen — single-page landing site

Note: this project runs on TanStack Start + React 19 + Tailwind v4 (not Next.js). Same React/Tailwind code, routing via `src/routes/index.tsx` instead of `app/page.tsx`.

### Design direction
- Background: fixed vertical gradient `#050505` → `#0A1128`, plus blurred radial "aura" blobs (pure CSS, no images) for the soft blur look in the reference.
- Typography-first: Inter (loaded via `<link>` in `__root.tsx`, referenced as a `--font-*` token in `src/styles.css`). Heavy weight contrast, tight tracking on display text, wide tracking on eyebrow labels, opacity tiers for hierarchy.
- Zero images anywhere — no `<img>`, no background images. Texture comes from gradient borders, glassmorphism, and glow.

### Sections (all in one route, `/`)
1. **Nav** — sticky, translucent `backdrop-blur` bar. Text logo "ibzen" with the tagline "INNOVATION. FOCUSED." microtype. Links: About, Workshops, Mission (smooth-scroll anchors within the page). Mobile: collapsible menu.
2. **Hero** — massive centered "For the students, by the students." with a subtle white→slate text gradient and glow. Sub-headline on the mission, primary CTA "Join a Workshop" (glowing button) + secondary ghost link.
3. **Mission/About** — asymmetric grid; headline "Exposure creates confidence." with supporting copy and 3 small stat/value cells separated by hairline borders.
4. **Core Pillars** — bento grid of glass cards (Technology, Engineering, Financial Literacy, Problem-Solving, plus Career Guidance / Innovation Mindset as spanning tiles), each with `bg-white/5 backdrop-blur-md`, gradient hairline border, hover lift + glow.
5. **Workshop format** — compact two-day timeline (Day 01 / Day 02) as a bordered list, reinforcing the "two-day immersive" story.
6. **Footer** — contact links, nav repeat, copyright.

### Technical details
- Rewrite `src/routes/index.tsx` as the landing page; extract sections into `src/components/landing/*.tsx` (Nav, Hero, Mission, Pillars, Format, Footer).
- Add design tokens to `src/styles.css`: dark-first palette (background, foreground, primary accent for the CTA/glow), font token, plus `@utility` helpers for the gradient border and text gradient. No hardcoded color classes in components — semantic tokens only.
- Force dark appearance by setting the dark palette on `:root` for this site.
- Mobile-first responsive; `min-w-0` / `shrink-0` grid rules on the nav row; subtle transitions on all interactive elements; `prefers-reduced-motion` respected.
- SEO: route-level `head()` with Ibzen-specific title, description, og/twitter tags; single H1; semantic sections; JSON-LD Organization.
