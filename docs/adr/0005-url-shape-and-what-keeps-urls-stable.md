# URLs end with a slash, and the year segment makes `pubDate` load-bearing

Blog Posts live at `/blog/<year>/<slug>/`, Portfolio Items at `/work/<slug>/`, and **every** route ends with a trailing slash. Two parts of that are easy to "fix" into something broken later, so both are recorded here.

**The trailing slash is not a style choice — it is what the host serves.** Measured on real workerd via `wrangler dev`, with Cloudflare's default `html_handling: "auto-trailing-slash"` against Astro's default `build.format: 'directory'` (which emits `about/index.html`):

```
/about   307 -> /about/
/about/  200
```

Cloudflare **forces** the slash rather than dropping it, which is the opposite of the common assumption. `trailingSlash: 'always'` is therefore set explicitly in `astro.config.mjs` — it changes nothing in production, but it makes the dev server agree with the host instead of accepting both forms.

**The year in a Blog Post URL comes from `pubDate`.** Keystatic stores an entry's slug as its directory name and reconstructs the slug field's value *from the path* when reading, so renaming a published post's title does not move it. `pubDate` has no such protection: it is an ordinary field, and editing it silently moves a published URL with no file rename, no confirmation, and no trace.

## Considered Options

- **`/blog/<slug>/`, no year segment.** Recommended and rejected by the author. A date segment carries no routing value and adds a component that can break. It was chosen anyway for how the URL reads.
- **`build.format: 'file'` with `trailingSlash: 'never'`**, giving `/blog/foo`. Rejected: it is achievable but requires three settings to stay correct together against two sets of defaults. When one drifts, the failure is silent — every internal link takes a 307 hop and canonical URLs stop matching what is served.
- **Freezing the year at first publish, separately from `pubDate`.** Rejected as a second source of truth for one date, and ADR-0001 already carries enough hand-synced duplication.
- **Letting `/blog/<year>/` 404.** Rejected: a date segment invites truncation, and the 404 would land on the parent of a URL the site itself generates. `/blog/<year>/` redirects to `/blog/` instead, built from the years actually present.

## Consequences

**"Do not change `pubDate` after publishing" is a rule of the same weight as not renaming a slug**, and it is weaker in practice, because nothing about editing a date field feels like moving a file. It belongs in the conventions doc next to the slug rule, not below it.

**`redirects` in `astro.config.mjs` is the escape hatch and now has a real job.** It was originally admitted for typo'd titles; the year segment makes it likelier to be needed. Cloudflare `_redirects` was rejected so redirect state stays in one place.

**Changing the trailing-slash policy later invalidates every indexed URL.** If someone finds the slashes ugly, the fix is not a config flag — it is a redirect table for the whole site.

**`tags` is a slug no Blog Post can use.** `/blog/tags/<tag>/` is a static route and static routes win over dynamic ones in Astro, so a post slugged `tags` would build and then be unreachable. Nothing enforces this.
