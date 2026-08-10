import { cx } from '~/lib/cx'
import { nav } from '~/config/site'

export type SiteNavProps = {
	/** Resolved by the wrapper from `Astro.url.pathname`. */
	pathname: string
}

/**
 * The nav strip, sitting on the white column directly under the header band rather than inside
 * it. Signal Orange marks the current item (DESIGN.md, Colors) and only reaches its contrast on
 * the column — on Band Deep the same orange lands at 2.8:1 and would be unreadable.
 */
export const SiteNav = ({ pathname }: SiteNavProps) => (
	<nav aria-label="Site" className="border-b border-rule bg-column px-4 py-2">
		<ul className="flex flex-wrap gap-x-4 gap-y-1 font-ui text-furniture tracking-furniture uppercase">
			{nav.map(({ label, href }) => {
				// Every href in `nav` is trailing-slashed, so a plain comparison is enough
				// (ADR-0005).
				const current = pathname === href
				return (
					<li key={href}>
						<a
							href={href}
							aria-current={current ? 'page' : undefined}
							className={cx(
								'no-underline hover:underline',
								current ? 'text-signal' : 'text-ink',
							)}
						>
							{label}
						</a>
					</li>
				)
			})}
		</ul>
	</nav>
)
