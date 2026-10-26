
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  devtools: {
    enabled: false
  },

  app: {
    baseURL: '/expense-tracker/'
  },

  nitro: {
    preset: 'github-pages'
  }
})


