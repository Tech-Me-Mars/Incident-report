<template>
    <div>
        dd
    </div>
</template><script setup>
import {z} from 'zod';

// Schema สำหรับฟิลด์แต่ละฟิลด์
const schema = z.array(
  z.object({
    setting_approve: z.optional(z.any()),
    responsible_employee_id: z.optional(z.any()),
    responsible_employee_fullname: z.optional(z.any()),
    date_start: z.optional(z.union([z.string().datetime(), z.undefined()])),
    date_end: z.optional(z.any()),
    text_jobs_process_detail: z.optional(z.any()),
  }).refine(data => {
    // ใส่เงื่อนไขในการ validate date_start
    // ตัวอย่าง: ถ้า responsible_employee_id ถูกกำหนด date_start ต้องถูกกำหนดด้วย
    if (data.responsible_employee_id !== undefined && data.date_start === undefined) {
      return false;
    }
    return true;
  }, {
    message: 'date_start ต้องถูกกำหนดเมื่อ responsible_employee_id ถูกกำหนด',
    path: ['date_start'],
  })
);

// ทดสอบ validate
const work_array = [
  {
    setting_approve: undefined,
    responsible_employee_id: 123,
    responsible_employee_fullname: undefined,
    date_start: "2023-06-01T00:00:00Z",
    date_end: undefined,
    text_jobs_process_detail: undefined,
  },
  {
    setting_approve: undefined,
    responsible_employee_id: undefined,
    responsible_employee_fullname: undefined,
    date_start: undefined,
    date_end: undefined,
    text_jobs_process_detail: undefined,
  },
  {
    setting_approve: undefined,
    responsible_employee_id: 456,
    responsible_employee_fullname: undefined,
    date_start: undefined, // จะทำให้ validate ไม่ผ่าน
    date_end: undefined,
    text_jobs_process_detail: undefined,
  }
];

try {
  schema.parse(work_array);
  console.log('Validation passed');
} catch (e) {
  console.error(e.errors);
}

</script>