import { request } from "@/service/AxiosService.js";

export function getReportPdf(id) {
  const url = `/api/v1/export/report/pdf/${id}`;
  return request("get", url, {}, true,'blob');
}

export function getReportPdfV2(id) {
  const url = `/api/v1/export/report/${id}/pdf`;
  return request("get", url, {}, true,'blob');
}

