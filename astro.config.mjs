// @ts-check
import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import icons from 'unplugin-icons/vite'

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    },

    imageService: 'cloudflare'
  }),

  integrations: [react()],

  prefetch: {
    defaultStrategy: 'tap'
  },

  vite: {
    plugins: [tailwindcss(), icons({ compiler: 'jsx', jsx: 'react' })]
  },

  experimental: {
    contentIntellisense: true
  }
})
