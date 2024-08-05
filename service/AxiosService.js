import axios from "axios";
import liff from "@line/liff";
// const config = useRuntimeConfig();
// axios.defaults.baseURL = "https://api_incident_report.tech-me-mars.com";
// axios.defaults.baseURL = "https://api.eop-thaipolice.com"; //
axios.defaults.baseURL = "https://uat-api.eop-thaipolice.com"; //uat


const getToken = function () {
  return localStorage.getItem("token");
};

const getLang = () => {
  const Lang = localStorage.getItem("defaultlangguage") === "en-US" ? "en" : "th";
  return Lang;
}
export async function request(method, url, data, auth = true, type = 'json') {

  const headers = {
    // en or th
    "Accept-Language": getLang(), // Set Accept-Language header to 'th' (or adjust as needed)
  };
  if (auth) {
    headers["Authorization"] = `Bearer ${getToken()}`;
  }
  const isloadingAxi = useState("isloadingAxi", () => true);
  isloadingAxi.value = true;
  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
      responseType: type // กำหนด responseType เป็น 'stream,json,blob'
    });
    if (response) {
      isloadingAxi.value = false;
    }
    isloadingAxi.value = false;
    return response;
  } catch (error) {
    isloadingAxi.value = false;
    // Handle other errors or exceptions, if necessary
    console.error("request catch (error) ", error);

    // [[ กรณีกรอกรหัสผิด return 401]] 
    if (error.response.status === 401) {
      // if (liff.isLoggedIn()) {
      //   liff.logout();
      // }
      // หาก401 (token หมดเวลา) ให้Logout line แล้วLogin=>init ใหม่
      console.log("Login รหัสผ่านผิด | Token ไม่ถูกต้อง | ไม่มี Token");
      localStorage.removeItem("token");
      await navigateTo("/auth/login-line");
    } else if (error.response.status === 422) {
      console.log("ติด validate");
    } else if (error.response.status === 500) {
      console.log("catch 500");
      console.log(error.response);
    }

    throw error;
  }
}
