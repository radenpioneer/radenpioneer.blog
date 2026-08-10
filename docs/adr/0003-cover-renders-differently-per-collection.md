# `cover` is required on both content types but rendered differently

Blog Post and Portfolio Item both carry a required `cover` — the same field, the same `{ image, alt }` shape, validated the same way. They render it differently on purpose:

- **Blog Post**: `cover` is the hero at the top of the post page, and also supplies the card image and the OG image.
- **Portfolio Item**: `cover` is the card image and the OG image **only**. It is never rendered on the item page.

The asymmetry exists because only Portfolio Item has `screenshots`, rendered as a carousel that owns the top of the item page. A hero above that carousel would show the same image twice in most cases, since an item's cover is usually its best screenshot.

## Considered Options

- **`cover` as the first slide of the carousel.** Rejected by the author: a cover and a carousel are different things, and collapsing them makes the cover's role ambiguous — it would be simultaneously the card thumbnail and a gallery member.
- **Render `cover` as a hero on both, carousel below on Portfolio Item.** Rejected: this is the duplication the asymmetry avoids. The reader sees the same screenshot twice, once large and once as slide one.
- **Make `cover` optional on Portfolio Item, since the item page does not use it.** Rejected: the card and the OG image both need it unconditionally, and an index of cards where some have images and some do not reads as a bug rather than a choice.
- **A separate `thumbnail` field on Portfolio Item, distinct from `cover`.** Rejected: two image fields where one would do, and the author would fill them with the same file.

## Consequences

**`cover` means different things to the author depending on the collection**, and the docs must say so plainly rather than describing "the cover field" once. For a Portfolio Item the sentence is: *this is what people see before they click.* For a Blog Post it is also what they see after.

**A Portfolio Item with no `screenshots` has no imagery on its own page.** `screenshots` is optional, so this case is real and is accepted — the item page carries the substance in its MDX body, and the cover has already done its job getting the reader there.

**The author must avoid putting the cover image into `screenshots` as well.** Nothing enforces this; the duplication it produces is visible but harmless.

A future reader will see one field rendered two ways and reasonably try to make it consistent. Making it consistent means choosing one of the rejected options above — most likely reintroducing the duplication. If Portfolio Item ever loses its carousel, this asymmetry should collapse rather than being preserved out of habit.
