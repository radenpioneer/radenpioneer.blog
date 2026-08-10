import { Panel } from '~/components/panel/panel'

/**
 * The sidebar's standing contents, installed on every page. Each panel keeps its heading and
 * its hairline with nothing under it — the Furniture Stays Rule is the whole reason this exists
 * as one component instead of each page assembling its own sidebar.
 *
 * DESIGN.md also lists a site description here. It is left out on purpose: the tagline now sits
 * in the header band, and carrying the same sentence twice on a page with no content is the one
 * thing an empty page cannot afford.
 *
 * Every list is empty by construction — no content collection is wired in this ticket, and
 * PRODUCT.md forbids inventing entries to fill them. This is also the one place a .tsx reaches
 * for another component's .tsx directly: both halves are React, and routing through the .astro
 * wrapper would only re-cross the boundary for nothing.
 */
export const SiteFurniture = () => (
	<>
		<Panel heading="About" empty="No bio yet." />
		<Panel heading="Tags" empty="No tags yet." />
		<Panel heading="Archive" empty="No entries yet." />
		<Panel heading="Stack" empty="Nothing built with anything yet." />
	</>
)
