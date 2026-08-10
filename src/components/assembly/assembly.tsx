import type { ReactNode } from 'react'
import { cx } from '~/lib/cx'

export type AssemblyProps = {
	className?: string
	children?: ReactNode
}

/**
 * The Fixed Assembly Rule (DESIGN.md, Layout): the content assembly has a real, stated width
 * and does not stretch to fill a wide display. The olive ground is what fills it.
 */
export const Assembly = ({ className, children }: AssemblyProps) => (
	<div className={cx('mx-auto max-w-assembly', className)}>{children}</div>
)
