import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import image from '@astrojs/image'
import Icons from 'unplugin-icons/vite'

// https://astro.build/config
import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
    mdx(),
  ],
  vite: {
    plugins: [
      Icons({
        compiler: 'jsx',
        jsx: 'react',
      }),
    ],
  },
})
