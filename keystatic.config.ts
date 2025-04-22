import { config } from '@keystatic/core'
import { site } from '~/content/site/site.keystatic'
import { pages } from '~/content/pages/pages.keystatic'
import { posts } from '~/content/posts/posts.keystatic'
import { category } from '~/content/category/category.keystatic'
import { menu } from '~/content/menu/menu.keystatic'

export default config({
  storage: import.meta.env.PROD
    ? {
        kind: 'github',
        repo: 'radenpioneer/radenpioneer.blog'
      }
    : {
        kind: 'local'
      },

  singletons: {
    site
  },

  collections: {
    pages,
    posts,
    category,
    menu
  },

  ui: {
    navigation: {
      Konten: ['posts', 'category', '---', 'pages'],
      'Pengaturan Website': ['site', 'menu']
    }
  }
})
