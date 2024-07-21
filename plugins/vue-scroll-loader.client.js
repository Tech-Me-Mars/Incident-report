import { defineNuxtPlugin } from '#app';
import {ScrollLoader} from 'vue-scroll-loader';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(ScrollLoader);
  });