<script setup>
const fileList = ref([]);

const open = ref(false);
const showModal = () => {
    handleUpload()
    open.value = true;
};

const handleUpload = () => {
    const formData = new FormData();
    fileList.value.forEach(file => {
        formData.append("plan_file[]", file, file.name);
    });
    formData.append("name", 'amm');
    console.log([...formData])
    console.log(formData)
};

//! /////// [validation] /////////
import { useFieldArray, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

const plan_name = ref('โครงการสายตรวจเพื่อนประชาชน')
const planer = ref('พบ.ต.ท ยิ่งยศ ใจดี')
const approveper = ref('พล.ต.ล สมหวัง ใจแข็งแกร่ง')


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
                plan_detail: undefined
            },
        ],
    },
    validationSchema,
});
const { remove, push, fields } = useFieldArray("work_array");
const onSubmit = handleSubmit((values) => {
    savePaymentMethod(values);
});
const handleChange = async () => {
    console.log('fileList', fileList.value)
}
</script>
<template>
    <TmmLabelSubtitle class="text-gray-500" label="รายงานเหตุ" />
    <div class="card p-3 mb-3">
        <div class="mb-2">
            <TmmTypographyLabelForm label="ภ.จว" />
            <TmmInput />
        </div>
        <div class="mb-2">
            <TmmTypographyLabelForm label="รายงานเหตุ" />
            <TmmInput />
        </div>
        <div class="mb-2">
            <TmmTypographyLabelForm label="พื้นที่ สน./สภ" />
            <TmmInput />
        </div>
    </div>

    <TmmLabelSubtitle class="text-gray-500" label="ข้อมูลเหตุ" />
    <div class="card p-3 mb-3">
        <div class="mb-2">
            <TmmTypographyLabelForm label="วันที่เกิดเหตุ" />
            <TmmInputCalendar placeholder="เลือกวันที่" />
        </div>
        <div class="mb-2">
            <TmmTypographyLabelForm label="เวลาเกิดเหตุ" />
            <TmmInputTimePicker />
        </div>
        <div class="mb-2">
            <TmmTypographyLabelForm label="สถานที่เกิดเหตุ" />
            <TmmInputTextarea />
        </div>
        <div class="mb-2">
            <TmmTypographyLabelForm label="ผู้ต้องหา" />
            <TmmInput />
        </div>
        <div class="mb-2">
            <TmmTypographyLabelForm label="ทรัพย์สินถูกประทุร้าย (ถ้ามี)" />
            <TmmInput />
        </div>
        <div class="mb-2">
            <TmmTypographyLabelForm label="พฤติการณ์แห่งคดีโดยย่อ" />
            <TmmInputTextarea />
        </div>
        <div class="mb-2">
            <TmmTypographyLabelForm label="ชื่อหัวหน้าสถานี" />
            <TmmInput />
        </div>
        <div class="mb-2">
            <TmmTypographyLabelForm label="เบอร์โทรหัวหน้าสถานี" />
            <TmmInput />
        </div>
        <div class="mb-2">
            <TmmTypographyLabelForm label="พนักงานสอบสวนผู้รับผิดชอบ" />
            <TmmInput />
        </div>
        <div class="mb-2">
            <TmmTypographyLabelForm label="เบอร์โทรพนักงานสอบสวนผู้รับผิดชอบ" />
            <TmmInput />
        </div>
    </div>

    <TmmLabelSubtitle class="text-gray-500" label="ข้อมูลผู้รายงานเหตุ" />
    <div class="card p-3 mb-3">
        <div class="mb-2">
            <TmmTypographyLabelForm label="ผู้รายงาน" />
            <TmmInput />
        </div>
        <div class="mb-2">
            <TmmTypographyLabelForm label="พนง.วิทยุ บก./ภ.จว" />
            <TmmInput />
        </div>
        <div class="mb-2">
            <TmmTypographyLabelForm label="เบอร์โทร" />
            <TmmInput />
        </div>
        <div class="mb-2">
            <TmmTypographyLabelForm label="หมายเหตุ" />
            <TmmInput />
        </div>
    </div>

    <TmmLabelSubtitle class="text-gray-500" label="ข้อมูลค่าใช้จ่าย" />
    <div class="card p-3 mb-3">
        <div class="mb-2">
            <TmmTypographyLabelForm label="ค่าใช้จ่าย" />
            <TmmInputNumber />
        </div>
        <div class="flex flex-col">
            <TmmTypographyLabelForm label="เอกสารค่าใช้จ่าย" />
            <TmmInputUploadFile v-model="fileList" />
        </div>
    </div>

    <button @click="handleChange()">test</button>

    <div class="flex flex-col card p-3 mb-7">
        <TmmTypographyLabelForm label="เอกสารที่เกี่ยวข้อง (ถ้ามี)" />
        <TmmInputUploadFile v-model="fileList" />
    </div>

    <div class="flex gap-5 justify-center max-w-[20rem] mx-auto">
        <TmmButton type="primary" severity="secondary" className="w-full rounded-xl" label="ยกเลิก" />
        <TmmButton type="primary" severity="primary" className="w-full rounded-xl" htmlType="submit" label="บันทึก"
            @click="showModal" />
    </div>
</template>