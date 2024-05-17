<template>
  <!-- หาก Connect Line เสร็จแล้วให้ Render Child Component ได้ -->
  <!-- #00b96b -->
  <!-- <a-locale-provider :locale="locale"> -->
  <a-config-provider :locale="locale" :theme="{
    token: {
      colorPrimary: '#1677ff',
    },
  }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </a-config-provider>
  <TmmLoadingGlobal />
  <!-- </a-locale-provider> -->
</template>
<script setup>
import * as dataApi from '@/service/ProfileService'
import '@vant/touch-emulator';
// vant ui Lang
import { Locale } from 'vant';
import thTh from 'vant/es/locale/lang/th-TH';

Locale.use('th-TH', thTh);
// vant ui Lang
import thTH from 'ant-design-vue/es/locale/th_TH'; // เปลี่ยนเป็น th_TH
import dayjs from 'dayjs';
import 'dayjs/locale/th'; // เปลี่ยนเป็น th
dayjs.locale('th'); // เปลี่ยนเป็น 'th'
const locale = thTH; // เปลี่ยนเป็น thTH

import { initFlowbite } from "flowbite";
onMounted(async () => {
  initFlowbite();
  loadProfile();
  // await connectLine();
});
const loadProfile = async () => {
  try {
    const res = await dataApi.getProfile();
    const police_employee_id = useState("police_employee_id", () => res.data.data.police_employee_id);
  } catch (error) {
    console.error(error);
  }
}

//  ทุกครั้งที่เปิดเว็บใหม่ จะทำการขอ Token ใหม่ Profile ใหม่ แล้วเก็บลงLocal Storage



</script>
<style>
@import url("@/assets/css/base.css");
/* html *{
  padding: 0;
  margin: 0;
} */
</style>