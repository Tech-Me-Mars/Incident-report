// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr:false,
  vue: {
    defineModel: true,
    propsDestructure: true
  },
  modules: [
    '@nuxtjs/tailwindcss','@ant-design-vue/nuxt','nuxt-swiper','@vant/nuxt','nuxt-primevue','@formkit/auto-animate/nuxt','@sidebase/nuxt-pdf'
  ],
  primevue: {
    // components: {
    //   include: "*",
    // },
    // directives: {
    //   include: "*",
    // },
    // composables: {
    //   include: "*",
    // },
    options: {
      unstyled: true,
    },
    importPT: { as: "Wind", from: "~/presets/wind" },
  },
  css: [
    "@/assets/css/fontgobal.css",
    "primeicons/primeicons.css",
    "@mdi/font/css/materialdesignicons.min.css",
    "@/assets/css/fontgobal.css",
    "@/assets/css/style.css",
    "flag-icons/css/flag-icons.min.css",
  ],
  runtimeConfig: {
    public: {
      LIFFID: process.env.LIFFID,
      LIFFURL: process.env.LIFFURL,
      // ! DEV 
      // URL_API: "https://api_incident_report.tech-me-mars.com",
      // UAT
      URL_API: "https://api_uat_incident_report.tech-me-mars.com",
      
    }
  },
  plugins: [
    '@/plugins/mqtt',
  ],

  tailwindcss: {
    config: {
      darkMode: "class",
      content: ["./presets/**/*.{js,vue,ts}"],
      theme: {
        extend: {
          colors: {
            "primary-50": "rgb(var(--primary-50))",
            "primary-100": "rgb(var(--primary-100))",
            "primary-200": "rgb(var(--primary-200))",
            "primary-300": "rgb(var(--primary-300))",
            "primary-400": "rgb(var(--primary-400))",
            "primary-500": "rgb(var(--primary-500))",
            "primary-600": "rgb(var(--primary-600))",
            "primary-700": "rgb(var(--primary-700))",
            "primary-800": "rgb(var(--primary-800))",
            "primary-900": "rgb(var(--primary-900))",
            "primary-950": "rgb(var(--primary-950))",
            "surface-0": "rgb(var(--surface-0))",
            "surface-50": "rgb(var(--surface-50))",
            "surface-100": "rgb(var(--surface-100))",
            "surface-200": "rgb(var(--surface-200))",
            "surface-300": "rgb(var(--surface-300))",
            "surface-400": "rgb(var(--surface-400))",
            "surface-500": "rgb(var(--surface-500))",
            "surface-600": "rgb(var(--surface-600))",
            "surface-700": "rgb(var(--surface-700))",
            "surface-800": "rgb(var(--surface-800))",
            "surface-900": "rgb(var(--surface-900))",
            "surface-950": "rgb(var(--surface-950))",
          },
        },
      },
    },
  },
})
