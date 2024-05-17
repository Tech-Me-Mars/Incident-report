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
