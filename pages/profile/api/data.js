import { request } from "@/service/AxiosService.js";


export function getPointSummary() {
  const url = `/api/v1/profile/jobs_point_summary`;
  return request("get", url, {}, true);
}
