import { request } from "@/service/AxiosService.js";
// GET PAYMENT METHOD

// โหลดรายละเอียดคอมทั้งหน้า
export function getTerms() {
  const url = `/api/v1/terms_privacy?data=terms`;
  return request("get", url, {}, true);
}

