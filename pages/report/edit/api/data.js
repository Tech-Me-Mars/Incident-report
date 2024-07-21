import { request } from "@/service/AxiosService.js";
// GET PAYMENT METHOD
const config = useRuntimeConfig();
config.public.URL_API;
export function genWordPublic(id) {
  return `${config.public.URL_API}/api/v1/public/export/report/${id}/word`;

  return request("get", url, {}, true,'stream');
}
export function getReportByIdV2(id) {
  const url = `/api/v2/report/${id}`;
  return request("get", url, {}, true);
}
export function saveReport(payload) {
  const url = `/api/v1/report/`;
  return request("post", url, payload, true);
}
export function saveReportV2(payload) {
  const url = `/api/v2/report/`;
  return request("post", url, payload, true);
}

export function getNation() {
  const url = `/api/v2/std/country_nationality`;
  return request("get", url, {}, true);
}


export function getCheckConnectLineNotify() {
  const url = `/api/v2/connect/line_notify`;
  return request("get", url, {}, true);
}
export function getTypeGroupImage() {
  const url = `/api/v2/std/type_group_image`;
  return request("get", url, {}, true);
}

export function getPoliceProvince() {
  const url = `/api/v1/std/police_province`;
  return request("get", url, {}, true);
}

export function getTypeReport() {
  const url = `/api/v2/std/type_report`;
  return request("get", url, {}, true);
}
export function getTypeDamage() {
  const url = `/api/v2/std/type_damage`;
  return request("get", url, {}, true);
}

export function getTypeProperty() {
  const url = `/api/v2/std/type_property`;
  return request("get", url, {}, true);
}

export function getVehicle() {
  const url = `/api/v2/std/type_vehicle`;
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

export function getSeniorPolice() {
  const url = `/api/v2/std/senior_police_control_duty`;
  return request("get", url, {}, true);
}


export function getMyProfile() {
  const url = `/api/v1/profile/me`;
  return request("get", url, {}, true);
}