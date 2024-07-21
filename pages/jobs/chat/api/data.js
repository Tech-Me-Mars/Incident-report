import { request } from "@/service/AxiosService.js";
// GET PAYMENT METHOD
export function saveReport(payload) {
  const url = `/api/v1/report/`;
  return request("post", url, payload, false);
}

export function getJobProccessById(id) {
  const url = `/api/v1/jobs/jobs_process/${id}`;
  return request("get", url, {}, true);
}


export function getParticipant(id) {
  const url = `/api/v1/jobs/chat/${id}/participant`;
  return request("get", url, {}, true);
}

export function getMessage(payload,id) {
  const url = `/api/v1/jobs/chat/${id}/messages`;
  return request("post", url, payload, true);
}

export function sendMessage(payload) {
  const url = `/api/v1/jobs/chat/messages`;
  return request("post", url, payload, true);
}
export function getMyProfile() {
  const url = `/api/v1/profile/me`;
  return request("get", url, {}, true);
}

export function updateMessage(payload,id) {
  const url = `/api/v1/jobs/chat/messages/${id}`;
  return request("put", url, payload, true);
}

export function deleteMessage(id) {
  const url = `/api/v1/jobs/chat/messages/${id}`;
  return request("delete", url, {}, true);
}

