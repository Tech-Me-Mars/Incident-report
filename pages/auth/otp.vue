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
                        <TmmInput v-model="cid" class="readonly" :error="errors.cid" />
                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="เบอร์โทร" />
                        <TmmInput v-model="phone" class="readonly" :error="errors.phone" />
                    </div>

                    <div class="relative">
                        <h2 class="text-xl font-semibold mb-4">กรอกรหัส OPT ที่ได้รับทาง SMS</h2>
                        <div class="flex justify-center">
                            <InputOtp class="" v-model="otp" :length="4" :maxlength="4" @input="onInput" integerOnly />
                        </div>
                        <div class="text-red-500 mb-2 text-center">เวลาที่เหลือ {{ formattedTime }}</div>
                        <div class="mb-4 text-center" v-html="text_hint_otp"></div>
                        <TmmButton type="primary" :disabled="otp.length < 4" severity="primary"
                            className="w-full h-[2.5rem]" htmlType="submit" size="large" label="ยืนยันรหัส OTP" />
                    </div>

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
//! /////// [Api Variable] /////////
import * as dataApi from './api/data.js'
//! /////// [validation import] /////////
import { useField, useForm, Form } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
import InputOtp from 'primevue/inputotp';
import { parseISO, differenceInSeconds, format } from 'date-fns'
const isloadingAxi = useState('isloadingAxi')
const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({})

const route = useRoute()
onMounted(() => {
    // loadPolicePosition();
})


const requireValue = "กรุณาระบุข้อมูล";
const validationSchema = toTypedSchema(
    zod.object({
        // cid: zod.string().max(13, requireValue).min(13, requireValue).nonempty(requireValue).default(""),
        // phone: zod.string().min(14, requireValue).max(14, requireValue).nonempty().default(""),

    })
);
const { handleReset, handleSubmit, errors } = useForm({
    validationSchema
})


const { value: cid } = useField("cid");
cid.value = sessionStorage.getItem('cid');

const { value: phone } = useField("phone");
phone.value = sessionStorage.getItem('phone');

const { value: otp } = useField("otp");
otp.value = ''

const { value: refcode } = useField("refcode");
refcode.value = sessionStorage.getItem('ref_code');

const { value: expire } = useField("expire");
expire.value = sessionStorage.getItem('expires_at');

const { value: text_hint_otp } = useField("text_hint_otp");
text_hint_otp.value = sessionStorage.getItem('text_hint_otp');




const remainingTime = ref(0)
const calculateRemainingTime = () => {
    try {
        const now = new Date()
        const expirationTime = parseISO(expire.value)
        const diff = differenceInSeconds(expirationTime, now)
        remainingTime.value = diff > 0 ? diff : 0
    } catch (error) {
        console.error()
    }

}

const formattedTime = computed(() => {
    try {
        const minutes = Math.floor(remainingTime.value / 60)
        const seconds = remainingTime.value % 60
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    } catch (error) {
        console.error()
    }

})

onMounted(() => {
    calculateRemainingTime()
    const interval = setInterval(() => {
        calculateRemainingTime()
    }, 1000)

    onUnmounted(() => {
        clearInterval(interval)
    })
})

const onInput = (event) => {
    if (otp.value.length > 4) {
        otp.value = otp.value.slice(0, 4);
    }
};

const onSubmit = handleSubmit(async (values) => {
    saveUsers(values);
});
const saveUsers = async (values) => {
    try {
        const payload = {
            cid: cid.value,
            phone: phone.value,
            otp: otp.value,
            otp_refcode: refcode.value
        }
        const res = await dataApi.optCheck(payload)
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };

        sessionStorage.setItem('province_station_name', res.data.data?.data_police_employee?.province_station_name);
        sessionStorage.setItem('cid', res.data.data?.data_police_employee?.cid);
        sessionStorage.setItem('phone', res.data.data?.data_police_employee?.phone);
        sessionStorage.setItem('position_name_th', res.data.data?.data_police_employee?.position_name_th);
        sessionStorage.setItem('rank_name_th', res.data.data?.data_police_employee?.rank_name_th);
        sessionStorage.setItem('first_name', res.data.data?.data_police_employee?.first_name);
        sessionStorage.setItem('last_name', res.data.data?.data_police_employee?.last_name);
        sessionStorage.setItem('upload_avatar', res.data.data?.data_police_employee?.upload_avatar);
        sessionStorage.setItem('otp', otp.value);
        // handleReset();
        navigateTo('/auth/register-detail')
    } catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }
}

</script>

<style>
.readonly {
    pointer-events: none;
    background-color: #ffffff;
    /* Optional: to give it a readonly look */
}
</style>