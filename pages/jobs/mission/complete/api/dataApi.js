import { request } from "@/service/AxiosService.js";
// GET PAYMENT METHOD

// โหลดรายละเอียดคอมทั้งหน้า
export function getJobProcess(id) {
  const url = `/api/v1/jobs/jobs_process/${id}`;
  return request("get", url, {}, true);
}

export function getJobProcessDetail(id) {
  const url = `/api/v1/jobs_process/${id}`;
  return request("get", url, {}, true);
}

