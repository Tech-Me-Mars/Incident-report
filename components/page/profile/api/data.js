import { request } from "@/service/AxiosService.js";
// GET PAYMENT METHOD

export function getCheckNoRead(id) {
  const url = `/api/v1/jobs/chat/${id}/no_read_messages_count`;
  return request("get", url, {}, true);
}

export function getMyProfile() {
  const url = `/api/v1/profile/me`;
  return request("get", url, {}, true);
}

export function getMyJobs(page,row_per_page) {
  const url = `/api/v1/profile/my_jobs?page=${page}&row_per_page=${row_per_page}`;
  return request("get", url, {}, true);
}
export function getMyreport(page,row_per_page) {
  const url = `/api/v1/profile/my_report?page=${page}&row_per_page=${row_per_page}`;
  return request("get", url, {}, true);
}

export function getFillter() {
  const url = `/api/v1/dashboard/get_fillter`;
  return request("get", url, {}, true);
}

export function logout() {
  const url = `/api/auth/logout`;
  return request("post", url, {}, true);
}

export function getCheckConnectLineNotify() {
  const url = `/api/v2/connect/line_notify`;
  return request("get", url, {}, true);
}
