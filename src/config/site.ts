/**
 * Values that only take effect after a code edit, which is exactly what CONTEXT.md says a Site
 * Setting is not. Ticket 06 settled that nav, footer, socials and `lang` live here rather than
 * in the CMS; `src/config/` is their one home, never inlined per page.
 */

export const lang = 'en'

/**
 * PLACEHOLDER — moves to the Site Settings singleton once Keystatic is wired.
 *
 * `title` is a brand commitment from PRODUCT.md and is real. `tagline` is not established:
 * it is written here so the header band has something true to carry, and it is the author's
 * to replace.
 */
export const site = {
	title: 'radenpioneer',
	tagline: 'Dev blog and portfolio.',
} as const

/**
 * `/blog/` and `/work/` are not built yet. They stay in the nav anyway — the Furniture Stays
 * Rule applies to navigation as much as to the sidebar, and the routes land in the build
 * session. Trailing slashes are required: `trailingSlash: 'always'` (ADR-0005).
 */
export const nav = [
	{ label: 'Home', href: '/' },
	{ label: 'Blog', href: '/blog/' },
	{ label: 'Work', href: '/work/' },
	{ label: 'About', href: '/about/' },
] as const
