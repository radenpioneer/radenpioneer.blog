# Content schemas are written twice, by hand

Content is authored in Keystatic and read through Astro's build-time content collections, and each side insists on owning the shape of an entry: Keystatic needs it in `keystatic.config.ts` to render the editor, Astro needs it as a Zod schema in `src/content.config.ts` to validate and type the data. Nothing synchronises the two, so we maintain both by hand and accept the duplication.

## Considered Options

- **Derive the Zod schema from the Keystatic config.** Rejected: Keystatic's field types are built for an editor, not for validation, and the mapping is lossy in both directions. The generator becomes a permanent second thing to maintain, fighting Keystatic's types on every upgrade.
- **Drop content collections and read via the Keystatic Reader API.** Rejected: gives up Astro's typed `getCollection()`, build-time validation, and the loader ecosystem — a large loss to remove one duplicated file.

## Consequences

The two definitions can drift. This is survivable because drift fails loudly: Zod validates at build time, so a mismatch breaks the build rather than reaching production. Any change to an entry's shape must be made in both files in the same commit — treat a PR touching only one of them as incomplete.
