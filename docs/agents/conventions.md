# Conventions

How this codebase is written. A build session should be able to follow this end to end without
guessing, and without re-deriving anything from reading the existing components.

Every rule below is marked **Hard** or **Default**.

- **Hard** — do not break it. If it genuinely blocks you, stop and raise it; do not route around it.
- **Default** — break it when you have a stated reason, and write the reason in a comment at the
  point of departure.

This document is the only home for these rules. Do not restate a rule here as a code comment —
see [Comments](#comments).

---

## Directory map

| Path | Holds | Rule |
|---|---|---|
| `src/components/<name>/` | one component, two files | **Hard** |
| `src/layout/` | the layout chain and `global.css` | **Hard** |
| `src/lib/` | pure functions. No Astro globals — a helper that needs `Astro.site` takes it as an argument | **Hard** |
| `src/config/` | values that only take effect after a code edit | **Hard** |
| `src/pages/` | routes. Assembly only — see [Components](#components) | **Hard** |
| `src/assets/` | images, reached through the `@assets/` alias | **Hard** |
| `src/keystatic/` | the Keystatic shim's non-route files | **Hard** |
| `src/content.config.ts` | collection schemas | **Hard** |
| `scripts/` | build-time guards | **Default** |

Files are kebab-case. A component's directory, its two files, and its exported name all carry the
same name (`date-group/date-group.tsx` exports `DateGroup`). **Hard.**

No `index.ts` barrels anywhere. A directory is not a module. **Hard.**

---

## Components

### Components are React

Site components are `.tsx`. **Hard.**

Layouts stay `.astro` — they own `<head>`, the document shell, and the assembly, all Astro-only.

### One directory, two files

```
src/components/<name>/<name>.tsx     the component
src/components/<name>/<name>.astro   the wrapper
```

**Hard.** A wrapper that adds nothing is still written; uniform imports beat the four lines saved.

**Pages and layouts import the `.astro`, never the `.tsx`.** **Hard.**
**A `.tsx` may import another `.tsx` directly.** Both halves are already React, and routing through
the wrapper would re-cross the boundary for nothing (see `site-furniture/site-furniture.tsx`).

### The wrapper translates; the `.tsx` decides

The `.tsx` never knows it is inside Astro. **Hard.**

A wrapper may do exactly three things:

1. **Translate** Astro-only things into plain props and children.
2. **Default** a prop.
3. **Compose** another wrapper, when that composition itself needs something Astro-only —
   `card.astro` builds `<Cover>` because `astro:assets` cannot be reached from a `.tsx` at all.

A wrapper may **not** hold presentation logic or a rendering branch. **Hard.**

> **The test: if a line could live in the `.tsx`, it must live in the `.tsx`.**

| Astro-only thing | What the wrapper does |
|---|---|
| `class` | passes it down as `className` |
| default slot | passes it down as `children` |
| named slot | passes it down as a prop holding rendered markup (`card/card.astro`) |
| `Astro.slots.has(…)` | resolves it to a boolean prop — a slot always arrives renderable, so the React half cannot ask this itself |
| `Astro.url`, `Astro.site`, … | reads the value, passes it as a plain prop |
| `astro:assets` `<Image>` | renders the image, hands it over as children (`cover/cover.astro`) |
| scoped `<style>` | nothing — see [Styling](#styling) |

### Props and types

- The props type is declared **once**, in the `.tsx`, as `<Name>Props`. **Hard.**
- The wrapper imports it and reshapes it with `Omit`, exporting the result as `Props`. It is never
  retyped by hand in both files. **Hard.**
- Every wrapper exports `Props`, even when it is `Record<string, never>`. **Hard.**
- **Text is a prop; rendered markup is a slot.** A caller passes `title="…"` and passes a byline as
  `<Fragment slot="byline">`. **Default** — depart when the text genuinely needs markup inside it.

### Arrow functions

`const Name = (props) => …`, never `function Name(props) {}`. **Hard.**

### Pages assemble, they do not build

A page imports wrappers, fills the main column, and nothing else. Presentation belongs in a
component. **Hard.**

---

## Islands

**Nothing hydrates by default.** A page with no island ships zero JavaScript. **Hard.**

An island is a **decision**, not a convenience. It has to earn itself, and **two** reasons are
sanctioned — only two:

1. **A control that cannot work without a client runtime.**
2. **A component whose existence is itself content** — on this site, a demonstration of the craft the
   route is about. Available **only on routes whose subject is that work** (in practice `/work`), and
   the `ISLAND:` header must name what is being demonstrated. **Not available to make a static
   control feel livelier.** **Hard.** See ADR-0006.

When one is warranted:

- The island is **React**, hydrated with **`client:idle` above the fold** and **`client:visible`
  otherwise**. **Default** — `client:load` needs a stated reason. An above-the-fold island is in the
  viewport already, so `client:visible` there pays for an observer that fires immediately.
- **The `client:*` directive sits on the wrapper, not on the page.** Pages assemble; they do not
  decide runtime. **Hard.**
- Consequence, and it is not a loophole to look for a way around: **a component carrying a directive
  is an island everywhere it is used.** If one shape is needed both static and interactive, that is
  **two components**, not one that is sometimes hydrated.
- The wrapper opens with an `ISLAND:` header — see [Marked exceptions](#marked-exceptions). **Hard**,
  and enforced by a guard.

The server-rendered HTML must still be meaningful with JavaScript off. An island enhances a page; it
never constitutes one. **Hard.**

---

## Styling

- Tailwind utilities on the element that needs them. **Hard.**
- **Design tokens live in one `@theme` block in `src/layout/global.css`.** A component never
  hard-codes a colour, a face, or an assembly measure. **Hard.**
- `class:list` does not exist in a `.tsx`. Use `cx()` from `src/lib/cx.ts`. **Hard.**
- **An Astro scoped `<style>` does not reach the output of a framework component.** Styles that
  would have been scoped go in `global.css` under `@layer components`, keyed off a class the
  component sets (see `.prose-column`). **Hard** — this is a fact about the toolchain, not a taste.
- Type sizes are in `rem` and the root font-size is left alone. Pinning `html { font-size }`
  overrides the reader's own browser setting and, because Tailwind's spacing is rem-based, defeats it
  system-wide. **Hard.**
- Tailwind scans `src/` only, pinned by `source(none)` plus an explicit `@source`. Automatic
  detection otherwise walks `.agents/` and mines class names out of skill scripts. **Hard.**

### Three rules enforced by deletion

`--radius-*`, `--shadow-*` and `--animate-*` are set to `initial` in `@theme`, so `rounded-*`,
`shadow-*` and `animate-*` are not utilities that exist. Breaking DESIGN.md's Square Corner and No
Shadow rules takes a deliberate edit to that block, which is the point.

`--animate-*` stays deleted even though the Still Page Rule that first justified it has been
replaced by the **Performant Motion Rule**. That rule prefers CSS transitions, and `transition-*` /
`duration-*` were never deleted — so everything it permits is already available, and a keyframe
animation remains a deliberate edit rather than a reach.

The lock is not total — Tailwind defines a few of these without a token, and `rounded-full` still
works. Treat it as a lock on the front door, not a wall.

### Responsive

- **Breakpoints belong to the layout. Components are width-agnostic.** A component sizes to its
  container; only `src/layout/` writes `sm:` / `md:`. **Default** — depart with a comment.
- `md` is the assembly break: below it the sidebar unstacks beneath the main column. That is the
  system's one responsive departure from the era (DESIGN.md, Layout). Every internal measure holds
  at every width.

---

## Layouts and the head

Three tiers, and **nesting means the `<head>` accumulates**:

**Base → Common → Type.**

| Layer | Owns |
|---|---|
| **Base** (`base.astro`) | `<html lang>`, charset, viewport, generator, **`<title>`**, **meta description**, `og:site_name`, `og:locale`, RSS `<link>`, sitemap `<link>`, `noindex` when asked |
| **Common** (`layout.astro`) | favicon and icon links, canonical, `og:type`, `og:title`, `og:description`, `og:url`, `og:image`, `og:image:alt`, `twitter:card`, `twitter:creator` — plus the whole visual assembly |
| **Type** (`blog.astro`, `work.astro`, `about.astro`) | only what is unique to the type: `article:*`, JSON-LD `BlogPosting` / `CreativeWork` / `Person` |

**Rules:**

- **A layer never re-emits a tag a layer above already emitted.** **Hard.** This is what makes
  desync impossible and the table above exhaustive rather than illustrative.
- **Never import `base.astro` from a page.** Go through Common or a Type layout. **Hard.**
- **Base handles values it is given; Common handles values it derives.** Base takes `title` as a
  required prop and never reads `Astro.url` — the moment it does, it stops being a skeleton and
  starts knowing where it is. Canonical therefore sits in Common. **Hard.**
- **Routes with no type-specific tags use Common directly** — homepage, `/blog/`, `/work/`, tag
  pages, `/search/`, 404. A pass-through Type layout is an empty layer that reads as if something
  were inside it. Common takes `ogType` and `noindex` as props. **Hard.**
- The full route × tag matrix lives in the SEO contract and is not restated here.

### Headings and landmarks

- **Exactly one `<h1>` per page.** **Hard.** On `/` it is the site title in the header band
  (`titleTag="h1"`); on every other route the band is a `<p>` and the route owns its own `h1`. It is
  passed explicitly, never sniffed from the pathname.
- **The layout owns the landmarks** — `<main>`, `<aside>`, `<header>`, `<footer>`, `<nav>`. A
  component emits one only when it *is* that piece of furniture. `Band` defaults to a plain `div`
  precisely so it is not accidentally landmarked. **Hard.**

### `src/lib/seo.ts`

Holds the `<title>` template and `absoluteUrl()`. Both Base and Common call the template — the call
is duplicated, the rule is not. **Hard.**

---

## Content and images

- **Images are reached through the `@assets/` tsconfig alias.** Writing a `/src/…` path into a
  Keystatic `publicPath` silently breaks MDX body images — green build, dead image in production.
  **Hard**, and enforced by a guard.
- **`<Image>` is only ever written in an `.astro` wrapper.** `astro:assets` cannot be imported into
  a `.tsx`. **Hard.**
- **A component that builds structure around each image takes `getImage()` output, not `<Image>`.**
  `<Image>` yields rendered markup, and a `.tsx` cannot get inside rendered markup to wrap each
  image in its own `<li>` and `<button>`. Passing the images as a slot instead would force the
  wrapper to emit that structure itself, which is presentation logic and forbidden. So the wrapper
  calls `getImage()` per image and passes an array of plain `{ src, srcSet, attributes }` objects
  down; the `.tsx` renders its own `<img>`. That is the wrapper rule's *translate* clause working as
  written — and `<Image>` is still never written in a `.tsx`. **Hard.**
- **Responsive images stay opt-out.** `image.responsiveStyles` is `false` and must stay false while
  Tailwind is the styling layer — Astro's unlayered styles beat Tailwind's layered ones. Components
  therefore pass explicit `widths` and `sizes`; there is no `layout` prop and no inferred sizes to
  fall back on. **Hard.**
- **An image whose displayed size is fixed by the design passes a single rendition instead** — one
  `height` (or `width`) at 2×, and no `widths`/`sizes`. There is nothing for the browser to select
  between, and for a fixed-height, variable-width image such as a screenshot thumbnail, `sizes` is
  unwritable. The intent of the rule above is preserved: nothing falls back on Astro's inference.
  **Hard**, both branches.
- **Loading strategy is spelled `loading`, never a bespoke boolean.** Default `lazy`. `eager` is for
  images genuinely visible in the first viewport, and a page spends it **once** — on a single image,
  or on one contiguous block of images that fill that first viewport together. A second eager image
  elsewhere on the page is the rule broken. Note that an in-viewport `lazy` image is fetched
  immediately regardless; `eager` buys preload-scanner discovery, not the difference between loading
  and not loading. **Hard.**
- **Every `ImageMetadata` used in a meta tag goes through `absoluteUrl()`.** `.src` is a
  root-relative path; `og:image` and JSON-LD `image` both require an absolute URL, and getting it
  wrong produces a page that builds green with blank social previews. **Hard**, and enforced by a
  guard.
- Frontmatter images render via `<Image>`; body images are rewritten automatically by `<Content />`
  and styled by `.prose-column img`. **v1 has no custom MDX components, so a body image has no
  caption mechanism** — alt text is the whole story. Do not invent one.
- **`updatedDate` is fenced to two outputs**: JSON-LD `dateModified` and `article:modified_time`. It
  means *corrected* (`CONTEXT.md`). It must never drive an "Updated" badge, a re-sort, a freshness
  cue on a card, or anything in RSS implying the post was refreshed. **Hard.**

---

## Configuration

`src/config/` is the home for values that only take effect after a code edit — nav, footer, socials
(URL + icon), `lang`, and per-page description constants. Never inlined per page. **Hard.**

Anything the author should be able to change **without** a code edit belongs in the CMS instead
(`CONTEXT.md`, *Site Settings*). **Hard.**

### Load-bearing config

Each of these is a single line whose absence or wrong value breaks something. The comment explaining
why lives at the line itself; this is the index.

| Where | Line | Fails how |
|---|---|---|
| `wrangler.jsonc` | `compatibility_date` ≤ what the installed workerd supports | loudly, every build. Bump only alongside a wrangler upgrade |
| `wrangler.jsonc` | `not_found_handling: "404-page"` | **silently** — 404 ships an empty body. Needs a rebuild to take effect |
| `astro.config.mjs` | `site: 'https://radenpioneer.net'` | **silently** for canonical (`undefined` in the URL); loudly for `@astrojs/sitemap` |
| `astro.config.mjs` | `trailingSlash: 'always'` | **silently** — dev stops matching prod. Cloudflare forces the slash |
| `astro.config.mjs` | `imageService: 'compile'` | **silently** — v14 defaults to the billed runtime service, and content SVG breaks in production |
| `astro.config.mjs` | `image.responsiveStyles: false` | **silently** — Astro's unlayered styles beat Tailwind's |
| `global.css` | `source(none)` + explicit `@source` | **silently** — Tailwind mines class names out of `.agents/` |
| `package.json` | `@keystatic/astro` and `@astrojs/cloudflare` pinned **exactly**, no caret | **silently** — the Keystatic shim reaches into two public sub-exports, and an upstream change desyncs it with no error |

`nodejs_compat` **must not** be added. The runtime needs none, and its absence is what makes
Keystatic's `process.env` reads safe. **Hard.**

---

## Empty, missing, and error

Three different things. Keeping them apart is the whole rule.

### Empty is a shipped state

**Furniture owns its own emptiness, wherever it lives — component or layout.** A `Panel` renders its
heading and its hairline with nothing under it; a `Cover` renders an empty frame; the footer renders
"No contact links yet." That is the Furniture Stays Rule (DESIGN.md, Layout), and it is why
emptiness is handled inside the furniture rather than by a caller deciding not to render it.
**Hard.**

**A content list's emptiness belongs to the page**, because the sentence describes that route.
**Hard.**

> **The test: read the empty sentence aloud. If it still makes sense on any page, it belongs to the
> furniture. If it names what this route is about, it belongs to the page.**

Near-duplicate empty sentences on two index pages are **fine and expected** — they should differ,
because the routes differ. Do not factor them into an `<EmptyList>` component; a component that
takes one sentence and puts it in a `<p>` is a `<p>` with overhead.

Never invent content to fill a frame (PRODUCT.md). Never ship period copy like "under construction"
or "coming soon" (DESIGN.md) — state the fact in the site's own current voice.

### Missing is a bug

**Content that should exist and does not fails the build.** `glob()` cannot enforce that an entry
exists — a missing file is a green build and a blank page — so every singleton read site carries an
`if (!entry) throw`. **Hard.**

Empty is a state the site ships. Missing is a defect. Never render a fallback for missing.

### Error is one route

The only error UI on this site is the 404 page, which is a real route. There is no error boundary,
no fallback component, and nothing hydrated that could throw at runtime. **Hard.**

---

## Comments

### What a comment is for

**A comment records why a decision resists an obvious alternative.** **Hard.**

It does not describe what the code does, and it does **not** restate a rule from this document. A
rule written in two places is a rule that will change in one of them, and the other becomes a lie
that reads as authoritative.

Good: *"do not correct this back — the user decided the work leads."*
Delete on sight: *"wrapper turns `class` into `className`"* — that is this document's job.

### Which syntax

In `.astro`, `<!-- … -->` is **sent to the browser** and costs bytes on every page; `{/* … */}`
disappears at build.

**Use `{/* … */}`. Always, with no exceptions.** **Hard.** An exception that must be remembered is
harder to keep than a rule with none.

### Marked exceptions

Two kinds of file open with a fixed header, so that a deliberate exception can never read as an
oversight — and so a guard can find it.

```
SHIM:   what upstream thing this replaces
        why it had to be replaced
        the upstream link to watch
        the exact condition under which this file gets deleted

ISLAND: what needs a client runtime
        why it cannot work without one
        what makes it worth the bytes
```

`SHIM:` and `ISLAND:` are the two places a comment is allowed to be procedural rather than
explanatory. Writing the reason down is the cost that keeps both rare — a weak reason is visible
once it is a sentence.

---

## The Keystatic shim

The stock `keystatic()` integration is **not used** — it 500s on every API request under
`@astrojs/cloudflare@14` via a dead `locals.runtime.env` call. Four files of our own replace it:

```
src/keystatic/admin-ui.ts
src/pages/keystatic/[...params].astro     prerender = false
src/pages/api/keystatic/[...params].ts    prerender = false
astro.config.mjs                          react() + server.host
```

That is project code standing in for a dependency. Each file opens with a `SHIM:` header pointing at
[PR #1558](https://github.com/Thinkmill/keystatic/pull/1558) — **if it merges and ships, revert to
the stock integration and delete these.**

**The Keystatic admin UI is exempt from every convention in this document.** **Hard.** It is not a
site component: it has no wrapper, it is genuinely hydrated React, and it does not count against the
zero-JavaScript rule. It is a vendored application that happens to live in our `src/`. The guards
skip it, and so should you.

`output` stays unset; only those two routes set `prerender = false`.

---

## Guards

`scripts/check-conventions.mjs`, wired as `prebuild` so it blocks `astro build`. Three checks, all
text search, all covering failures that are **green at build time and wrong in production** — the
class no reviewer catches.

| Check | Asserts |
|---|---|
| **Asset paths** | no `](/src/` anywhere under `src/content/` |
| **Islands** | every `client:` in `src/` sits in a file containing an `ISLAND:` header |
| **Absolute image URLs** | every line mentioning `og:image` or a JSON-LD `"image"` also mentions `absoluteUrl(` |

**The OG card generator is exempt from every convention in this document.** **Hard.** It is not a
site component and cannot be made into one: satori supports no classes, no stylesheet and no
`<style>` tag, so the card is a plain module emitting an HTML string of **inline styles only**, over
a flexbox subset. It therefore has no `.tsx`, no `.astro` wrapper, no Tailwind token, and it writes
literal hex. The one duty that replaces them: **every colour in it is copied from `@theme` and must
not drift from it** — the card is the site's face on someone else's timeline, and a card whose olive
is a shade off is worse than no card. See
[ADR-0009](../adr/0009-og-images-are-generated-outside-the-astro-build.md) for why it lives outside
the build at all.

A fourth check runs as **`postbuild`**, because it measures a build *output* rather than source:

| Check | Asserts |
|---|---|
| **Search index budget** | `dist/search-index.json` is ≤ **60 KB gzipped** (`zlib.gzipSync`) |

The budget is stated in transferred bytes because that is what a visitor pays, and carrying a raw
number alongside it would guarantee someone eventually checks the wrong one. On breach the build
fails naming both numbers; the sanctioned response is migrating to Pagefind. Raising the number is
permitted but is a **recorded decision with a reason**, never a reflex to get a deploy out.
Truncating indexed bodies to fit is ruled out — it makes search lie with nothing going red.

The third check is deliberately shaped that way. Verifying an expression is *actually* absolute means
reading the code, not searching it, and a guard that misses is worse than no guard because people
trust it. So the rule is inverted: **`absoluteUrl()` is the only sanctioned path, and the guard
checks that the path was taken.** Make the mistake impossible rather than detected.

`src/lib/seo.ts` and `src/keystatic/` are exempt.

---

## What this document does not settle

Named so a build session knows these are its discretion, not an omission:

- **The populated homepage** — how many dated groups before it stops, and what the Stack row looks
  like with authored icons. The day-zero composition is built; the full one waits on real content.
- **Pagination** — none in v1. Adding it later is non-breaking.
- **Custom MDX components** — deliberately out of v1. If they are ever opened up, the registration
  and render-time mapping is a fresh decision, not an extension of anything here.
- **`.impeccable/design.json`** — DESIGN.md stays marked SEED until `$impeccable document` runs
  against the built site. That belongs to the execution session, not to planning.
