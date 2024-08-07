<template>
    <HeaderMenu class="flex justify-start items-center gap-5 sticky top-0 z-50">
        <p class="font-bold text-lg pl-3">ลงทะเบียน</p>
    </HeaderMenu>
    <section class="p-3">
        <img src="@/public/image/icon/label-police.png" class="w-full max-w-[40rem] max-h-[5rem] mb-2"></img>
        <div class="card p-3">
            <Form @submit="onSubmit">

                <div class="mb-5">

                    <!-- <div class="flex justify-center">
                        <TmmAvatarUpload class=" mx-auto" v-model="upload_avatar" />
                    </div> -->
                    <!-- <span v-if="upload_avatar">{{ JSON.stringify(upload_avatar[0]) }}</span> -->
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="เลขบัตรประชาชน" />
                        <TmmInput v-model="cid" class="" :error="errors.cid" />
                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="เบอร์โทร" />
                        <TmmInputPhon v-model="phone" :error="errors.phone" />
                    </div>


                </div>

                <div class="flex gap-5 justify-center max-w-[20rem] mx-auto">
                    <!-- <TmmButton type="primary" severity="secondary" className="w-full h-[2.5rem]" label="ยกเลิก" /> -->
                    <TmmButton type="primary" severity="primary" className="w-full h-[2.5rem]" htmlType="submit"
                        label="บันทึก" />
                </div>
            </Form>
        </div>
    </section>


    <TmmAlertToast :data="alertToast" :error="errorAlert" :dataError="dataError" />
</template>

<script setup>
definePageMeta({
    middleware: ["loginline"],
    layout: 'registerLayout'
})
useHead({ title: 'ยืนยันตัวตน' });
//! /////// [Api Variable] /////////
import * as dataApi from './api/data.js'
//! /////// [validation import] /////////
import { useField, useForm, Form } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { format } from "date-fns";
import * as zod from "zod";
const isloadingAxi = useState('isloadingAxi')
const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({})

onMounted(() => {
    // loadPolicePosition();
})

const resPolicePosition = ref();
const loadPolicePosition = async () => {
    try {
        const res = await dataApi.getPolicePosition();
        resPolicePosition.value = res.data.data;
        resPolicePosition.value = resPolicePosition.value.map((e, i) => ({
            ...e,
            indexkey: i + 1,
        }));
    } catch (error) {
        console.error(error)
    }
};


const changeImg = (event) => {
    console.log('changeImg' + upload_avatar.value[0])
    console.log(event)
}

const requireValue = "กรุณาระบุข้อมูล";
const validationSchema = toTypedSchema(
    zod.object({
        cid: zod.string().max(13, requireValue).min(13, requireValue).nonempty(requireValue).default(""),
        phone: zod.string().min(14, requireValue).max(14, requireValue).nonempty().default(""),

        // upload_avatar: zod.custom((value) => {
        //     if (value != null && (Array.isArray(value) ? value.length > 0 : true)) {
        //         return value;
        //     }
        // }),
        // phone_no: zod.string().nonempty(requireValue).default(""),
        // position_id: zod.number({
        //     required_error: requireValue,
        //     invalid_type_error: requireValue,
        // }),
        // title_name: zod
        //     .string({
        //         required_error: requireValue,
        //         invalid_type_error: requireValue,
        //     })
        //     .nonempty(requireValue)
        //     .default(""),
        // status: zod
        //     .number({
        //         required_error: requireValue,
        //         invalid_type_error: requireValue,
        //     })
        //     .nullable(),
        // sex: zod.number({
        //     required_error: requireValue,
        //     invalid_type_error: requireValue,
        // }),
    })
);
const { handleReset, handleSubmit, errors } = useForm({
    validationSchema
})


const { value: cid } = useField("cid");
const { value: phone } = useField("phone");
// const { value: upload_avatar } = useField("upload_avatar");


// ********** [[ ยศตำแหน่ง]] *********************
// *********************************** [[จบโหลด ยศตำแหน่ง]] ***************************

const onSubmit = handleSubmit(async (values) => {
    saveUsers(values);
});
const saveUsers = async (values) => {
    try {

        const phone_no_string = phone.value.replace(/\D/g, ""); //แปลงให้เหลือแต่ตัวเลข
        // // console.log('changeImg' + upload_avatar.value.file)
        // const formData = new FormData();
        // formData.append('line_get_id_token', localStorage.getItem("tokenline"));
        // formData.append('cid', cid.value);
        // formData.append('phone', phone_no_string);

        // if (upload_avatar.value) {
        //     formData.append('upload_avatar', upload_avatar?.value[0].originFileObj);
        // }
        const payload = {
            cid: cid.value,
            phone: phone_no_string
        }
        const res = await dataApi.optRequest(payload)
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };

        sessionStorage.setItem('cid', cid.value);
        sessionStorage.setItem('phone', res.data.data?.phone_no);
        sessionStorage.setItem('ref_code', res.data.data?.ref_code);
        sessionStorage.setItem('expires_at', res.data.data?.expires_at);
        sessionStorage.setItem('text_hint_otp', res.data.data?.text_hint_otp);

        handleReset();
        navigateTo(`/auth/otp`)

    } catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }

    // const dataApi
}

</script>
