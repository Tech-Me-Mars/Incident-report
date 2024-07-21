import { request } from "@/service/AxiosService.js";
// GET PAYMENT METHOD

// โหลดรายละเอียดคอมเม้นทั้งหน้า
export function getJobProcessNoteById(id) {
  const url = `/api/v1/jobs_process_note/${id}`;
  return request("get", url, {}, true);
}


// เพิ่มรูปในคอมเม้น
export function addJobProcessImage(payload) {
  const url = `/api/v1/jobs_process_note_image`;
  return request("post", url, payload, true);
}

// ลบรูปในคอมเม้น
export function delJobProcessImage(id) {
  const url = `/api/v1/jobs_process_note_image/${id}`;
  return request("delete", url, {}, true);
}


// ลบคอมเม้น
export function delJobNote(id) {
  const url = `/api/v1/jobs_process_note/${id}`;
  return request("delete", url, {}, true);
}


// เพิ่มคอมเม้น
export function saveComment(payload) {
  const url = `/api/v1/jobs_process_note`;
  return request("post", url, payload, true);
}

//แก้ไขข้อมความใน comment
export function updateTextComment(payload, id) {
  const url = `/api/v1/jobs_process_note/${id}`;
  return request("put", url, payload, true);
}



export function getCatagortNote() {
  const url = `/api/v1/jobs_process_note_category`;
  return request("get", url, {}, true);
}
