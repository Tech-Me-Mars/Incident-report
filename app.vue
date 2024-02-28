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
  <!-- </a-locale-provider> -->
</template>
<script setup>
import thTH from 'ant-design-vue/es/locale/th_TH'; // เปลี่ยนเป็น th_TH
import dayjs from 'dayjs';
import 'dayjs/locale/th'; // เปลี่ยนเป็น th
dayjs.locale('th'); // เปลี่ยนเป็น 'th'
const locale = thTH; // เปลี่ยนเป็น thTH

import { initFlowbite } from "flowbite";
onMounted(async () => {
  initFlowbite();

});
</script>
<style>
/* html *{
  padding: 0;
  margin: 0;
} */


.p-datatable.p-datatable-striped .p-datatable-tbody>tr:nth-child(even) {
  background: #f3f3f3;
}

.p-inputtext {
  height: 2.7rem;
}
</style>