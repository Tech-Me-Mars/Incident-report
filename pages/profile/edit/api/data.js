import { request } from "@/service/AxiosService.js";
// GET PAYMENT METHOD
export function register(payload) {
  const url = `/api/auth/register_line`;
  return request("post", url, payload, true);
}

export function getPoliceRank() {
  const url = `/api/v1/public/std/police_rank`;
  return request("get", url, {}, true);
}


export function getHeadquarters() {
  const url = `/api/v1/public/std/location/headquarters`;
  return request("get", url, {}, true);
}
export function getDivision(id) {
  const url = `/api/v1/public/std/location/division/${id}`;
  return request("get", url, {}, true);
}
export function getStation(id) {
  const url = `/api/v1/public/std/location/station/${id}`;
  return request("get", url, {}, true);
}
export function lineLogin(payload) {
  const url = `/api/auth/login_line`;
  return request("post", url, payload, false);
}

export function getProfileMe(id) {
  const url = `/api/v1/profile/me`;
  return request("get", url, {}, true);
}


export function updateProfile(payload) {
  const url = `/api/v1/profile/me`;
  return request("post", url, payload, true);
}


