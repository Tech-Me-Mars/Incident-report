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
import thTH from 'ant-design-vue/es/locale/th_TH'; // เปลี่ยนเป็น th_TH
import dayjs from 'dayjs';
import 'dayjs/locale/th'; // เปลี่ยนเป็น th
dayjs.locale('th'); // เปลี่ยนเป็น 'th'
const locale = thTH; // เปลี่ยนเป็น thTH

import { initFlowbite } from "flowbite";
onMounted(async () => {
  initFlowbite();
  await connectLine();
});



import liff from "@line/liff";
import { jwtDecode } from "jwt-decode";

// import * as dataApi from "@/service/CheckRegisterService";
const liftId = useRuntimeConfig().public.LIFFID;
const liftUrl = useRuntimeConfig().public.LIFFURL;


// เช็คว่าทำการConnect และLoginเสร็จยัง
const isLineConnected = ref(false);

const loadDefaultLanguage = async () => {
  // โหลดจาก Localมา
  const defaultLangguage = localStorage.getItem("defaultlangguage");
  // หากไม่มี ให้เก็บลง Local
  if (defaultLangguage == null || defaultLangguage == undefined) {
    localStorage.setItem("defaultlangguage", "th-TH");
  } else {
    // หากมี ให้ดึงมาใช้เมื่อเว็บเปิด
    setLocale(defaultLangguage);
  }
};
loadDefaultLanguage();
const connectLine = async () => {
  isLineConnected.value = false;
  try {
    await liff.init({ liffId: liftId });
    if (liff.isInClient()) {
      console.log("liff.isInClient", liff.isInClient);
      console.log("isInClient == true");
      await loadProfile();
    } else {
      if (liff.isLoggedIn()) {
        console.log("loginแล้ว isLoggedIn == true");
        loadProfile();
      } else {
        logIn();
      }
    }
  } catch (error) {
    isLineConnected.value = true;
    console.error(error);
  }
};

const logIn = () => {
  liff.login({
    redirectUri: window.location.replace(liftUrl),
  });
};

//  ทุกครั้งที่เปิดเว็บใหม่ จะทำการขอ Token ใหม่ Profile ใหม่ แล้วเก็บลงLocal Storage
const loadProfile = async () => {
  // liff.closeWindow();
  try {
    await liff.init({ liffId: liftId });
    console.log("loading ... Profile");
    const profile = await liff.getProfile();
    console.log("profile", profile);
    const token = await liff.getIDToken();
    await decodeTokenDetail(token);
    localStorage.setItem("profile", JSON.stringify(profile));
    localStorage.setItem("token", token);

    // สร้างฟังชั่นCheck-registerทุกครั้งที่initใหม่ หากfalseวิ่งไปRegister(ยังไม่เป็นสมาชิก) true=>วิ่งไปหน้าHome
  } catch (error) {
    isLineConnected.value = true;
    console.error(error);
  }
};

const decodeTokenDetail = async (token) => {
  try {
    const decoded = jwtDecode(token);
    console.log(decoded);
    isLineConnected.value = true;
  } catch (error) {
    isLineConnected.value = true;
    console.error(error);
  }
  // โยนเข้าฟังชั่นไปคำนวนเวลาที่เหลือ expire
  // convertTodiff(decoded.exp)
};
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