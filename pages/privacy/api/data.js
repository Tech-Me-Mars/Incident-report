import { request } from "@/service/AxiosService.js";
// GET PAYMENT METHOD

// โหลดรายละเอียดคอมทั้งหน้า
export function getprivacy() {
  const url = `/api/v1/terms_privacy?data=privacy`;
  return request("get", url, {}, true);
}

