import { createPahoMqttPlugin } from 'vue-paho-mqtt';
export default defineNuxtPlugin({
  name: 'vue-paho-mqtt',
  enforce: 'pre',
  async setup(nuxtApp) {
    nuxtApp.vueApp.use(
      createPahoMqttPlugin({
        PluginOptions: {
          autoConnect: true,
          showNotifications: false,
        },
        MqttOptions: {
         
          host: '27.254.144.161',
          port: 8084,
          clientId: `EOP_WEB_${Math.random() * 9999}`,
          // mainTopic: 'main',
          enableMainTopic :false,
          username :"eop_web",
          password  :"eop@web",
          useSSL : true,
          
        },
      }),
    );
  },
  hooks: {
    'app:created'() {
      const nuxtApp = useNuxtApp();
    },
  },
});