import { request } from "@/service/AxiosService.js";
// const apiUrl = useRuntimeConfig().public.URL_API;

export function getProfile() {
   const url = `/api/v1/profile/me`;
   return request("get", url, {}, true);
}