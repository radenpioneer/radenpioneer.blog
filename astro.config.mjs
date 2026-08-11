// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // The `www` host is the primary one and the apex redirects to it (ADR-0007). Every canonical,
  // og:url, sitemap entry and JSON-LD id is built from this line, and all of them fail silently
  // on the wrong value — a green build serving the host we do not use.
  site: 'https://www.radenpioneer.net',

  // Cloudflare forces the trailing slash rather than dropping it, so this is set explicitly to
  // make dev match prod (ADR-0005).
  trailingSlash: 'always',

  adapter: cloudflare({
    // The v14 default is the runtime image service, which is billed per request. Ours is
    // build-time only. Load-bearing for SVG too — without it, content icons silently break in
    // production.
    imageService: 'compile'
  }),

  image: {
    // Must stay false while Tailwind is the styling layer: Astro's unlayered responsive styles
    // beat Tailwind's layered ones. Components pass explicit `widths` and `sizes` instead.
    responsiveStyles: false
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});