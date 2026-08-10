# Stack is a collection, not an enum

Stack carries only a display name and an icon, and it has no browsable routes — so an enum in the two content schemas would model it perfectly well, at no cost. It is a collection anyway, for one reason: **introducing a new technology must not require editing the codebase.** As an enum, adding one means a code change in two files (see ADR-0001) and a pull request; as a collection it is an entry created in the admin UI.

This is a deliberate deviation from the cheaper option, and it reads as an inconsistency next to Tag, which is a collection for an entirely different reason — Tag is browsed and described, Stack is neither.

## Considered Options

- **A fixed enum in `keystatic.config.ts` and `src/content.config.ts`.** Rejected: cheaper in every respect except the one that mattered. It makes typos a build error and adds no schema to keep in sync, but every new technology becomes a code edit.
- **A free-form array of strings.** Rejected: costs nothing and enforces nothing. `React` and `react` become two stacks silently, and nothing fails.
- **A collection with `url` and `description` fields as well.** Rejected: `description` has nowhere to render, since Stack has no routes. `url` would make the chip on a portfolio card a link off the site, which works against what the portfolio is for.

## Consequences

**The icon must be authored content, not a lookup in code.** This is the constraint that keeps the decision honest. Mapping icons by stack name in a component would mean a new technology needs a code edit for its icon — reintroducing exactly the cost this ADR paid a schema pair to avoid. Icons are uploaded through the CMS, via the `@assets/` `publicPath`.

**A collection does not avoid a rebuild.** Creating a Stack entry commits to `main`, which triggers a full build the same way a code edit does. What is bought is the code edit and the pull request, not the deploy.

**ADR-0001's duplication cost is now paid a fourth time** — Blog Post, Portfolio Item, Tag, and Stack. Any change to a Stack entry's shape must land in both schema files in the same commit.

If Stack ever stops needing to be author-editable, this should revert to an enum rather than being kept out of habit.
