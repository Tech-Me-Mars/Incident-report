// https://nuxt.com/docs/api/configuration/nuxt-config
import * as AntD from 'ant-design-vue'
import { addComponent } from '@nuxt/kit'

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr:false,
  i18n: {
    /* module options */
    lazy: true,
    langDir: "locales",
    strategy: "prefix_except_default",
    locales: [
      {
        code: "th-TH",
        iso: "th-TH",
        name: "ไทย",
        file: "th-TH.json",
        flag: '/image/flag/flag-thailand.png',
        flagIcon:"fi-th"
      },
      {
        code: "en-US",
        iso: "en-US",
        name: "English(US)",
        file: "en-US.json",
        flag: '/image/flag/flag-us.png',
        flagIcon:"fi-gb"
      },

    ],
    defaultLocale: "th-TH",
    // vueI18n: {
    //   fallbackLocale: "en-US",
    // },
  },
  vue: {
    defineModel: true,
    propsDestructure: true
  },

  modules: ['nuxt-swiper',
  "@nuxtjs/tailwindcss",
   "nuxt-primevue",
   '@nuxtjs/i18n',
   '@ant-design-vue/nuxt'
  // ,function (options, nuxt) {
  //   for (const key in AntD) {
  //     if (['version', 'install'].includes(key)) continue
  //      addComponent({
  //       filePath: 'ant-design-vue',
  //       name: `A${key}`,
  //       export: key
  //     })
  //   }
  // },
],

  primevue: {
    cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
    components: {
      include: "*",
      // exclude: ['editor']
    },
    directives: {
      include: "*",
    },
    composables: {
      include: "*",
    },
    options: {
      ripple: true,
      pt: {
        button: {
         root:{
            class: "py-1",
            style: "" 
          }
        },
        paginator: {

        },
        breadcrumb: {
          root: { class: "bg-transparent px-0 border-none" },
        },
        column: {
          root: {
            class: "px-8",
          },
          headerCell: {
            class: " px-8 border-none text-sm text-gray-700",
            style: "background-color: #F1F5F9",
          },
          sortBadge: {
            style: { width: ".3rem", height: ".3rem" },
          },
          bodyCell: {
            class: "px-8 text-sm text-gray-700",
            style: "border-bottom: 1px solid rgb(241,245,249)",
          },
        },
        calendar: {
          root: { style: "height: 2.4rem" },
        },
      },
    },
  },
  css: [
    "primevue/resources/themes/lara-light-blue/theme.css",
    "@/assets/css/fontgobal.css",
    "primeicons/primeicons.css",
    "@mdi/font/css/materialdesignicons.min.css",
    "@/assets/css/fontgobal.css",
    "@/assets/css/style.css",
    "@/themes/material/material-light/standard/indigo/theme.scss",
    "flag-icons/css/flag-icons.min.css",
    // 'ant-design-vue/dist/antd.css',
    // '@/themes/tailwind/tailwind-light/theme.scss',
    // '@/themes/viva/viva-light/theme.scss'
    // '@/themes/fluent/fluent-light/theme.scss'

  ],
  plugins: [
    // '~/plugins/bootstrap.js',
    '@/plugins/registercomponents.js',
  ],
  runtimeConfig: {
    public: {
      LIFFID: process.env.LIFFID,
      LIFFURL: process.env.LIFFURL,
      // ! DEV UAT
      URL_API: "https://api-uat.mix-station.com",

    }
  },
});
