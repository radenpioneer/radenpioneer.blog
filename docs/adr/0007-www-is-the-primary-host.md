# `www` is the primary host, and the apex redirects to it

The site is served at `https://www.radenpioneer.net`. The apex, `radenpioneer.net`, returns a 301 to the `www` host and serves nothing itself. `site` in `astro.config.mjs` is therefore `https://www.radenpioneer.net`, and every canonical URL, OG tag, sitemap entry and JSON-LD `@id` the site emits is built on that host.

This is recorded because the recommendation was the opposite — apex as the primary, `www` skipped entirely — and because reversing it later is not a config change.

**The redirect lives in a Cloudflare Redirect Rule, not in the Worker and not in Astro.** It fires at the edge, before any origin is consulted. The apex keeps one proxied `A` record pointing at `192.0.2.1` (TEST-NET-1); the record never receives traffic, and exists only so Cloudflare has something to proxy without pretending an origin is alive.

**This does not contradict [ADR-0005](./0005-url-shape-and-what-keeps-urls-stable.md).** That decision rejected Cloudflare `_redirects` so that redirects *between paths* stay in one place — `redirects` in `astro.config.mjs`. A host-level apex→`www` redirect is a different category: Astro never sees the request, so it could not live there even if someone wanted it to. It is outside ADR-0005's jurisdiction rather than an exception to it.

## Considered Options

- **Apex as the primary, `www` not served at all.** Recommended and rejected by the author. It is the shorter URL, it needs no redirect, and one hostname is one less thing to keep correct.
- **Apex primary with `www` redirecting to it.** The conventional arrangement; rejected for the same reason as above, in the opposite direction.
- **Both hosts serving the site.** Rejected outright. Two live origins means two candidate OAuth callback hosts and an ambiguous `/keystatic`, on top of duplicate content.
- **Redirecting inside the Worker**, with the apex attached as a second Custom Domain. Rejected: it bills a Worker invocation for every apex request — including crawlers and bots — to return a `Location` header that the edge can produce for free, and it puts host routing into code where nothing else about hosts lives.

## Consequences

**Changing the primary host later invalidates every indexed URL**, exactly as changing the trailing-slash policy would (ADR-0005). The fix would not be a config flag; it would be a redirect in the opposite direction, kept forever.

**`workers_dev` is `false` and `preview_urls` is `true`.** These are independent keys in wrangler's config schema, so production can have exactly one origin while pull-request previews keep their own URLs on `workers.dev`. Leaving `workers_dev` on would reintroduce the second-origin problem that ruled out serving both hosts.

**The Keystatic OAuth callback is registered against the `www` host only.** Callbacks are matched literally, so a callback registered against the apex will not work, and preview URLs cannot complete a login at all. That last part is deliberate — `/keystatic` is production-only, and the literal match is what enforces it.

**Any absolute URL the site emits must be built from `site`.** This is already the rule the third build guard enforces via `absoluteUrl()`; the host decision is what gives that rule a value to be wrong about.
