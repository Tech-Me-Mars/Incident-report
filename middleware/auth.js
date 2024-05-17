import liff from "@line/liff";

export default defineNuxtRouteMiddleware(async (to, from) => {
  // process.client เป็นตัวแปรที่ใช้ใน Nuxt.js เพื่อตรวจสอบว่าโค้ดปัจจุบันทำงานอยู่ทางฝั่งไคลเอนต์หรือเซิร์ฟเวอร์
  // ตัวแปร process.client เป็นค่าบูลีนที่เป็น true ถ้าโค้ดกำลังทำงานอยู่ทางฝั่งไคลเอนต์ และเป็น false ถ้าโค้ดกำลังทำงานอยู่ทางฝั่งเซิร์ฟเวอร์
  if (process.client) {

    const token = localStorage.getItem("token");
    if (token == null || token == undefined || token == "") {
      return navigateTo({ path: "/auth/login-line" });
    }
    
    // const liftId = useRuntimeConfig().public.LIFFID;
    // const liftUrl = useRuntimeConfig().public.LIFFURL;
    // // หากไม่ได้loginจากline Api ให้ Login Line ก่อน WebApp ทำงาน
    // await liff.init({ liffId: liftId });
    // const isLoginLine = await liff.isLoggedIn();
    // if (liff.isInClient()) {
    // } else {
    //   if (!isLoginLine) {
    //     alert(isLoginLine);
    //     return liff.login({
    //       redirectUri: window.location.replace(
    //         liftUrl
    //       ),
    //     });
    //   }
    // }
  }
  console.log("hello from is line login Middleware !");
});
