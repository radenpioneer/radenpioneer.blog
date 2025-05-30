// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import keystatic from '@keystatic/astro'
import tailwindcss from '@tailwindcss/vite'
import icons from 'unplugin-icons/vite'
import cloudflare from '@astrojs/cloudflare'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.radenpioneer.blog',
  integrations: [react(), sitemap(), keystatic()],
  image: {
    experimentalLayout: 'responsive',
    domains: ['astro.badg.es']
  },
  vite: {
    plugins: [tailwindcss(), icons({ compiler: 'astro' })],
    resolve: {
      alias: import.meta.env.PROD
        ? {
            'react-dom/server': 'react-dom/server.edge'
          }
        : {}
    }
  },
  experimental: {
    responsiveImages: true
  },
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  })
})
