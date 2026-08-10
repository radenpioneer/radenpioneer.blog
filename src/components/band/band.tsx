import type { ReactNode } from 'react'
import { cx } from '~/lib/cx'

export type BandProps = {
	/** Defaults to a plain div so the band is not accidentally landmarked. */
	as?: 'header' | 'footer' | 'div'
	className?: string
	children?: ReactNode
}

/**
 * A solid Band Deep field — the header band and the footer band (DESIGN.md, Colors).
 *
 * Band Deep is used as a field and never as a text colour on light ground, which is why this
 * component owns both the background and the foreground and callers set neither.
 */
export const Band = ({ as: Tag = 'div', className, children }: BandProps) => (
	<Tag className={cx('bg-band text-column', className)}>{children}</Tag>
)
