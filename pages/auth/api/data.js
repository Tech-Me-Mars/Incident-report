import { request } from "@/service/AxiosService.js";
// GET PAYMENT METHOD
export function register(payload) {
  const url = `/api/auth/register_line_v2`;
  return request("post", url, payload, false);
}


export function optRequest(payload) {
  const url = `/api/v2/otp/request`;
  return request("post", url, payload, false);
}

export function optCheck(payload) {
  const url = `/api/v2/otp/check`;
  return request("post", url, payload, false);
}

export function registerLineOtp(payload) {
  const url = `/api/v2/register_line_otp`;
  return request("post", url, payload, false);
}

export function getPoliceRank() {
  const url = `/api/v1/public/std/police_rank`;
  return request("get", url, {}, false);
}


export function getHeadquarters() {
  const url = `/api/v1/public/std/location/headquarters`;
  return request("get", url, {}, false);
}
export function getDivision(id) {
  const url = `/api/v1/public/std/location/division/${id}`;
  return request("get", url, {}, false);
}
export function getStation(id) {
  const url = `/api/v1/public/std/location/station/${id}`;
  return request("get", url, {}, false);
}
export function lineLogin(payload) {
  const url = `/api/auth/login_line`;
  return request("post", url, payload, false);
}

export function getPolicePosition() {
  const url = `/api/v1/public/std/police_position`;
  return request("get", url, {}, false);
}





