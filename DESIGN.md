---
name: radenpioneer.net
description: A personal dev blog and portfolio built as an early-2000s weblog template, played completely straight.
---

<!-- SEED: established with the user before implementation; re-run $impeccable document once there's code to capture the actual tokens and components. -->

# Design System: radenpioneer.net

## Overview

**Creative North Star: "The Template, Played Straight"**

This site is an early Blogger template from 2000–2003, executed as a working system rather than quoted as a joke. Not a pastiche of one, not a nostalgic wink inside a modern layout — the actual grammar: a fixed-width assembly centred on a coloured page, a white content column with a hairline border, a solid header band, a sidebar carrying the site's furniture, dates as group headings, and a byline footer under every entry. The era is the system, not the decoration.

The reason it is not costume is that this particular form already knows how to do the two hardest things this product needs. It has a native vocabulary for **a record that gets corrected without being rewritten** — the appended update block with the original left struck through and visible — which is exactly what a Correction is and exactly what CONTEXT.md forbids collapsing into an edit. And it has a native vocabulary for **being empty**, which is what day one actually is here. Every other visual world would need those two things bolted on; this one supplies them.

The period commitment is total and carries no irony. What is deliberately *not* period is the voice: the copy is the author's own, written now, with no borrowed 2002 idiom. The form is 2002 and the words are current, and that line is what separates this from a museum piece. Rejected outright and confirmed by the user: the startup landing page, the dev-portfolio template with its terminal and typing animation, the placeless Medium-generic blog, and the cold monospace brutalist surface.

**Key Characteristics:**
- Fixed-width assembly on a coloured ground, white reading column, solid header band
- Zero border radius anywhere; 1px hairlines and the browser's own 3D border keywords do all the drawing
- Core web fonts only, no webfont loaded, ever
- Blue links and violet visited links, functional and never restyled away
- Motion is allowed but never decorative: compositor-only, short, reader-driven, and off entirely under `prefers-reduced-motion`
- The furniture stays installed when there is nothing in it

## Colors

A committed strategy: one saturated olive carries the page ground and the header band across roughly 30–45% of the surface, and the reading column stays white so the work is the brightest thing on screen. Dark or light was forced by the scene — a client with six other tabs open in the afternoon, and a peer dev arriving from a link at 1am — and both need the column to read as paper, not as a lit panel.

### Primary
- **Field Olive** (`#A9AE8C`): the page ground the whole assembly floats on. Visible around the column on every screen wide enough; it is the site's colour before any content loads.
- **Band Deep** (`#39402A`): the header band and the footer band. The darkest cut of the same hue, used as a solid field and never as a text colour on light ground.

### Secondary
- **Signal Orange** (`#D2601A`): reserved exclusively for the live and current state — the current nav item, a Portfolio Item at `live`, the newest entry's marker. It is never decorative, never a hover colour, and never used to make something merely important.

### Neutral
- **Column White** (`#FFFFFF`): the reading column. Genuinely white, not a warm paper tint.
- **Ink** (`#1A1A1A`): body and heading text on the column.
- **Rule** (`#C4C4B4`): every 1px hairline, table border, and `<hr>`. Warm grey so it belongs to the olive family rather than sitting on top of it.

### Tertiary
- **Link Blue** (`#2A4B9B`) and **Visited Violet** (`#6B3FA0`): the two-state link system, treated as structure rather than decoration.

### Named Rules
**The Reserved State Rule.** Signal Orange marks live or current and nothing else. If a second thing on the page is orange, one of them is wrong.

**The Visited Link Rule.** `:visited` is styled, always, and visibly differs from unvisited. In an archive whose whole purpose is being returned to, a reader being able to see what they have already read is a feature the era shipped and the present threw away.

**The White Column Rule.** The reading column is `#FFFFFF`. Any impulse to warm it toward cream is the generic warm-paper look reasserting itself; the colour lives on the ground, not under the text.

## Typography

**Display Font:** Fira Sans (with Trebuchet MS, Verdana, sans-serif)
**Body Font:** Gelasio (with Georgia, Times New Roman, serif)
**Label/UI Font:** Fira Sans (with Verdana, Tahoma, sans-serif)

**Character:** The faces of the era, served honestly rather than assumed. This system was built on the core web fonts — Georgia, Verdana, Trebuchet MS — on the stance that in 2002 they were the only faces you could rely on, and that relying on them today costs zero bytes. The second half of that was not true for every reader. Android maps Georgia to Noto Serif and *both* Verdana and Trebuchet MS to Roboto, so display and furniture collapsed into one face and the hierarchy below silently stopped existing; Linux without the Microsoft fonts is the same story. The stance was only ever true on Windows, macOS and iOS.

So the shapes stay and the delivery changes. **Gelasio** is metric-compatible with Georgia — the same face by another name, which means the reader who already has Georgia sees no reflow when it arrives. **Fira Sans** stands in for Trebuchet MS and Verdana together: it was drawn for small-size screen UI, and at the two treatments this system actually uses — 26px letterspaced uppercase in the band, 11px letterspaced in the furniture — the family reads through the treatment rather than over it. One sans covers both roles; the roles stay distinct, and it is size, tracking and case that keep them apart, not two typefaces.

The stance is no longer *zero bytes*. It is *counted bytes* — see the rule below.

### Hierarchy
- **Site title** (display face, letterspaced, in the header band): the site's name, set once at the top.
- **Date group header** (display face, letterspaced, above a day's entries): the date heads a *group*, not an individual post. Blogger grouped a day's writing under one date, and that structure is what makes `/blog/<year>/` from ADR-0005 fall out of the design instead of being bolted onto it.
- **Entry title** (body face, weighted): the title of a Blog Post or Portfolio Item inside the column.
- **Body** (body face, ~15–16px, generous leading, measure held to roughly 65–72 characters): all prose.
- **Furniture** (label/UI face, ~11px): sidebar headings, byline footers, archive lists, catalogue lines, status markers. Small, tight, and the era's true UI size.

### Named Rules
**The Font Budget Rule.** Every face is self-hosted from a package, never fetched from a font service. Latin subset only, `woff2` only. **The total any one page downloads is 100 KB**, and a build that exceeds it goes red. Today's set is 85.0 KB — Gelasio 400, 400 italic and 700, plus Fira Sans 400. The remaining headroom is deliberately too small for the next obvious addition (Gelasio 700 italic, 22 KB), so adding a face or a weight is a decision someone records, never a reflex. Raising the number is allowed and needs a written reason; quietly shipping a second subset is not.

**The Date Owns the Group Rule.** A date heads a set of entries. An entry never carries its own date as a heading.

## Layout

A fixed-width assembly centred on the page: roughly 760px total, a main column of roughly 540px and a sidebar of 180px with a 24px gutter, sitting on Field Olive with a 1px Rule border and a solid band above and below. **The sidebar sits to the right of the main column** — both sides were period-true and the author chose right, so the reading column comes first in source order and in the eye's path, and the furniture reads as secondary. The main column is where content lives; the sidebar is the site's furniture — About blurb, Tag list, archive by year, and the Stack legend.

The header band carries the site title **and the tagline** from Site Settings. On a site with no content the tagline is the only thing on screen that says what this is, which is what earns it the band; the sidebar therefore does not repeat the site description underneath.

The main column's top slot is the newest Portfolio Item, presented as a full-column plate — cover, title, last-updated line, its Stack buttons, its status marker — with the dated Blog Post groups beginning beneath it. **This is the one place the era's form does not supply the answer**: an early Blogger template leads with the newest dated post, and the user's decision is that the work leads instead. The departure is deliberate and recorded here so it does not get "corrected" back later.

Responsive behaviour is the world's second deliberate departure. The era had none. Below the assembly's width the sidebar unstacks beneath the main column and the assembly goes fluid while every internal measure holds. Pretending 2002 had an answer here would be dishonest, and the site has to work on a phone.

### Named Rules
**The Furniture Stays Rule.** The sidebar renders its headings and its rules whether or not it has anything to list. An empty archive is an archive heading with no months under it, not a hidden sidebar.

**The Fixed Assembly Rule.** The content assembly has a real, stated width. It does not stretch to fill a 27-inch display; the olive ground is what fills it.

## Elevation & Depth

No shadows anywhere. Depth comes from two things and nothing else: the white column sitting on the coloured ground with a 1px Rule border, and the browser's own 3D border keywords (`outset`, `inset`, `ridge`) on the era's control surfaces. Both are flat, both are period-true, and both are effectively free.

### Named Rules
**The No Shadow Rule.** `box-shadow` does not appear in this system. A raised or recessed edge is drawn with a border keyword or it is not drawn.

## Shapes

Everything is square. `border-radius` is `0` across the entire system with no exceptions — no rounded buttons, no rounded avatars, no softened corners on images. Rules are 1px. This single invariant is what most separates the world from anything shipping now, and softening it anywhere unravels the whole thing.

Motion belongs here as a form decision rather than a token group. The era's own vocabulary was hover feedback and the visited-state change, and for a while this system kept exactly that and nothing more. It no longer does. Motion is permitted — but under a rule that makes "performant" mean something specific and checkable rather than well-intentioned, and under a line that does not move: content is visible on arrival, and a reader never waits on an animation to read something or click it.

### Named Rules
**The Square Corner Rule.** `border-radius: 0`, everywhere, permanently.

**The Performant Motion Rule.** Motion is allowed, and every animation is implemented the most performant way available.

- **Only `transform` and `opacity` animate.** Both are compositor-only — no layout, no paint. Animating `width`, `height`, `top`, `left`, `margin`, `box-shadow`, or `filter` is out. If an effect cannot be expressed in transform and opacity, it is not shipped.
- **CSS before JavaScript.** A transition or a keyframe animation before a `requestAnimationFrame` loop, always. JavaScript drives motion only when the value is not knowable at author time. Where the platform animates natively — smooth scrolling, `<dialog>`'s top layer — the native path wins over both.
- **Motion never gates content.** Nothing animates on arrival. Content is readable and interactive the moment it renders. This is what rules out entrance animations, scroll reveals, and page transitions, exactly as before — what this rule opens up is motion the reader drives, not motion that happens to them.
- **`prefers-reduced-motion: reduce` turns animation off, not down.** The end state, instantly. Never a slower, shorter, or smaller version of the same movement.
- **Motion is never the only signal.** Every state change is legible in a still screenshot. An animation explains a change; it never carries it.
- **Duration is short.** 200ms is the ceiling. Longer reads as the site thinking rather than the reader moving.

## Do's and Don'ts

### Do:
- **Do** render a Correction as the era does it: the original left visible and struck through, the fix appended as a dated update block. The form enforces the domain rule that a Correction never rewrites the record.
- **Do** render Stack as a row of 88×31 buttons built from the icon authored in the CMS. ADR-0002 requires the icon to be authored content rather than a code lookup, and the era's button row is exactly that shape.
- **Do** read the byline from About and set it as the era's footer line under each entry. ADR-0004 gives Blog Posts no author field, and this form never asks for one.
- **Do** keep the sidebar's Tag list, archive-by-year list, and About blurb installed and visible at all times.
- **Do** hold the reading measure to roughly 65–72 characters in Georgia, regardless of how wide the viewport gets.
- **Do** write day-zero copy in the author's own current voice, in the **first person and direct**: it says plainly that nothing is published yet and what will sit there when something is, and it neither apologises nor performs a stance about the emptiness. "I haven't published anything here yet. When I do, the newest piece of work leads this column." Every piece of era furniture is installed and empty; none of it speaks 2002.

### Don't:
- **Don't** round a corner, add a shadow, or load a webfont. Each one is a load-bearing invariant, not a preference.
- **Don't** let motion gate content. Nothing animates on arrival, which still rules out entrance animations, scroll reveals, and page transitions — see the Performant Motion Rule for what is permitted instead.
- **Don't** restyle `:visited` to match `:link`, or remove link underlines in prose.
- **Don't** spend Signal Orange on anything that is not the live or current state.
- **Don't** borrow 2002 copy idioms — no "under construction", no visitor counter, no "best viewed in". The user chose the era's structure without its voice, and the joke version is the failure mode this whole direction is built to avoid.
- **Don't** warm the reading column toward cream, or let the assembly stretch to fill a wide display.

---

## Unresolved

Three items that stood here have been settled by the author and moved into the sections above: the sidebar sits right, the header band carries the tagline, and day-zero copy is first-person and direct.

- Exact type sizes, leading, and letterspacing were set during implementation and now live in the `@theme` block of `src/layout/global.css`, which is their source of truth until this file is rewritten from the built world.
- How many dated Blog Post groups the homepage shows before it stops. Moot while there are none.
- Components are omitted from this seed on purpose. A base set now exists under `src/components/`; this file records them once `$impeccable document` is re-run against real code.
