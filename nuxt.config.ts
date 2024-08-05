// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  // app: {
  //   head: {
  //     script: [
  //       { src: 'https://api.longdo.com/map/?key=1e7c1b91542a627c2f556824f98e9977', type: 'text/javascript' },
  //       { src: 'path/to/longdomap.markercluster-src.js', type: 'text/javascript' }
  //     ],
  //     link: [
  //       { rel: 'stylesheet', href: 'path/to/MarkerCluster.Default.css' }
  //     ]
  //   }
  // },

  ssr: false,
  build: {
    transpile: ['v3-infinite-loading']
  },
  vue: {
    defineModel: true,
    propsDestructure: true
  },
  modules: [
    "@pinia/nuxt",
    '@stefanobartoletti/nuxt-social-share',
    '@nuxtjs/tailwindcss',
    '@ant-design-vue/nuxt',
    'nuxt-swiper',
    '@vant/nuxt',
    'nuxt-primevue',
    '@formkit/auto-animate/nuxt',
    '@sidebase/nuxt-pdf',
    "@stefanobartoletti/nuxt-social-share",
    'nuxt-tiptap-editor'
  ],
  tiptap: {
    prefix: "Tiptap", //prefix for Tiptap imports, composables not included
  },

  quasar: {
    // Configurable Component Defaults
    components: {
      defaults: {
        QBtn: {
          dense: true,
          flat: true,
        },
        QInput: {
          dense: true
        }
      }
    }
  },
  app: {
    head: {
      title: 'EOP',
      titleTemplate: '%s | ',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no',
        },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/eop_icon.png' },
      ],
    },
  },
  // socialShare: {
  //   // ตั้งค่าต่าง ๆ ที่คุณต้องการได้ที่นี่
  //   url: 'http://localhost:3000/lab/share',
  //   styled: true,
  //   label: false
  // },
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
    '@/assets/css/MarkerCluster.Default.css'
  ],
  runtimeConfig: {
    public: {
      LIFFID: process.env.LIFFID,
      LIFFURL: process.env.LIFFURL,
      MAP_KEY: process.env.MAP_KEY,
      // prod
      // URL_API: "https://api.eop-thaipolice.com",
      // MQTT_PRE:"eop"
      // uat
      URL_API: "https://uat-api.eop-thaipolice.com",
      MQTT_PRE:"uateop"
      
      
    }
  },
  plugins: [
    '@/plugins/mqtt',
    '@/plugins/vue3-perfect-scrollbar.js',
    '@/plugins/vue-scroll-loader.client.js',
    '@/plugins/infinite-loading.js',
    '@/plugins/sweetalert2',
    // '@/plugins/longdo-map-vue.client.js'
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