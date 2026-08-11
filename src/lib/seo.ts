import { site } from '~/config/site'

/**
 * Two segments, never three, joined by an em dash: a tag page is `Posts tagged "Astro" —
 * radenpioneer`, not `Astro — Blog — radenpioneer`. Nesting the route hierarchy into the title
 * spends the characters a search result actually shows on breadcrumbs nobody searches for.
 *
 * `null` is the homepage, and it is the one different shape — the site leads and the tagline
 * follows, because there the site itself is the subject rather than a route within it. It is
 * spelled `null` rather than left out so that a caller declares the exception instead of
 * appearing to have forgotten the title.
 */
export const pageTitle = (title: string | null) =>
	title === null ? `${site.title} — ${site.tagline}` : `${title} — ${site.title}`

/**
 * A root-relative URL in a meta tag builds green and ships a blank social preview, so verifying
 * one at review time means reading the expression rather than searching for it.
 *
 * Throwing on a missing origin is the wanted failure: the alternative is every page of a green
 * build carrying a canonical that reads `undefined`.
 */
export const absoluteUrl = (path: string, origin: URL | undefined) => new URL(path, origin).href
