import { request } from "@/service/AxiosService.js";
// GET PAYMENT METHOD
export function register(payload) {
  const url = `/api/auth/register_line`;
  return request("post", url, payload, true);
}

export function getPoliceRank() {
  const url = `/api/v1/policerank`;
  return request("get", url, {}, true);
}


export function getHeadquarters() {
  const url = `/api/v1/location/headquarters`;
  return request("get", url, {}, true);
}
export function getDivision(id) {
  const url = `/api/v1/location/division/${id}`;
  return request("get", url, {}, true);
}
export function getStation(id) {
  const url = `/api/v1/location/station/${id}`;
  return request("get", url, {}, true);
}

