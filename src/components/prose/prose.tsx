import type { ReactNode } from 'react'
import { cx } from '~/lib/cx'

export type ProseProps = {
	className?: string
	children?: ReactNode
}

/**
 * Holds the reading measure and the element defaults for authored prose — the MDX body of a
 * Blog Post or a Portfolio Item, and hand-written copy on a page like About.
 *
 * The element styles live in `global.css` under `@layer components`, not in a scoped block: an
 * Astro scoped `<style>` does not reach the output of a framework component at all, and the
 * elements being styled arrive from a slot and cannot be given a class anyway.
 */
export const Prose = ({ className, children }: ProseProps) => (
	<div className={cx('prose-column', className)}>{children}</div>
)
