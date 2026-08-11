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
 * one at review time means reading the expression rather than searching for it. This is the only
 * sanctioned way to make an absolute URL, and the guard checks that the path was taken — a check
 * that can be wrong loudly instead of missing quietly.
 *
 * `origin` is passed in rather than read off `Astro.site` here: `src/lib/` holds no Astro
 * globals. It throws on a missing origin, which is the wanted failure — the alternative is a
 * canonical reading `undefined` on every page of a green build.
 */
export const absoluteUrl = (path: string, origin: URL | undefined) => new URL(path, origin).href
