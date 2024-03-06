<template>
        <HeaderMenu class="flex justify-start items-center gap-5 sticky top-0 z-50">
        <p class="font-bold text-lg">ลงทะเบียน</p>
    </HeaderMenu>
    <section class="p-3">
        <div class="card p-3">
            <Form @submit="onSubmit">
                <div class="mb-5">
                    <TmmAvatarUpload class="flex justify-center" v-model="avar_image" />
                <div class="mb-2">
                    <TmmTypographyLabelForm label="สำนักงาน" />
                    <TmmInput />
                </div>
                <div class="mb-2">
                    <TmmTypographyLabelForm label="หน่วยงาน" />
                    <TmmInput />
                </div>
                <div class="mb-2">
                    <TmmTypographyLabelForm label="สถานี" />
                    <TmmInput />
                </div>
                <div class="mb-2">
                    <TmmTypographyLabelForm label="ตำแหน่ง" />
                    <TmmInput />
                </div>
                <div class="mb-2">
                    <TmmTypographyLabelForm label="ยศ" />
                    <TmmInput />
                </div>
                <div class="mb-2">
                    <TmmTypographyLabelForm label="ชื่อ" />
                    <TmmInput />
                </div>
                <div class="mb-2">
                    <TmmTypographyLabelForm label="นามสกุล" />
                    <TmmInput />
                </div>
                <div class="mb-2">
                    <TmmTypographyLabelForm label="วัน เดือน ปี เกิด" />
                    <TmmInputCalendar  />
                </div>
                </div>

                <div class="flex gap-5 justify-center max-w-[20rem] mx-auto">
                    <TmmButton type="primary" severity="secondary" className="w-full h-[2.5rem]" label="ยกเลิก" />
                    <TmmButton type="primary" severity="primary" className="w-full h-[2.5rem]" htmlType="submit" label="บันทึก" />
                </div>
            </Form>
        </div>
    </section>
</template>

<script setup>
//! /////// [Api Variable] /////////
import * as dataApi from './api/data.js'
//! /////// [validation import] /////////
import { useField, useForm, Form } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

const avar_image = ref(undefined)

const fileList = ref([]);
// const handleUpload = () => {
//     const formData = new FormData();
//     fileList.value.forEach(file => {
//         formData.append("plan_file[]", file, file.name);
//     });
//     formData.append("name", 'amm');
//     console.log([...formData])
//     console.log(formData)
// };

const plan_name = ref('โครงการสายตรวจเพื่อนประชาชน')
const planer = ref('พบ.ต.ท ยิ่งยศ ใจดี')
const approveper = ref('พล.ต.ล สมหวัง ใจแข็งแกร่ง')


const requireValue = "กรุณาระบุข้อมูล";
const validationSchema = toTypedSchema(
    zod.object({

    })
);
const { handleReset, handleSubmit, errors } = useForm({
    validationSchema
})

const { value: province } = useField("province");

const onSubmit = handleSubmit(async (values) => {
    console.log('values', values)
    // saveUsers(values);
});
const saveUsers = async (values) => {
    console.log(values)

    // const dataApi
}
const handleChange = async () => {
    console.log('fileList', fileList.value)
}
</script>
