import { request } from "@/service/AxiosService.js";
// GET PAYMENT METHOD
export function saveReport(payload) {
  const url = `/api/v1/report/`;
  return request("post", url, payload, false);
}


export function getNews() {
  const url = `/api/v1/news`;
  return request("get", url, {}, true);
}

export function getNewsLazy(payload) {
  const url = `/api/v1/news/lazyload`;
  return request("post", url, payload, true);
}
export function likeOrDislike(payload) {
  const url = `/api/v1/news/like_dislike`;
  return request("post", url, payload, true);
}
export function loadPostById(id) {
  const url = `/api/v1/news/${id}`;
  return request("get", url, {}, true);
}

