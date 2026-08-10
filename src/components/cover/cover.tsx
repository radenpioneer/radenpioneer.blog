import type { ReactNode } from 'react'
import { cx } from '~/lib/cx'

export type CoverProps = {
	/**
	 * Resolved by the wrapper. The optimised `<Image>` itself is produced Astro-side and
	 * arrives here as children — `astro:assets` cannot be reached from a .tsx.
	 */
	hasImage?: boolean
	/** Furniture copy for the absent frame. */
	label?: string
	className?: string
	children?: ReactNode
}

/**
 * Draws a `cover` — the `{ image, alt }` pair ADR-0003 makes required on both content types.
 * Where a cover is *allowed* to appear is the caller's decision (hero on a Blog Post, card and
 * OG only on a Portfolio Item); this component only knows how to draw one.
 *
 * The absent branch is not a defensive nicety. On day zero nothing has a cover, and PRODUCT.md
 * forbids inventing one to fill the frame, so the empty frame is a shipped state.
 */
export const Cover = ({ hasImage = false, label = 'No cover', className, children }: CoverProps) => {
	if (hasImage) {
		return <div className={cx('border border-rule', className)}>{children}</div>
	}

	return (
		<div
			className={cx(
				'flex items-center justify-center border border-rule bg-olive/25 px-3 py-12 text-center font-ui text-furniture tracking-furniture text-quiet uppercase',
				className,
			)}
		>
			{label}
		</div>
	)
}
