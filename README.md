# radenpioneer.net

A personal site that is both a dev blog and a portfolio. Content is authored in a git-based CMS
and published as a static site on Cloudflare Workers.

Two kinds of record live here and they are kept apart on purpose — in the schema, the taxonomy,
the URLs, and the vocabulary. A **Blog Post** is dated and is never revised to stay true; when it
is wrong it gets a **Correction**. A **Portfolio Item** describes a standing state and *is* kept
current. `CONTEXT.md` is the authority on that language.

## Stack

Astro 7 on Cloudflare Workers via `@astrojs/cloudflare` and `wrangler`. Keystatic for authoring,
committing to `main`. Tailwind 4 for styling. React for components, none of them hydrated.

## Commands

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `astro dev --background` | Start the dev server on `localhost:4321`, detached |
| `astro dev status` / `logs` / `stop` | Manage that server |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Build, then serve the output locally |
| `npm run deploy` | Build and `wrangler deploy` |
| `npm run cf-typegen` | Regenerate `worker-configuration.d.ts` |

## Where things are written down

| File | What it holds |
| :-- | :-- |
| `CONTEXT.md` | The domain language. Settled terms with settled *Avoid* lists. |
| `docs/adr/` | Architectural decisions, one per file, with the reasoning that produced them. |
| `AGENTS.md` | Working conventions, and pointers into `docs/agents/`. |
| `docs/agents/components.md` | How components are written. Read before touching one. |
| `PRODUCT.md` | Durable product truth — audiences, purpose, constraints, principles. |
| `DESIGN.md` | The visual system and its named rules. |

Two constraints worth knowing before changing anything: an entry's shape is written by hand in
both `keystatic.config.ts` and `src/content.config.ts` and the two must move together (ADR-0001),
and editing a published post's `pubDate` silently moves its URL (ADR-0005).

## State

Early. The site builds and deploys, and it has no content yet — no posts, no portfolio items, no
bio. That is the normal first state here, not a gap being papered over: every surface is built to
be honest and complete with nothing in it.
