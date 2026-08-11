# Atlas One — Design Handoff

Source prototype: `atlas-one.html` (single-file, vanilla HTML/CSS/JS — treat it as
the visual and behavioral reference, not the target architecture).

This doc exists because a prototype file shows *what* renders but hides *why* —
several constants below were only found by rendering and iterating, not by
reading the code. Preserve them as-is rather than re-deriving them.

---

## 1. Brand & tokens

**Lockup:** "Atlas One" (bold, black) is the primary name; "by Controve" is a
small uppercase attribution beneath it. Never invert this.

**Colors**
| Token | Hex | Use |
|---|---|---|
| `--ink` | `#191919` | primary text, dark surfaces |
| `--muted` | `#787774` | body copy |
| `--muted-2` | `#9b9a97` | captions, labels |
| `--border` | `#e9e9e7` | hairline borders |
| `--bg-soft` | `#f7f6f3` | section backgrounds |
| `--blue` / `--blue-ic` | `#2383e2` | primary accent, links, "signal" cards |
| `--blue-bg` | `#e7f3fb` | pastel tint |
| `--amber-ic` | `#c98a12` | GST/threshold accent |
| `--amber-bg` | `#fbf3db` | pastel tint |
| `--green-ic` | `#3d8a52` | cash-basis / success accent |
| `--green-bg` | `#dbeddb` | pastel tint |
| `--purple-ic` | `#8b5cb0` | CRM/relationship accent |
| `--pink-ic` | `#c1477e` | alerts accent |
| `--orange-ic` | `#d9730d` | documents accent |

Status/traffic-light vocabulary (reused everywhere, keep as one shared
component): red `#e0433d` overdue, amber `#dfab2f` due soon, green `#2f9e58`
on track, plus "complete" (check), "not applicable" (grey `#9b9a97`), "paused"
(two small bars).

**Type**
- Sans: Inter, weights 400/500/600/700/800. Headlines tight tracking
  (`letter-spacing:-.02em`), weight 800.
- Mono: IBM Plex Mono — used only for kickers/eyebrows, timestamps, the
  "SYS / 01" style labels, and small data-like UI chrome. Never for body copy.
- No serif anywhere. This was an earlier direction that was explicitly rejected
  in favor of matching Notion's plain-sans aesthetic — don't reintroduce it.

**Shape/elevation:** 12–18px radii, thin `1px` `#e9e9e7` borders, soft large
shadows only on "floating" elements (product mockups, the arc cards) —
`0 12px 40px -8px rgba(15,15,15,.16)` — never on flat content cards.

---

## 2. Page structure (top to bottom)

1. **Nav** — sticky, blurred-glass on scroll (`backdrop-filter`), logo lockup,
   3 links, "Log in" + black pill CTA.
2. **Hero** — headline over an animated canvas background (§3), no glass
   panel behind the text (this was tried and explicitly removed — text sits
   directly on the animation), floating "product mockup" card below the fold
   showing a fake invoices table with status pills.
3. **Spotlight features** (×3) — full-width, alternating left/right, each with
   a colored icon badge + copy on one side and a small illustrative UI card
   (gauge, comparison, ledger rows) on the other. These carry the three most
   differentiating claims (GST threshold, presumptive vs actual, cash basis).
4. **Secondary feature grid** — denser 3-column icon-card grid for the
   remaining claims, including one wide card with a small animated node
   diagram (§4).
5. **Status legend strip** — the traffic-light vocabulary shown once, explicitly.
6. **Systems section** — the arc-card carousel (§5), replacing what was
   originally a static 5-column grid.
7. **Personas** — 3-column cards.
8. **CTA** — email capture (non-functional placeholder), soft color blobs.
9. **Footer** — 4-column, standard.

Full copy for every section is in the HTML — pull it verbatim, don't
paraphrase; it was written/approved as final copy, not placeholder text.

---

## 3. Hero canvas animation

A 2D-canvas "dot network": ~50–70 particles drifting slowly, connecting
lines drawn between nearby particles (distance-threshold based, `~140px`),
plus 3 large blurred CSS radial-gradient "blob" divs (blue/amber/green)
drifting behind it via CSS keyframes. This is deliberately **not** WebGL/
three.js — it was ported down from a react-three-fiber galaxy prototype
(`drg.jsx`) for simplicity and reliability; a lighter canvas-2D version is
fine and preferred.

Constants worth preserving: dot fill `rgba(35,131,226,0.7–0.8)`, line stroke
scaled by distance falloff, particle count roughly halved on narrow
viewports for performance. Respect `prefers-reduced-motion` — freeze
particle movement (keep static positions) rather than removing the canvas.

---

## 4. "Flows everywhere" node diagram

Small canvas (inside one feature-grid card) drawing 5 labeled nodes (Client →
Invoice → GST Ledger / PL Statement → FY Summary) connected by lines, with a
small colored pulse dot traveling along each edge on a loop, staggered per
edge. Purely decorative, illustrates the "enter once, flows everywhere" claim.
Node positions are defined as fractional `{cx, cy}` coordinates (0–1) so it
scales with its container — reuse that pattern.

---

## 5. Systems section — arc-card carousel (the complex one)

This is a ported, from-scratch rebuild of an attached React/TS reference
component (a physics-based draggable arc/fan card deck). **This is the part
most likely to get flattened into a generic carousel library if you're not
explicit — don't let that happen.** The specific feel (cards fanned along a
circular arc, momentum/spring settle, peel effect near the ends) is the point.

**Geometry** (per "logical" card, `slot = logicalIndex + position`):
```
theta      = (-20 + slot * 10.5) * PI/180
radius     = stageWidth * 1.868
centerX    = -stageWidth * 1.322
centerY    = stageWidth * 0.812
x = centerX + radius * cos(theta)
y = centerY + radius * sin(theta)
```
`position` is a single continuous float driving the whole deck (like a
scroll-position). Cards are rendered as a ring of **19 virtual slots**
(`-7` to `+11`) mapping via modulo onto the actual data array, so dragging
past the "last" card wraps seamlessly — don't reduce this to exactly one
DOM node per data item, you'll lose the infinite-wrap illusion.

**Physics** (spring-to-target after release):
```
delta    = target - value
velocity = (velocity + delta * 0.105) * 0.72
value   += velocity
```
Snaps to `target` when both `|delta|` and `|velocity|` drop below `0.0005`.

**Per-card "motion" (peel/counter-rotate) effect**, driven by a smoothed
`motion` scalar derived from frame-to-frame `value` delta:
```
side            = clamp(|slot-2| / 2.6, 0, 1)
travel          = clamp(motion, -1, 1)
travelStrength  = |travel| * (0.34 + side*0.66)
slipX           = travel * width * 0.009 * side
peelY           = -travelStrength * width * 0.014
counterRotation = travel * (slot<2 ? -1 : 1) * (0.7 + side*1.8)
travelScale     = 1 + travelStrength * 0.012
```
Applied as a **second, nested transform** on an inner wrapper — the outer
element handles arc position/rotation, the inner handles this peel effect.
Don't collapse them into one transform; they're intentionally separable.

**Container sizing — the one real bug we hit:** the geometry constants above
assume the stage's *height* is roughly `1.4–1.6×` its *width* (it was lifted
from a full-viewport-height reference app). If you give it a short/wide
container, cards overflow or crush. Lock this with `aspect-ratio` on the
outer viewport (not an independent height) so it scales correctly at any
size:
```css
.arc-viewport { width: min(88%, 480px); aspect-ratio: 1 / 1.42; overflow: hidden; }
```

**Input — the other real bug:** the reference component drags **vertically**
(`clientY`) with `touch-action: none`. Embedded in a normal scrolling page,
that traps mobile users' scroll gesture inside the component. This build
remaps the drag to **horizontal** (`clientX`) with `touch-action: pan-y`, so
vertical touch-scroll still passes through to the page and only a
left/right swipe manipulates the deck. Keep that remap — don't revert to
vertical drag when porting.

Other interactions to preserve: mouse-wheel over the component nudges the
deck one card per debounced tick (~420ms, `deltaY` threshold `4`); clicking
any visible card recenters it; there's a ~5.3s auto-play intro cycle before
the user's first manual interaction, after which control stays manual for
the rest of the session; `prefers-reduced-motion` should skip the auto-play
and hold at a static centered position, but still allow manual drag/click.

Card content, 5 items (cycling `ink` / `paper` / `signal` themes — dark,
light, blue-fill): title, 2–4 line item list, kicker ("Region I"–"V"), a
large faint background numeral, small "SYS / 0N" label.

---

## 6. Responsive notes

- Nav collapses its center links below `~780px`; keep logo + CTA.
- Bento/feature grids collapse to 2 then 1 column at `900px`/`560px`.
- Arc carousel: narrower `max-width` and slightly shorter `aspect-ratio` under
  `640px` (see CSS above) — verify by rendering, not just resizing a browser
  window, since the geometry is proportional and easy to get subtly wrong.
- Hero canvas particle count is reduced below `720px` for performance.
- All motion respects `prefers-reduced-motion: reduce`.

---

## 7. React / Next.js component breakdown

Target: Next.js (App Router). Suggested structure:

```
app/
  page.tsx                 → assembles all sections in order (§2)
  layout.tsx                → font loading (next/font/google: Inter, IBM Plex Mono)
components/
  Nav.tsx
  Hero.tsx                  → renders HeroCanvas + copy + HeroMockup
  HeroCanvas.tsx             → 'use client' — the dot-network + blobs (§3)
  HeroMockup.tsx             → static, server component is fine
  SpotlightSection.tsx       → one reusable component, props: {reverse, icon,
                               eyebrow, title, body, visual}, used ×3 for the
                               GST threshold / tax paths / cash basis blocks
  FeatureGrid.tsx            → the secondary icon-card grid
  FlowDiagram.tsx            → 'use client' — the node-pulse canvas (§4)
  StatusLegend.tsx
  SystemsArcCarousel.tsx     → 'use client' — see hook below (§5)
  Personas.tsx
  CTA.tsx
  Footer.tsx
hooks/
  useArcCarousel.ts          → all of §5's state (value/target/velocity/
                               position/motion refs), pointer/wheel handlers,
                               the rAF loop. Returns per-card style objects;
                               keep the geometry math in here, not in JSX.
  useHeroCanvas.ts            → the dot-network rAF loop + resize handling.
lib/
  content.ts                  → pull every section's copy into typed data here
                               (feature list, persona quotes, systems/regions
                               array) rather than hardcoding strings in JSX —
                               it's already effectively structured data in
                               the HTML (arrays of cards/features), so this
                               is a near 1:1 lift, not a rewrite.
```

**Next.js-specific gotchas:**
- `HeroCanvas`, `FlowDiagram`, and `SystemsArcCarousel` all touch `window`,
  `devicePixelRatio`, canvas refs, and `requestAnimationFrame` — they must be
  Client Components (`'use client'`) and should guard any `window`/`document`
  access inside `useEffect`, not at module scope, so nothing runs during SSR.
- Load Inter + IBM Plex Mono via `next/font/google`, not the Google Fonts
  `<link>` tags in the prototype — avoids the render-blocking request and the
  layout shift.
- `IntersectionObserver`-based scroll-reveal (used across sections) belongs
  in its own small `useReveal()` hook applied per-section, rather than one
  global `document.querySelectorAll('.reveal')` pass like the prototype does.
- The arc carousel's `ResizeObserver` on the stage element and the canvas
  resize listeners should clean up in the `useEffect` return function —
  the prototype doesn't need to worry about unmount, a React version does.
- Keep `prefers-reduced-motion` checks inside the hooks (read once via
  `matchMedia` in an effect), not as a CSS-only fallback, since the geometry
  itself needs to branch (freeze vs. animate), not just suppress a transition.

## 8. Building for extension (not just a one-time port)

The brief for this rebuild is "more features/sections will get added later" —
so a few structural decisions matter more than they would for a static port:

**Data-driven sections, not hardcoded JSX.** The spotlight features, feature
grid cards, personas, and system regions are already effectively arrays of
objects in the HTML (same shape repeated with different content). Keep them
as typed arrays in `lib/content.ts` and map over them in the components,
so adding a 4th spotlight feature or a 6th system region is "add an object
to an array," not "duplicate a JSX block and edit it":

```ts
// lib/content.ts
export type Feature = { icon: IconKey; eyebrow: string; title: string; body: string; visual: VisualKey };
export const spotlightFeatures: Feature[] = [ /* GST threshold, tax paths, cash basis */ ];
export const gridFeatures: Feature[] = [ /* the remaining 5 */ ];
export const systemRegions: { kicker: string; num: string; title: string; items: string[]; theme: 'ink'|'paper'|'signal' }[] = [ /* the 5 regions */ ];
export const personas: { who: string; title: string; body: string; quote?: string }[] = [ /* 3 personas */ ];
```

**One reusable `SpotlightSection` and `FeatureCard`, not three near-duplicates.**
The prototype already does this in spirit — formalize it as actual components
with props so a new spotlight feature is a data addition, and a visual
redesign of "how spotlights look" is a single-component change, not a
find-and-replace across the file.

**Design tokens as a real source of truth**, not repeated hex strings.
Port §1's token table into `tailwind.config.ts` (`theme.extend.colors`) or
CSS custom properties in `globals.css` — whichever this project already
uses — so new components pull `blue-ic` / `amber-bg` / etc. by name instead
of re-typing hex values, which is where visual drift creeps in as a codebase
grows.

**The arc carousel and hero canvas should accept data/config as props**,
not have their content hardcoded inside the hook. `useArcCarousel(cards)`
should take the card array as an argument — so if "systems" later becomes
6 regions instead of 5, or a completely different card deck is needed
elsewhere on the site, the same hook and component are reusable rather than
forked.

**Keep the section order in `app/page.tsx` as a simple ordered list of
components**, not deeply nested — makes reordering, inserting, or A/B-testing
a new section a one-line change rather than a JSX surgery.

None of this changes what gets built first — it's the same component list in
§7 — it just changes *how* those components take their content, so "add a
feature" later is additive rather than a refactor.

## 9. Prompt for the coding agent

> Rebuild `atlas-one.html` as a Next.js (App Router) + TypeScript app, built
> for ongoing extension — more sections and features will be added after
> this initial build, so follow §8's data-driven patterns (typed content
> arrays, reusable `SpotlightSection`/`FeatureCard` components, tokens
> ported into `tailwind.config.ts` or `globals.css`, hooks that accept data
> as arguments) rather than hardcoding each section's content inline.
> Treat the HTML file as the exact visual and copy reference — match
> spacing, color, and type precisely rather than approximating, and lift
> the copy verbatim into `lib/content.ts` rather than paraphrasing it.
> Read `DESIGN_HANDOFF.md` first, especially §5 (arc carousel) and §3 (hero
> canvas) — those two behaviors are physics/geometry-driven and will look
> subtly wrong if reimplemented from a glance at the DOM rather than the
> documented constants and hooks structure in §7. Use the component and
> hook breakdown in §7 as the target file structure. Mark the three
> canvas/carousel components as Client Components and follow the SSR
> guards noted there. Flag anything that conflicts with our existing
> design system before overriding it.

Hand the agent **both files** — the `.html` for it to inspect/run directly,
and this doc for the "why" it can't get from the code alone.
