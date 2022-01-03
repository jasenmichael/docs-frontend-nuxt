import copyContentImages from './plugins/copyContentImages'
copyContentImages('content', 'static', ['.md'])

export default {
  head: {
    title: 'DOCS',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: ['@/assets/css/main.css'],
  plugins: ['~/plugins/utils'],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxt/postcss8',
    '@nuxtjs/google-fonts',
    '@nuxtjs/fontawesome',
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/content',
    '@nuxtjs/strapi',
    '@nuxtjs/markdownit',
  ],
  markdownit: {
    preset: 'default',
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
    use: ['markdown-it-div', 'markdown-it-attrs', 'markdown-it-prism'],
  },
  // axios: {},
  pwa: {
    manifest: {
      lang: 'en',
    },
  },
  strapi: {
    url:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:1337/api'
        : process.env.STRAPI_URL,
  },
  googleFonts: {
    display: 'swap',
    prefetch: true,
    preconnect: true,
    preload: true,
    families: {
      Roboto: [100, 200, 300, 400],
      'Source+Code+Pro': {
        wght: [200, 300, 400],
        ital: [300],
      },
      // 'Open+Sans': true,
      Montserrat: true,
      // Lato: [100, 300],
      Raleway: [100, 200, 400],
    },
  },
  fontawesome: {
    icons: {
      solid: [
        'faCog',
        'faChevronRight',
        'faChevronDown',
        'faSignOutAlt',
        'faLink',
        'faCopy',
        'faCheck',
        'faSearch',
      ],
      brands: ['faGithub'],
    },
    component: 'icon',
  },
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-a11y-dark.css',
      },
    },
    fullTextSearchFields: [
      'title',
      'description',
      'slug',
      'text',
      'tagsString',
    ],
  },
  publicRuntimeConfig: () => {
    return {
      dev:
        process.env.NODE_ENV === 'development'
          ? {
              auth: {
                identifier: process.env.DEV_IDENTIFIER || '',
                password: process.env.DEV_PASSWORD || '',
              },
            }
          : null,
      ghToken: process.env.GH_TOKEN || null,
    }
  },
  hooks: {
    'content:file:beforeInsert': (document, database) => {
      if (document.extension === '.md') {
        if (document.links?.length) {
          const linkTags = []
          document.links.forEach((link) => {
            link.tags.forEach((tag) => {
              linkTags.push(tag)
            })
          })
          document.tags = [...linkTags, ...document.tags]
        }

        if (!document.tags?.length) {
          document.tags = []
        }

        document.tagsString = document.tags.join(' ')
      }
    },
  },
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
}
