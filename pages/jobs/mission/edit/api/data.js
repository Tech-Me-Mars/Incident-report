import { request } from "@/service/AxiosService.js";
// GET PAYMENT METHOD

// โหลดรายละเอียด
export function getJobProcess(id) {
  const url = `/api/v1/jobs_process/${id}`;
  return request("get", url, {}, true);
}

export function getJobStatusProcess() {
  const url = `/api/v1/jobs_status_process`;
  return request("get", url, {}, true);
}

export function getJobStatusProcessApprove() {
  const url = `/api/v1/jobs_status_process_approve`;
  return request("get", url, {}, true);
}

export function addProcessImage(payload) {
  const url = `/api/v1/jobs_process_image`;
  return request("post", url, payload, true);
}

export function deleteProcessImage(id) {
  const url = `/api/v1/jobs_process_image/${id}`;
  return request("delete", url, {}, true);
}

export function updateJobProcess(payload,id) {
  const url = `/api/v1/jobs_process/${id}`;
  return request("put", url, payload, true);
}




