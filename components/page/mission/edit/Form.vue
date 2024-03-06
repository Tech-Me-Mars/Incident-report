<template>
    <div class="card p-3 mb-3">
        <div class="flex justify-between">
            <TmmTag color="#f0c424" class="rounded-xl mb-2">ลำดับที่ 1</TmmTag>
            <!-- <CloseCircleTwoTone @click="remove(index)" /> -->
        </div>
        <div class="grid grid-cols-1">
            <div class="mb-2">
                <TmmTypographyLabelForm label="ผู้รับผิดชอบ" />
                <TmmInput v-model:value="responsible_person" />
            </div>
        </div>
        <div class="my-1">
            <TmmTypographyLabelForm label="ระยะเวลาดำเนินงาน" />
        </div>
        <div class="grid grid-cols-2 gap-2">
            <div class="mb-2">
                <TmmTypographyLabelForm label="วันที่เริ่มต้น" />
                <TmmInputCalendar v-model="operating_period_start" />
            </div>
            <div class="mb-2">
                <TmmTypographyLabelForm label="วันที่สิ้นสุด" />
                <TmmInputCalendar v-model="operating_period_end" />
            </div>
        </div>
        <div class="grid grid-cols-1 mb-2">
            <div class="mb-2">
                <TmmTypographyLabelForm label="รายละเอียดงาน" />
                <TmmInputTextarea :rows="2" v-model:value="job_description" />
            </div>
            <div class="mb-2">
                <TmmTypographyLabelForm label="การดำเนินการ" />
                <TmmInputTextarea :rows="2" v-model:value="operation_detail" />
            </div>

        </div>
        <div class="flex flex-col gap-2 mb-2">
            <TmmTypographyLabelForm label="เอกสารที่เกี่ยวข้อง (ถ้ามี)" />
            <TmmInputUploadFile multiple v-model="documents" />
        </div>

        <div class="grid grid-cols-1 mb-2">
            <div class="mb-2">
                <TmmTypographyLabelForm label="สถานะดำเนินงาน" />
                <TmmInputDropDown v-model="bestChoice" placeholder="งานของฉัน" className="" :options="options"
                    class="w-full" value="id" label="name" />
            </div>
        </div>
        
    </div>


    <div class="flex gap-5 justify-center max-w-[20rem] mx-auto">
        <TmmButton type="primary" severity="secondary" className="w-full" label="ยกเลิก" />
        <TmmButton type="primary" severity="primary" className="w-full" htmlType="submit" label="บันทึก"
            @click="showModal" />
    </div>
    <div>
        <a-modal v-model:open="open" centered :footer="false" width="1000px">
            <div class="p-5">
                <div class="flex justify-center flex-col items-center mb-5">
                    <FrownOutlined class="mb-3" style="font-size: 120px; color: #fcc03f;" />
                    <h1 class="text-4xl" style="color: #f8b31e;">ERROR!</h1>
                </div>
                <h1 class="text-center text-xl font-medium mb-2">พล.ต.ท สมหมาย มีชัย</h1>
                <p class="text-center text-gray-500 text-md mb-2">ไม่สามารถเข้าร่วมโครงการได้ เนื่องจาก พล.ต.ท สมหมาย
                    มีชัย
                    มีแผนงานมากเกินไป</p>
                <div class="flex justify-center">
                    <TmmButton label="ตกลง" @click="open = false" type="primary" severity="warning"
                        className="w-[10rem]" size="large" />
                </div>
            </div>
        </a-modal>
    </div>
</template>

<script setup>
//! /////// [validation] /////////
const open = ref(false);
const showModal = () => {
    open.value = true;
};

import { useFieldArray, useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

const options = ref([
    {
        id: 1,
        name: 'อยู่ระหว่างดำเนินงาน',
    },
    {
        id: 2,
        name: 'ดำเนินงานเสร็จสิ้น',
    }
]);


const requireValue = "กรุณาระบุข้อมูล";
const validationSchema = toTypedSchema(
    zod.object({
        work_array: zod.array(
            zod.object({
                invoice_paid_status_id: zod.number({
                    required_error: 'กรุณาเลือกรูปแบบการชำระ',
                    invalid_type_error: "กรุณาเลือกรูปแบบการชำระ",
                }),
                due_date: zod.date({
                    required_error: requireValue,
                    invalid_type_error: requireValue,
                }),
                amount: zod.number({
                    required_error: requireValue,
                    invalid_type_error: "ราคาต้องเป็นตัวเลขเท่านั้น",
                }),
            })
        ),
    })
);
const { handleSubmit, errors } = useForm({
    initialValues: {
        work_array: [
            {
                order: 1,
                responsible_person: undefined,
                due_date: undefined,
                operating_period_start: undefined,
                operating_period_end: undefined,
                job_description: undefined,
                operation_detail: undefined,
                approve: false
            },
        ],
    },
    validationSchema,
});

// const { value:documents  } = useField("documents");
const { value: documents } = useField('documents', null, {
    initialValue: [] // กำหนดค่าเริ่มต้นที่นี่
})
const { value: responsible_person } = useField("responsible_person");
const { value: operating_period_start } = useField("operating_period_start");
const { value: operating_period_end } = useField("operating_period_end");
const { value: job_description } = useField("job_description");


const { remove, push, fields } = useFieldArray("work_array");
const onSubmit = handleSubmit((values) => {
    savePaymentMethod(values);
});
</script>