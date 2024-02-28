import { request } from "@/service/AxiosService.js";
// const apiUrl = useRuntimeConfig().public.URL_API;

export function checkRegister() {
   const url = `/api/crm/v1/check_register`;
   return request("get", url, {}, true);
}