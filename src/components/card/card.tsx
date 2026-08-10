import type { ReactNode } from 'react'
import { cx } from '~/lib/cx'

/** Portfolio Item Status (CONTEXT.md). A Blog Post has none. */
export type Status = 'concept' | 'on-progress' | 'live' | 'archived'

export type CardProps = {
	title: string
	href: string
	status?: Status
	/**
	 * The line under the title. A Portfolio Item's years, or a Blog Post's supporting line —
	 * never its date, which belongs to the group heading (The Date Owns the Group Rule).
	 */
	meta?: string
	/**
	 * The rendered cover, arriving from the wrapper's `slot="cover"`. Pass one only where the
	 * collection is allowed to show one (ADR-0003); an index row passes none.
	 */
	cover?: ReactNode
	/** Resolved by the wrapper from `Astro.slots.has('byline')`. */
	hasByline?: boolean
	byline?: ReactNode
	className?: string
	children?: ReactNode
}

/**
 * The era's entry block, used by the blog index and the work index alike: a hairline, a title,
 * an optional cover, a meta line, the summary, and a byline footer.
 *
 * Deliberately not a boxed card. Depth in this system comes from the white column on the olive
 * ground and from 1px hairlines — a bordered tile inside the column would be a second box drawn
 * for no reason.
 */
export const Card = ({
	title,
	href,
	status,
	meta,
	cover,
	hasByline = false,
	byline,
	className,
	children,
}: CardProps) => {
	// The Reserved State Rule: `live` is the only Status that earns Signal Orange. Every other
	// value is furniture.
	const isCurrent = status === 'live'

	return (
		<article className={cx('border-t border-rule pt-3 pb-6', className)}>
			{cover}

			<h3 className={cx('font-body text-entry leading-snug font-bold', cover && 'mt-3')}>
				<a href={href} className="no-underline hover:underline">
					{title}
				</a>
			</h3>

			{(meta || status) && (
				<p className="mt-1 flex items-center gap-2 font-ui text-furniture tracking-furniture text-quiet uppercase">
					{status && (
						<span className="flex items-center gap-1.5">
							<span
								className={cx(
									'inline-block h-2 w-2 shrink-0',
									isCurrent ? 'bg-signal' : 'bg-rule',
								)}
								aria-hidden="true"
							/>
							<span className={cx(isCurrent && 'text-signal')}>{status}</span>
						</span>
					)}
					{meta && <span>{meta}</span>}
				</p>
			)}

			<div className="mt-2">{children}</div>

			{hasByline && <p className="mt-3 font-ui text-furniture text-quiet">{byline}</p>}
		</article>
	)
}
