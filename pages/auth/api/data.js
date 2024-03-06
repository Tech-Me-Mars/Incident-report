import { request } from "@/service/AxiosService.js";
// GET PAYMENT METHOD
export function register(payload) {
  const url = `/api/v1/register`;
  return request("post", url, payload, true);
}


