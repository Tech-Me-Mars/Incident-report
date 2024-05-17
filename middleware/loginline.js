import liff from "@line/liff";

export default defineNuxtRouteMiddleware(async (to, from) => {

  if (process.client) {

    const tokenline = localStorage.getItem("tokenline");
    if (tokenline == null || tokenline == undefined || tokenline == "") {
      return navigateTo({ path: "/auth/login-line" });
    }
  }
  console.log("hello from is line login Middleware !");
});
