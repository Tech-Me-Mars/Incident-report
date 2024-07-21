import { request } from "@/service/AxiosService.js";


export function getPublicNewsLazy(payload) {
  const url = `/api/v1/public/news/lazyload`;
  return request("post", url, payload, false);
}


export function getPublicNewsById(id) {
  const url = `/api/v1/public/news/${id}`;
  return request("get", url, {}, false);
}



