import { request } from "@/service/AxiosService.js";
// GET PAYMENT METHOD


export function updateProcessDateEnd(payload,id) {
  const url = `/api/v1/jobs_process/date_end/${id}`;
  return request("put", url, payload, true);
}

export function getJobProcessById(id) {
  const url = `/api/v1/jobs/jobs_process/${id}`;
  return request("get", url, {}, true);
}

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

export function updateProcessImage(payload) {
  const url = `/api/v1/jobs_process/attachment_file`;
  return request("post", url, payload, true);
}

export function deleteProcessImage(id) {
  const url = `/api/v1/jobs_process/attachment_file/${id}`;
  return request("delete", url, {}, true);
}

export function updateJobProcess(payload,id) {
  const url = `/api/v1/jobs_process/${id}`;
  return request("put", url, payload, true);
}

export function getTypeExpense() {
  const url = `/api/v2/std/type_expense`;
  return request("get", url, {}, true);
}

export function deleteProcessAttachmentExpense(id) {
  const url = `/api/v1/jobs_process/attachment_file_expense/${id}`;
  return request("delete", url, {}, true);
}

export function updateProcessAttachmentExpense(payload,id) {
  const url = `/api/v1/jobs_process/attachment_file_expense/${id}`;
  return request("post", url, payload, true);
}

export function insertProcessAttachmentExpense(payload) {
  const url = `/api/v1/jobs_process/attachment_file_expense`;
  return request("post", url, payload, true);
}




