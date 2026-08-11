# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three confirmed audiences, all arriving in an **evaluating** posture rather than a browsing one:

- **Prospective clients and partners** — deciding whether this person can be trusted with paid work. They want proof that things got finished.
- **Recruiters and hiring managers** — screening. They reach Work first and want a fast read on what was built and what it was built with.
- **Peer developers and the wider dev community** — following the author and reading for the writing itself. For this audience the blog, not the portfolio, is the front door.

Explicitly **not** a primary audience: the stranger who lands on a single post from a search engine looking for a fix. That visitor is welcome but is not who the site is shaped around — it was offered as an option and not chosen.

## Product Purpose

A personal site that is simultaneously a dev blog and a portfolio, authored in a git-based CMS and published as a static site.

Success is defined as **a tidy personal archive** plus **technical credibility** — not traffic, not subscribers, not conversions, and not job offers as a directly measured outcome.

There is a real tension between the audience and the success measure, and it is deliberate: the site must hold up to people who are evaluating the author, while being judged on whether the record is well kept rather than on what it converts. Future work must not resolve this tension by drifting toward sales-funnel patterns — no lead capture, no growth instrumentation, no persuasion architecture bolted onto an archive.

## Positioning

What a neighboring personal site cannot truthfully copy is the **rigor of the record**:

- A Blog Post is a dated record of a point in time and is never kept current. When it is wrong it receives a **Correction**, which repairs the record without reordering it or pretending the error never happened.
- A Portfolio Item describes a standing state and *is* kept current. It is not a kind of post.

Most personal sites collapse these into one "post" type with a date on it. This one keeps them apart in the schema, the taxonomy, the URLs, and the vocabulary. The decision record itself (`CONTEXT.md` and `docs/adr/`) is part of the same posture.

## Operating Context

- Content is authored through a **Keystatic** admin UI and committed to `main`; a commit triggers a full rebuild and deploy. Creating content is a commit, never a code edit.
- The site is built with Astro and served from **Cloudflare Workers**. The host's trailing-slash behavior is a real constraint on routing, not a preference (see ADR-0005).
- **Drafts** are visible while working locally and absent from the published site.
- The author works alone. There is exactly one author, and the schema assumes it.

## Capabilities and Constraints

The domain vocabulary is authoritative in [`CONTEXT.md`](./CONTEXT.md) and must not be restated or paraphrased elsewhere. Blog Post, Correction, Portfolio Item, Draft, Tag, Stack, Status, Taxonomy, Site Settings, and About are settled terms with settled *Avoid* lists.

Confirmed constraints that future work must preserve:

- **Language is English throughout**, content and UI. `lang="en"` in the base layout is correct as written. Per-entry language was considered and rejected; there is no i18n requirement and no date-format localization work.
- **The site is a shopfront, not an inbound funnel.** No hire CTA and no availability state. Contact is social links and email in the footer and on About.
- **URLs**: `/blog/<year>/<slug>/` and `/work/<slug>/`, every route trailing-slashed. `pubDate` is load-bearing — editing it on a published post silently moves its URL (ADR-0005).
- **Content shape lives in two files by hand** — `keystatic.config.ts` and `src/content.config.ts`. Any change to an entry's shape lands in both, in the same commit (ADR-0001).
- **Stack is authored content, not code.** Adding a technology, including its icon, must never require a code edit (ADR-0002).
- **`cover` is required on both content types and rendered differently** — hero plus card plus OG on a Blog Post; card and OG only on a Portfolio Item, whose page is led by its screenshot carousel (ADR-0003).
- **About is a singleton carrying author identity.** Blog Posts have no `author` field; the byline reads About directly. `bio` is one sentence bounded 50–160 characters doing three jobs (footer, JSON-LD, meta description) (ADR-0004).
- **No Portfolio Item taxonomy is browsable.** Stack and Status are read on the item, never navigated. Tag is browsable and described; Stack is neither.
- **The portfolio index is interactive on purpose, and `/work` is the only place that reason is available.** Its sort-and-filter controls are hydrated because a working control is itself evidence of the craft, not because fewer than a dozen items need them; the index still renders complete and correctly ordered with JavaScript off (ADR-0006).

Not yet built, tracked in `.scratch/dev-blog/issues/`, and therefore not to be assumed present: search, OG image generation, the screenshot carousel, the portfolio index and its controls, and the deploy pipeline. The base component set **is** built and committed — see `docs/agents/conventions.md`, which is written against that real code.

## Brand Commitments

- The name is **radenpioneer**, at `radenpioneer.net`.
- Visitors meet Portfolio Items under the label **Work**. "Portfolio Item" is the internal name and must not surface in the interface.
- Assets on hand are a favicon only (`public/favicon.svg`, `public/favicon.ico`). There is no logo, wordmark, or type commitment.
- **Voice is not established.** It has not been decided and must not be inferred from the ADR prose, which is documentation written for a different purpose.

## Evidence on Hand

**None.** This is a confirmed fact, not a gap to be filled in by guessing:

- No published Blog Posts and no drafts ready to publish.
- No Portfolio Items, no screenshots, no case studies.
- No portrait, no bio, no About prose.
- No testimonials, clients, employers, metrics, press, or endorsements.

The site launches empty. **An empty index is a normal state of this product, not an edge case**, and no future work may fabricate placeholder posts, invented projects, sample clients, fake metrics, or lorem-ipsum-as-content to make a screen look finished. Real emptiness is designed for; it is not papered over.

## Product Principles

1. **The archive outranks the audience.** When keeping a clean record and optimizing for a visitor conflict, the record wins.
2. **Built to be evaluated, not to sell.** Visitors are judging the author. Give them evidence and get out of the way; never add persuasion machinery.
3. **Dated records and current work are different things.** Never let a Blog Post and a Portfolio Item collapse into one shape, one list, or one word.
4. **Authoring must never require a code edit.** Anything the author will plausibly add repeatedly belongs in the CMS.
5. **Empty is a real state.** Every surface must be honest and complete with nothing in it.
