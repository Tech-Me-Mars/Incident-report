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
        // EOP
        MqttOptions: {
          host: 'e01b33af.ala.asia-southeast1.emqxsl.com', //154.26.129.247
          port: 8084,
          // mainTopic: 'eop/',
          // mainTopic: '/uateop/',
          clientId: `EOP_WEB_${Math.random() * 9999}`,
          username: "eop_web",
          password: "eop@web",
          useSSL: true,
          enableMainTopic: false,
          // watchdogTimeout: 1000,  // 1 second
          // reconnectTimeout: 500, // 1 second
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
