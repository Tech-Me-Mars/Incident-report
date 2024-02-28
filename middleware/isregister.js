import liff from "@line/liff";
export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    // หากToken ไม่มีค่า [หมายถึง ไม่เคยสมัครมาก่อน ] ให้ไปหน้า Pre register ลงทะเบียน
    const token = localStorage.getItem("token");
    if (token == null || token == undefined || token == "") {
      return navigateTo({ path: "/auth/pre-register" });
    }
  }
  console.log('hello from is line login isRegister !')
});
