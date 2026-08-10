---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: []
---

# Homepage

**Scope:** `/` only. The blog index, the work index, and the entry pages are separate surfaces and inherit this one's world without inheriting its composition.

**Visitor mode:** Experience. The work leads from the first viewport and the interface recedes behind it.

## Audience and job

Three audiences, all evaluating rather than browsing: prospective clients and partners, recruiters, and peer developers. The first two arrive wanting evidence that things got finished; the third arrives for the writing. All three get roughly forty seconds with several other tabs open.

The job the homepage does is to make the shape of the archive legible immediately — that there are two kinds of record here, that the work is current and the writing is dated — and to hand the visitor a way into either one. It does not ask for anything. There is no contact CTA and no availability state on this surface.

## Composition

The main column's top slot is the newest Portfolio Item as a full-column plate: cover, title, last-updated line, its Stack buttons, its status marker. The dated Blog Post groups begin beneath it. The sidebar sits to the right and carries the About blurb, the Tag list, the archive by year, and the Stack legend.

This is a deliberate departure from the chosen world's own habit, which leads with the newest dated post. The user decided the work leads; the departure is recorded in DESIGN.md's Layout section so it does not get reverted as a bug.

## Content and constraints

- **There is no content on day one.** No Portfolio Items, no Blog Posts, no portrait, no bio. Nothing on this surface may be fabricated to fill it — no placeholder projects, no sample posts, no invented metrics.
- The empty homepage is the normal first state, not an error state. Every piece of furniture — sidebar headings, archive list, the top plate — renders installed and empty, and the copy explaining that is first-person and direct, in the author's own current voice with no borrowed period idiom.
- Terminology on screen follows CONTEXT.md: visitors meet Portfolio Items as **Work**. "Portfolio Item" never appears in the interface.
- No Portfolio Item taxonomy is browsable. Stack and Status are read on the plate; only Tag is navigable, from the sidebar.

## Built state

The day-zero composition is built. Both lists are declared empty by construction in the page frontmatter, and both the populated and the empty branch are written against the shape the content collections will return — the build session replaces two declarations with `getCollection()` calls and changes nothing else.

Not built here, and deliberately: the Stack button row (its icons are authored content and none exist), the last-updated line, and the plate's populated branch beyond its `Card` call.

## Memorable moment

The archive with its furniture fully installed and nothing in it — a site that has clearly decided exactly what it is before it has anything to show. The chosen world is the only one considered that has a native answer for this, and the homepage is where that answer is most visible.

## Unresolved

- How many dated Blog Post groups the homepage shows before it stops. Moot while there are none.
- Whether the top plate keeps the `Work` section label once a real Portfolio Item fills it, or whether the plate stands alone.
