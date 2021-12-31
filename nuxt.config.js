import copyContentImages from './plugins/copyContentImages'

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
} else if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: '/var/www/.env' })
}

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
    // '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/content',
    '@nuxtjs/strapi',
  ],
  // axios: {},
  pwa: {
    manifest: {
      lang: 'en',
    },
  },
  content: {},
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
      solid: ['faCog', 'faChevronRight', 'faChevronDown', 'faSignOutAlt'],
    },
    component: 'icon',
    // component: 'FaIcon',
    // suffix: false
    // suffix: {
    //   suffix: false
    // }
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
    }
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
