module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: 'Raleway',
        body: 'Roboto', // 'Montserrat',
        accent: 'Raleway',
        code: 'Source\\ Code\\ Pro',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-hamburgers'),
    require('tailwind-scrollbar-hide'),
  ],
}
