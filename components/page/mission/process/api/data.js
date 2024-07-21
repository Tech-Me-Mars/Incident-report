import { request } from "@/service/AxiosService.js";

export function getJobPdf(id) {
  const url = `/api/v1/export/jobs/pdf/${id}`;
  return request("get", url, {}, true);
}
