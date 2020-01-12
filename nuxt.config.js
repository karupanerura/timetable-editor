// for Github Pages
const ghPagesBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/timetable-editor/'
  },
  generate: {
    dir: 'docs'
  }
} : {}

export default {
  ...ghPagesBase,
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Web Timetable Editor',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Timetable Editor' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/layout.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Build configuration
  */
  build: {
  }
}
