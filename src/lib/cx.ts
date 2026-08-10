/**
 * `class:list` is an Astro template feature and does not exist in a .tsx component, so the
 * React half of every component joins its classes through this instead. Three lines beats a
 * dependency for what it does.
 */
export type ClassValue = string | false | null | undefined

export function cx(...values: ClassValue[]): string | undefined {
	const joined = values.filter(Boolean).join(' ')
	return joined || undefined
}
