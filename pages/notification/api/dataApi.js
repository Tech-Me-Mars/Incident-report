import { request } from "@/service/AxiosService.js";
// GET PAYMENT METHOD

// โหลดรายละเอียดคอมทั้งหน้า
export function gerNotify() {
  const url = `/api/v1/notification`;
  return request("get", url, {}, true);
}

export function getNotifyById(id) {
  const url = `/api/v1/notification/${id}`;
  return request("get", url, {}, true);
}
