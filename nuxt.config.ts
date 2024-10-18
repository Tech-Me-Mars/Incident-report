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
      titleTemplate: '%s | EOP',
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
      locale:{
        startsWith: "เริ่มต้นด้วย",
        contains: "มีอยู่",
        notContains: "ไม่มีอยู่",
        endsWith: "ลงท้ายด้วย",
        equals: "เท่ากับ",
        notEquals: "ไม่เท่ากับ",
        noFilter: "ไม่มีตัวกรอง",
        lt: "น้อยกว่า",
        lte: "น้อยกว่าหรือเท่ากับ",
        gt: "มากกว่า",
        gte: "มากกว่าหรือเท่ากับ",
        dateIs: "วันที่เท่ากับ",
        dateIsNot: "วันที่ไม่เท่ากับ",
        dateBefore: "วันที่ก่อนหน้า",
        dateAfter: "วันที่หลังจาก",
        clear: "ล้าง",
        apply: "ยืนยัน",
        matchAll: "ตรงกันทั้งหมด",
        matchAny: "ตรงกันใดก็ได้",
        addRule: "เพิ่มกฎ",
        removeRule: "ลบกฎ",
        accept: "ใช่",
        reject: "ไม่ใช่",
        choose: "เลือก",
        upload: "อัปโหลด",
        cancel: "ยกเลิก",
        completed: "เสร็จสิ้น",
        pending: "รอดำเนินการ",
        fileSizeTypes: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        dayNames: ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'],
        dayNamesShort: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
        dayNamesMin: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
        monthNames: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
        monthNamesShort: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
        chooseYear: "เลือกปี",
        chooseMonth: "เลือกเดือน",
        chooseDate: "เลือกวัน",
        prevDecade: "ทศวรรษก่อนหน้า",
        nextDecade: "ทศวรรษถัดไป",
        prevYear: "ปีก่อนหน้า",
        nextYear: "ปีถัดไป",
        prevMonth: "เดือนก่อนหน้า",
        nextMonth: "เดือนถัดไป",
        prevHour: "ชั่วโมงก่อนหน้า",
        nextHour: "ชั่วโมงถัดไป",
        prevMinute: "นาทีก่อนหน้า",
        nextMinute: "นาทีถัดไป",
        prevSecond: "วินาทีก่อนหน้า",
        nextSecond: "วินาทีถัดไป",
        am: "AM",
        pm: "PM",
        today: "วันนี้",
        weekHeader: "Wk",
        firstDayOfWeek: 0,
        showMonthAfterYear: false,
        dateFormat: "mm/dd/yy",
        weak: "อ่อน",
        medium: "ปานกลาง",
        strong: "แข็ง",
        passwordPrompt: "กรุณาใส่รหัสผ่าน",
        emptyFilterMessage: "ไม่พบผลลัพธ์", // @deprecated Use 'emptySearchMessage' option instead
        searchMessage: "{0} ผลลัพธ์พร้อมใช้งาน",
        selectionMessage: "{0} รายการที่เลือก",
        emptySelectionMessage: "ไม่มีรายการที่เลือก",
        emptySearchMessage: "ไม่พบผลลัพธ์",
        emptyMessage: "ไม่มีตัวเลือกที่สามารถใช้งานได้",
        aria: {
          trueLabel: "True",
          falseLabel: "False",
          nullLabel: "ไม่ได้เลือก",
          star: "	1 star",
          stars: "{star} stars",
          selectAll: "เลือกทั้งหมด",
          unselectAll: "ยกเลิกการเลือกทั้งหมด",
          close: "ปิด",
          previous: "ก่อนหน้า",
          next: "ถัดไป",
          navigation: "การนำทาง",
          scrollTop: "เลื่อนไปที่ด้านบน",
          moveTop: "เลื่อนไปที่ด้านบนสุด",
          moveUp: "เลื่อนขึ้น",
          moveDown: "เลื่อนลง",
          moveBottom: "เลื่อนไปที่ด้านล่างสุด",
          moveToTarget: "เลื่อนไปที่เป้าหมาย",
          moveToSource: "เลื่อนไปที่แหล่งข้อมูล",
          moveAllToTarget: "เลื่อนทั้งหมดไปที่เป้าหมาย",
          moveAllToSource: "เลื่อนทั้งหมดไปที่แหล่งข้อมูล",
          pageLabel: "หน้า {page}",
          firstPageLabel: "หน้าแรก",
          lastPageLabel: "หน้าสุดท้าย",
          nextPageLabel: "หน้าถัดไป",
          prevPageLabel: "หน้าก่อนหน้า",
          rowsPerPageLabel: "แถวต่อหน้า",
          jumpToPageDropdownLabel: "ไปที่หน้า",
          jumpToPageInputLabel: "ไปที่หน้า",
          selectRow: "เลือกแถว",
          unselectRow: "ยกเลิกการเลือกแถว",
          expandRow: "ขยายแถว",
          collapseRow: "ยุบแถว",
          showFilterMenu: "แสดงเมนูตัวกรอง",
          hideFilterMenu: "ซ่อนเมนูตัวกรอง",
          filterOperator: "ตัวดำเนินการตัวกรอง",
          filterConstraint: "เงื่อนไขตัวกรอง",
          editRow: "แก้ไขแถว",
          saveEdit: "บันทึกการแก้ไข",
          cancelEdit: "ยกเลิกการแก้ไข",
          listView: "มุมมองรายการ",
          gridView: "มุมมองตาราง",
          slide: "สไลด์",
          slideNumber: "สไลด์ {slideNumber}",
          zoomImage: "ขยายภาพ",
          zoomIn: "ขยาย",
          zoomOut: "ย่อ",
          rotateRight: "หมุนไปทางขวา",
          rotateLeft: "หมุนไปทางซ้าย"
        }
      }
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
     
      // URL_API: "http://127.0.0.1:8001",
      URL_API: "https://uat-api.eop-thaipolice.com",
      MQTT_PRE: "uateop"


    }
  },
  plugins: [
    // '~/plugins/axios.js',
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