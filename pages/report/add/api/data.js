import { request } from "@/service/AxiosService.js";
// GET PAYMENT METHOD

const map_key = useRuntimeConfig().public.MAP_KEY;
const urlLongdoService = "https://search.longdo.com"

export function getSearchLocation(keyword) {
  const url = `https://search.longdo.com/mapsearch/json/search?keyword=สยาม&area=10&span=50km&limit=20&key=cffdefc2f61c2b38e32abe2c7b7e19cd`;
  return request("get", url, {}, false);
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


export function getEmployeeSuggestion() {
  const url = `/api/v2/report/suggest/police_employee`;
  return request("get", url, {}, true);
}
