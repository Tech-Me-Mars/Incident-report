import { request } from "@/service/AxiosService.js";
// GET PAYMENT METHOD
export function saveReport(payload) {
  const url = `/api/v1/report/`;
  return request("post", url, payload, true);
}

export function getReportById(id) {
  const url = `/api/v1/report/${id}`;
  return request("get", url, {}, true);
}




export function getPoliceProvince() {
  const url = `/api/v1/std/police_province`;
  return request("get", url, {}, true);
}
export function getMyStation() {
  const url = `/api/v1/std/location/my_station`;
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

export function getMyProfile() {
  const url = `/api/v1/profile/me`;
  return request("get", url, {}, true);
}