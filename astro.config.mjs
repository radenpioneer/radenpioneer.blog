// @ts-check
import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.radenpioneer.blog',
  redirects: {
    '/sngrcreative': 'https://sngrcreative.pages.dev'
  },

  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  })
})
