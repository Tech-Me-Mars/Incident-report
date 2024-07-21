import { request } from "@/service/AxiosService.js";
// GET PAYMENT METHOD

// โหลดรายละเอียดคอมทั้งหน้า
export function getCheckNoRead(id) {
  const url = `/api/v1/jobs/chat/${id}/no_read_messages_count`;
  return request("get", url, {}, true);
}

export function getDashboardJobs(date, filter) {
  let url = `/api/v1/dashboard/calendar?date=${date}`;
  if (filter) {
    url = url + `&filter=${filter}`
  }
  return request("get", url, {}, true);
}

export function getFillter() {
  const url = `/api/v1/dashboard/get_fillter`;
  return request("get", url, {}, true);
}
