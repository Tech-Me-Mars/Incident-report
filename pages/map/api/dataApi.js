import { request } from "@/service/AxiosService.js";
// GET PAYMENT METHOD

const map_key = useRuntimeConfig().public.MAP_KEY;
const urlLongdoService = "https://search.longdo.com"

export function getSearchLocation(keyword) {
  const url = `https://search.longdo.com/mapsearch/json/search?keyword=สยาม&area=10&span=50km&limit=20&key=cffdefc2f61c2b38e32abe2c7b7e19cd`;
  return request("get", url, {}, false);
}



export function getRadius() {
  const url = `/api/v2/map/radius_km`;
  return request("get", url, {}, true);
}

export function getReportType() {
  const url = `/api/v2/std/type_report`;
  return request("get", url, {}, true);
}

export function findMapAll() {
  const url = `/api/v2/map/longdo/all`;
  return request("get", url, {}, true);
}

export function findMapFilter(payload) {
  const url = `/api/v2/map/longdo`;
  return request("post", url, payload, true);
}

