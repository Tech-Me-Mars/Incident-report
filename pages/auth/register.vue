<template>
    <HeaderMenu class="flex justify-start items-center gap-5 sticky top-0 z-50">
        <p class="font-bold text-lg">ลงทะเบียน</p>
    </HeaderMenu>
    <section class="p-3">
        <div class="card p-3">
            <Form @submit="onSubmit">

                <div class="mb-5">

                    <div class="flex justify-center">
                        <TmmAvatarUpload class=" mx-auto" v-model="upload_avatar" />
                    </div>
                    <!-- <span v-if="upload_avatar">{{ JSON.stringify(upload_avatar[0]) }}</span> -->
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="รหัสบัตรประชาชน" />
                        <TmmInput v-model="cid" class="" :error="errors.cid" />
                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="เบอร์โทร" />
                        <TmmInputPhon v-model="phone" :error="errors.phone" />
                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="ตำแหน่ง" />
                        <TmmInputDropDown v-model="police_position_id" placeholder="" className=""
                            :options="resPolicePosition" class="w-full" value="id" label="position_name_th"
                            :error="errors.police_position_id" />
                    </div>

                </div>

                <div class="flex gap-5 justify-center max-w-[20rem] mx-auto">
                    <TmmButton type="primary" severity="secondary" className="w-full h-[2.5rem]" label="ยกเลิก" />
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
    // or middleware: 'auth'
})
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
    loadPolicePosition();
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
        police_position_id: zod.number({
            required_error: requireValue,
            invalid_type_error: requireValue,
        }),

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
const { value: police_position_id } = useField("police_position_id");
const { value: upload_avatar } = useField("upload_avatar");


// ********** [[ ยศตำแหน่ง]] *********************
// *********************************** [[จบโหลด ยศตำแหน่ง]] ***************************

const onSubmit = handleSubmit(async (values) => {
    saveUsers(values);
});
const saveUsers = async (values) => {
    try {

        const phone_no_string = phone.value.replace(/\D/g, ""); //แปลงให้เหลือแต่ตัวเลข
        // console.log('changeImg' + upload_avatar.value.file)
        const formData = new FormData();
        formData.append('line_get_id_token', localStorage.getItem("tokenline"));
        formData.append('cid', cid.value);
        formData.append('phone', phone_no_string);
        formData.append('police_position_id', police_position_id.value);
        formData.append('upload_avatar', upload_avatar.value[0].originFileObj);

        const res = await dataApi.register(formData)
        await localStorage.setItem("token", res.data.data.token);
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };
        handleReset();
        navigateTo('/')
    } catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }

    // const dataApi
}

</script>
