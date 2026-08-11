# The portfolio index is hydrated as demonstration

`/work` renders fewer than a dozen cards whose order and content are both known at build time, so its sort and filter controls fail the rule every other island on this site has to pass: they are not controls that cannot work without a client runtime, they are controls that need not exist at all. They are hydrated anyway, because on a portfolio site a working front-end control is itself evidence of the craft the route is about — the same argument that made `screenshots` evidence rather than decoration. This is a deliberate deviation from the cheaper option, and `conventions.md` now names it as the **second sanctioned reason** for an island, so that the deviation is a rule with a fence around it rather than a lapse someone later has to guess at.

## Considered Options

- **Ticket 05's fixed ordering, with no controls at all.** Recommended twice and rejected twice by the author. It is the cheaper answer, and it is still what the page renders with JavaScript off — the island only ever adds a layer on top of an index that is already complete and correctly ordered without it.
- **A sortable table via TanStack Table**, which is the shape this decision originally arrived in. Rejected on its own terms: for fewer than a dozen rows the library performs about twenty lines of work, and no visitor can tell which library reordered the cards — so it contributes nothing to the single reason the control exists. A table would also strip the cards of their cover, chips and description, which would make `/work` read drier rather than livelier.
- **Justifying the controls as a reader need** — filtering as a way to find work. Rejected as the *justification*, not as the feature. `/search/` already covers finding, across the same two collections and including body text (ticket 09). Leaning on a need that another route already serves would have made the reason unfalsifiable; the controls stand on the demonstration reason alone, and are honest about it.

## Consequences

**`/work` is the only route where the second reason is currently available.** The rule is scoped to routes whose subject is the work being demonstrated, and every use must name what it demonstrates in its `ISLAND:` header. Without that fence the reason degrades into a general licence to hydrate, which is the opposite of what the islands rule is for.

**The server-rendered page has to stay complete on its own.** The demonstration reason grants no relief from the rule that HTML must be meaningful with JavaScript off. Every card ships in the static HTML in ticket 05's fixed order; only the control bar waits for hydration.

**A non-obvious chain runs from this to how images are passed.** Filter options carry live counts, so the island must know each item's `stack` and `status` as data rather than as markup. That closes off donut composition — the cards cannot arrive as a slot — so the wrapper resolves images through `getImage()` and the island renders `card.tsx` directly, exactly as the screenshot strip does.

**A future reader will be tempted to "fix" this.** An island on a page that could plainly be static reads as an oversight. It is not one. If the portfolio ever grows past the point where the controls earn themselves on reader need alone, this ADR stops applying and should be retired rather than quietly re-used.
