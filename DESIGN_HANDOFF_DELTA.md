# Delta: Hero Mockup → Hero Demo Video

Addendum to `DESIGN_HANDOFF.md`. Everything below is a *change*, not a
re-spec — anything not mentioned here (§1–§8 of the original doc) is
unchanged.

---

## 1. New infrastructure (not in original doc)

The original handoff didn't specify a hosting stack. This update adds two
external services sitting outside the Next.js app itself:

| Layer | Service | Role |
|---|---|---|
| Media storage/CDN | **Cloudflare R2** | Serves `hero-demo.mp4` + `hero-poster.jpg` directly. No egress fees, no bandwidth metering. |
| App hosting | **Netlify** | Builds and serves the Next.js app via `@netlify/plugin-nextjs` (auto-installed on import). |

These two are independent of each other — R2 doesn't route through Netlify,
video bytes never touch Netlify's bandwidth allowance. The app just embeds
absolute R2 URLs.

## 2. `components/HeroMockup.tsx`

| | Original spec (§7) | Updated |
|---|---|---|
| Component type | `'static, server component is fine'` | **Client component** (`'use client'`) — required for refs, `IntersectionObserver`, `useState` |
| Content | Static image of the invoices table mockup | `<video>` (autoplay muted, native `controls`) with the same UI-mockup content, now motion + narrated audio |
| Data source | Local image asset | Remote asset — two absolute URLs (`VIDEO_URL`, `POSTER_URL`) pointed at the R2 bucket |
| New behavior | — | Two-stage `IntersectionObserver`: (1) defers fetching the video file until scrolled near, (2) plays/pauses based on actual visibility |
| Motion policy | N/A (was static) | Now also branches on `prefers-reduced-motion` — joins `HeroCanvas`, `FlowDiagram`, `SystemsArcCarousel` as a fourth component with this requirement (§6 of the original doc previously listed three) |

No other component in the tree changes. `Hero.tsx` still renders
`HeroCanvas + copy + HeroMockup` in the same order (§7), and the
`hero-mockup-wrap` / `hero-mockup-video` CSS classes are reused as-is, so
layout and spacing in `Hero.tsx` require no changes.

## 3. Asset pipeline (new)

Not present in the original doc at all — there was no pre-launch asset
processing step because the mockup was a static illustration. Now:

1. Source video (1080p, ~3 min) → compressed via `ffmpeg` (H.264 CRF 26,
   AAC 128k, `+faststart`) → ~15–17MB.
2. Poster frame extracted as a single JPEG from a clean point in the video.
3. Both uploaded to the R2 bucket; component points at their public URLs.

This is a manual step today (done ad hoc per video update) — worth a note
for whoever owns future demo-video refreshes, since there's no CI step
automating it yet.

## 4. Runtime resilience (added after initial swap)

The initial version pointed **both** `POSTER_URL` and `VIDEO_URL` at R2,
which meant the hero's entire visual depended on R2 being reachable at
request time — a regression from the original static-image version, which
had no runtime dependency at all.

Fixed by splitting the two assets by how they should be hosted:

| Asset | Hosted on | Why |
|---|---|---|
| `hero-poster.jpg` (~55KB) | **`/public` in the Next.js repo** | Ships with the Netlify build. Always available whenever the site is — zero runtime dependency. |
| `hero-demo.mp4` (~16MB) | **Cloudflare R2** | Too large to bundle without bloating the repo/build (the original problem this stack was solving). Worth the small external-dependency tradeoff. |

`HeroMockup.tsx` also gained an `onError` handler on the `<video>` element:
if the R2 file fails to load for any reason (outage, 404, network blip),
`videoFailed` flips true and the component permanently renders the local
poster `<img>` for that page view instead — no broken-video icon, no empty
box. Worst case on an R2 outage is "static image instead of video," which
matches the pre-update experience exactly.

**Current source of truth:** `HeroMockup.tsx` (latest version, includes
this fallback) is the canonical component — this doc describes it, but the
file itself is authoritative if the two ever drift.

## 5. Unchanged

- `HeroCanvas` (§3, dot-network + blobs) — untouched.
- Hero copy, layout, section order (§2) — untouched.
- Everything from §4 onward (spotlight sections, feature grid, systems
  carousel, personas, CTA) — untouched.
