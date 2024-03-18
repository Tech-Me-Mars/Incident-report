<script setup>
//! /////// [Api Variable] /////////
import * as dataApi from './api/data.js'
//! /////// [validation import] /////////
import { useField, useForm, Form, useFieldArray } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { format } from "date-fns";
import * as zod from "zod";
const isloadingAxi = useState('isloadingAxi')



const open = ref(false);
const showModal = () => {
    handleUpload()
    open.value = true;
};




const plan_name = ref('โครงการสายตรวจเพื่อนประชาชน')
const planer = ref('พบ.ต.ท ยิ่งยศ ใจดี')
const approveper = ref('พล.ต.ล สมหวัง ใจแข็งแกร่ง')


const requireValue = "กรุณาระบุข้อมูล";
const validationSchema = toTypedSchema(
    zod.object({
        police_province_id: zod.number({
            required_error: requireValue,
            invalid_type_error: requireValue,
        }),
        station_id: zod.number({
            required_error: requireValue,
            invalid_type_error: requireValue,
        }),
        name: zod.string().nonempty(requireValue).default(""),
        date_incident: zod.date({
            required_error: requireValue,
            invalid_type_error: requireValue,
        }),
        time_incident: zod.date({
            required_error: requireValue,
            invalid_type_error: requireValue,
        }),
        locale: zod.string().nonempty(requireValue).default(""),
        sufferer: zod.string().nonempty(requireValue).default(""),
        accuser: zod.string().nonempty(requireValue).default(""),
        property: zod.string().nonempty(requireValue).default(""),
        text_details: zod.string().nonempty(requireValue).default(""),
        station_head_user_id: zod.string().nonempty(requireValue).default(""),
        station_head_user_name: zod.string().nonempty(requireValue).default(""),
        station_head_user_Tel: zod.string().nonempty(requireValue).default(""),
        note: zod.string().nonempty(requireValue).default(""),
        inquiry_user_id: zod.string().nonempty(requireValue).default(""),
        expenses: zod.string().nonempty(requireValue).default(""),
        news_like_sum: zod.number({
            required_error: requireValue,
            invalid_type_error: requireValue,
        }),
        // image_detail: zod.custom((value) => {
        //     if (isEdit.value === true) {
        //         return value;
        //     }
        //     return Array.isArray(value) && value.length > 0 ? value : null;
        // }),
        // image_detail_expenses: zod.custom((value) => {
        //     if (isEdit.value === true) {
        //         return value;
        //     }
        //     return Array.isArray(value) && value.length > 0 ? value : null;
        // }),

    })
);

const { handleReset, handleSubmit, errors } = useForm({
    validationSchema
})


const { value: police_province_id } = useField("police_province_id");
const { value: station_id } = useField("station_id");
const { value: name } = useField("name");
const { value: date_incident } = useField("date_incident");
const { value: time_incident } = useField("time_incident");
const { value: locale } = useField("locale");
const { value: sufferer } = useField("sufferer");
const { value: accuser } = useField("accuser");
const { value: property } = useField("property");
const { value: text_details } = useField("text_details");
const { value: station_head_user_id } = useField("station_head_user_id");
const { value: station_head_user_name } = useField("station_head_user_name");
const { value: station_head_user_Tel } = useField("station_head_user_Tel");
const { value: note } = useField("note");
const { value: inquiry_user_id } = useField("inquiry_user_id");
const { value: expenses } = useField("expenses");
const { value: news_like_sum } = useField("news_like_sum");
const { value: image_detail } = useField("image_detail", null, {
    initialValue: [] // กำหนดค่าเริ่มต้นที่นี่
});
const { value: image_detail_expenses } = useField("image_detail_expenses", null, {
    initialValue: [] // กำหนดค่าเริ่มต้นที่นี่
});

const onSubmit = handleSubmit((values) => {
    saveReport(values);
});

const saveReport = async () => {
    const formData = new FormData();
    data.append('police_province_id', '1');
    data.append('station_id', '1');
    data.append('name', '');
    data.append('date_incident', '');
    data.append('time_incident', '');
    data.append('locale', '');
    data.append('sufferer', '');
    data.append('accuser', '');
    data.append('property', '');
    data.append('text_details', '');
    data.append('station_head_user_id', '');
    data.append('station_head_user_name', '');
    data.append('station_head_user_Tel', '');
    data.append('note', '');
    data.append('inquiry_user_id', '');
    data.append('expenses', '');
    data.append('news_like_sum', '');
    image_detail.value.forEach(file => {
        formData.append("image_detail[]", file, file.name);
    });
    image_detail_expenses.value.forEach(file => {
        formData.append("image_detail_expenses[]", file, file.name);
    });
    console.log([...formData])
    console.log(formData)

}

const handleUpload = () => {
    console.log('image_detail', image_detail.value);
    const formData = new FormData();
    image_detail.value.forEach(file => {
        formData.append("image_detail[]", file, file.name);
    });
    formData.append("name", 'amm');
    console.log([...formData])
    console.log(formData)
};

const handleChange = async () => {
    console.log('image_detail', image_detail.value)
}

</script>
<template>
    <Form @submit="onSubmit">
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
                <TmmInputTimePicker v-model="time_incident" />
            </div>
            <div class="mb-2">
                <TmmTypographyLabelForm label="สถานที่เกิดเหตุ" />
                <TmmInputTextarea v-model="locale" />
            </div>
            <div class="mb-2">
                <TmmTypographyLabelForm label="ผู้ต้องหา" />
                <TmmInput v-model="accuser" />
            </div>
            <div class="mb-2">
                <TmmTypographyLabelForm label="ทรัพย์สินถูกประทุร้าย (ถ้ามี)" />
                <TmmInput />
            </div>
            <div class="mb-2">
                <TmmTypographyLabelForm label="พฤติการณ์แห่งคดีโดยย่อ" />
                <TmmInputTextarea v-model="text_details" />
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
                <TmmInputUploadFile multiple maxCount="1" v-model="image_detail" />
            </div>
        </div>

        <!-- <button @click="handleChange()">test</button> -->

        <div class="flex flex-col card p-3 mb-7">
            <TmmTypographyLabelForm label="เอกสารที่เกี่ยวข้อง (ถ้ามี)" />
            <TmmInputUploadFile v-model="image_detail_expenses" :multiple="true" accept="image/*" :maxCount="1" />
        </div>

        <div class="flex gap-5 justify-center max-w-[20rem] mx-auto">
            <TmmButton type="primary" severity="secondary" className="w-full rounded-xl" label="ยกเลิก" />
            <TmmButton type="primary" severity="primary" className="w-full rounded-xl" htmlType="submit" label="บันทึก"
                @click="showModal" />
        </div>
    </Form>
</template>