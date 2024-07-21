import { request } from "@/service/AxiosService.js";
// GET PAYMENT METHOD
export function saveReport(payload) {
  const url = `/api/v1/report/`;
  return request("post", url, payload, false);
}


export function getPoliceEmployee() {
  const url = `/api/v1/std/police_employee`;
  return request("get", url, {}, true);
}

export function getPoliceHeadStation() {
  const url = `/api/v1/std/police_head_station`;
  return request("get", url, {}, true);
}

export function getInquiryEmp() {
  const url = `/api/v1/std/inquiry_employee`;
  return request("get", url, {}, true);
}

export function saveJobs(payload) {
  const url = `/api/v1/jobs`;
  return request("post", url, payload, true);
}

export function getUrgency() {
  const url = `/api/v1/jobs_level_of_urgency`;
  return request("get", url, {}, true);
}
export function getPriority() {
  const url = `/api/v1/jobs_level_priority`;
  return request("get", url, {}, true);
}

export function getSecret() {
  const url = `/api/v1/jobs_level_secret`;
  return request("get", url, {}, true);
}


export function getTypeFileUpload() {
  const url = `/api/v2/std/allow_file_upload`;
  return request("get", url, {}, true);
}
