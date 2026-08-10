import type { ReactNode } from 'react'

export type PanelProps = {
	heading: string
	/** Shown in place of the list when there is nothing to list. Furniture voice, not prose. */
	empty?: string
	/**
	 * Resolved by the wrapper from `Astro.slots.has('default')`. It is a prop rather than a
	 * `children` check because an Astro slot always arrives as a renderable, empty or not.
	 */
	hasItems?: boolean
	children?: ReactNode
}

/**
 * A block of sidebar furniture: a letterspaced heading, a hairline, and whatever is listed
 * under it.
 *
 * The Furniture Stays Rule (DESIGN.md, Layout): the heading and the rule render whether or not
 * there is anything to list. That is why emptiness is handled here rather than by the caller
 * deciding not to render the panel — an empty archive is an archive heading with nothing under
 * it, never a hidden sidebar.
 */
export const Panel = ({
	heading,
	empty = 'Nothing yet.',
	hasItems = false,
	children,
}: PanelProps) => (
	<section className="mb-5 font-ui text-furniture">
		<h2 className="border-b border-rule pb-1 tracking-furniture uppercase">{heading}</h2>
		{hasItems ? (
			<div className="pt-1.5">{children}</div>
		) : (
			<p className="pt-1.5 text-quiet">{empty}</p>
		)}
	</section>
)
