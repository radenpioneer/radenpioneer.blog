import type { ReactNode } from 'react'

export type DateGroupProps = {
	date: Date
	children?: ReactNode
}

/**
 * The Date Owns the Group Rule (DESIGN.md, Typography): a date heads a *set* of entries, and an
 * entry never carries its own date as a heading. This is also why `/blog/<year>/` from ADR-0005
 * falls out of the design rather than being bolted onto it.
 */
export const DateGroup = ({ date, children }: DateGroupProps) => {
	// `lang` is fixed to English by PRODUCT.md, and UTC keeps the rendered date from shifting
	// with the build machine's timezone.
	const label = date.toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC',
	})

	return (
		<section className="mb-8">
			<h2 className="mb-3 font-display text-furniture tracking-band text-quiet uppercase">
				<time dateTime={date.toISOString().slice(0, 10)}>{label}</time>
			</h2>
			{children}
		</section>
	)
}
