import { request } from "@/service/AxiosService.js";
// GET PAYMENT METHOD

// โหลดรายละเอียดคอมทั้งหน้า
export function getDashboardJobs(date) {
  const url = `/api/v1/dashboard/calendar?date=${date}`;
  return request("get", url, {}, true);
}

