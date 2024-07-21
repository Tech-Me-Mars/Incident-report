import { request } from "@/service/AxiosService.js";
// const apiUrl = useRuntimeConfig().public.URL_API;

export function getProfile() {
   const url = `/api/v1/profile/me`;
   return request("get", url, {}, true);
}


export function getMyProfile() {
  const url = `/api/v1/profile/me`;
  return request("get", url, {}, true);
}
export function getNotifyCount() {
  const url = `/api/v1/notification/count`;
  return request("get", url, {}, true);
}
