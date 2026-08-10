# About carries author identity, and Blog Posts do not reference it

Author identity — name, portrait, one-line bio — lives in **About**, the same single entry whose MDX body is the `/about` page. Blog Posts carry no `author` field at all; the post layout reads the About entry directly to render the byline.

Both halves of this are deliberate and both look wrong at a glance. Identity data sitting in something named after a page invites splitting an `author` collection out of it; a byline with no field behind it invites adding `author: reference('about')` to the post schema.

## Considered Options

- **A separate `author` collection, with About as a page that renders it.** Rejected: on a personal dev site the page describing the site and the page describing the person are the same page. Splitting them produces two entries that are always rendered together and never independently, and the author would maintain a bio in one place and prose about themselves in the other.
- **`author: reference('about')` on Blog Post.** Rejected: a reference whose target set has exactly one member is a constant wearing a field's costume. It would force a choice on every new post whose answer is fixed in advance — the same reasoning [ADR-0001](./0001-duplicate-content-schemas.md)'s ticket used to reject a `slug` field. It also reopens a decision already settled: the content schemas explicitly have no `author`.
- **Keeping author identity inside Site Settings.** Rejected: it left Site Settings holding two unrelated things, and identity needed a body — freeform prose — which Site Settings has no reason to carry.

## Consequences

**Site Settings is left with three fields** (`title`, `tagline`, `description`) and no images or body. That is thin but intentional; it is exactly the site's own copy and nothing else.

**`bio` and the About body are both prose, and that is not duplication.** `bio` is one sentence doing three jobs — footer, JSON-LD `Person.description`, and the `/about` meta description — and is bounded 50–160 characters like every other meta description on the site. The body is the page. The bound is what keeps them from collapsing into each other.

**A second author is the trigger to revisit this.** At that point About becomes a genuine multi-entry collection and "which author?" becomes a question a field can answer. The cost of getting here late is one schema field plus backfilling the existing posts — cheap while the post count is small, which is why the cheap option was taken now.
