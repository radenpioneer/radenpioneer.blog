# OG images are generated outside the Astro build

Social card images are rendered by a **Node script wired as `postbuild`**, which reads a manifest the build emits and writes PNGs into `dist/og/`. They are not produced by a prerendered endpoint, and no part of the generation runs inside `astro build`.

This is recorded because the arrangement looks backwards. A prerendered `src/pages/og/[...slug].png.ts` is the idiomatic Astro answer, it is what every tutorial shows, and a future session will read a postbuild script as a workaround someone never got round to tidying. It is not. The idiomatic answer was built and measured, and it cannot work here.

## The fact this rests on

**With `@astrojs/cloudflare`, prerendering does not run in Node. It runs in workerd.** The adapter starts a miniflare server for the prerender pass, so a route marked `prerender = true` executes under the same restrictions as production, at build time. The build log says so in as many words — *"Failed to get static paths from the Cloudflare prerender server"*.

Three consequences were each hit in order, on a probe reproducing the real config:

| Attempt | Result |
|---|---|
| `@resvg/resvg-js` imported by the endpoint | `UNLOADABLE_DEPENDENCY` — a native `.node` binary cannot be bundled for workerd |
| Reading a font with `node:fs/promises` | `No such module "node:fs/promises"` at prerender time |
| `@resvg/resvg-wasm`, initialised from an imported `.wasm` module | `CompileError: Wasm code generation disallowed by embedder` |

The last one is the wall. Satori reaches layout through Yoga, and resvg rasterises through WASM; workerd refuses to instantiate WebAssembly from bytes at runtime. `nodejs_compat` is not an escape. It must **not** be added to this Worker: the runtime needs none, and its absence is what keeps Keystatic's `process.env` reads safe.

Two things did work and are worth keeping in the record, because they read as the obvious suspects: fonts imported through Vite's `?inline` as base64 data URIs resolved fine, and the Astro Container API rendered a `.astro` component to a string inside the prerender pass without complaint. Neither was the problem.

## Considered Options

- **A prerendered endpoint per image.** The idiomatic shape. Closed by the three measurements above, not by preference.
- **A `prebuild` script writing into `public/og/`.** Works, and was rejected for what it costs upstream: the script would have to read entry frontmatter itself, making it the **third** place the entry shape is known, which is exactly the tax [ADR-0001](./0001-duplicate-content-schemas.md) already documents paying twice.
- **Running the generator under `vite-node` to keep `.astro` components and the Container API.** Rejected. Plain Node cannot import a `.astro` file, so preserving them means adding a runner — and satori never sees `class`, Tailwind, `global.css`, or `<Image>`, so the card must be written in inline styles from scratch either way. The runner buys syntax, not reuse.
- **No generation at all — crop each entry's `cover` to 1200×630 with `getImage()`.** Recommended and overruled by the author, who wants a designed card rather than a derived one. Recorded because it remains the cheapest correct answer if the generator ever becomes a burden: Astro's sharp service already crops when given both `width` and `height`.

## Consequences

**The manifest is what keeps the entry shape read in one place.** The build emits it; the script consumes it and decides nothing. If a future change makes the script read `src/content/` directly, ADR-0001's tax goes from two copies to three.

**Images do not exist when the pages referencing them are rendered.** Pages emit `og:image` during the build; the PNGs appear afterwards. Nothing validates the link, so a generation failure produces a page that builds green and previews blank — which is why the script **fails the build** rather than skipping an image. Ticket 15 already ruled that a wrong tag is worse than a missing one, and JSON-LD `image` reads the same URL.

**The card is not a site component and cannot be one.** Satori supports no classes, no stylesheet, no `<style>` tag — inline styles only, over a flexbox subset. The card therefore hard-codes hex values copied from `@theme`, which the conventions doc exempts by name.

**Reversal is cheap and will look tempting.** If a future adapter version prerenders in Node again, or workerd permits module-instantiated WASM, the endpoint shape becomes available. Re-measure before moving: the failure is silent in the sense that it only appears at build, and this document is the only thing that explains why the script is where it is.
