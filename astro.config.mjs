// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import icons from 'unplugin-icons/vite'
import cloudflare from '@astrojs/cloudflare'

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321',
  integrations: [react(), sitemap()],
  image: {
    experimentalLayout: 'responsive',
    domains: ['astro.badg.es']
  },
  vite: {
    plugins: [tailwindcss(), icons({ compiler: 'astro' })]
  },
  experimental: {
    responsiveImages: true,
    svg: true
  },
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  })
})
