// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        '@unocss/nuxt',
        '@pinia/nuxt',
        '@vueuse/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        
      ],
      piniaPersistedstate:{
        storage: 'localStorage',
      }
      
})
