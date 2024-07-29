<template>
    <HeaderMenu class="flex justify-start items-center gap-5 sticky top-0 z-50">
        <p class="font-bold text-lg pl-3">ลงทะเบียน</p>
    </HeaderMenu>
    <section class="p-3">
        <div class="!flex justify-center">
       
        <img src="@/public/image/icon/label-police.png" class="w-full max-w-[40rem] max-h-[5rem] mb-2"></img>
         
        </div>
        <div class="card p-3">
            <Form @submit="onSubmit">

                <div class="mb-5">

                    <div class="!flex justify-center">
                        <div>
                        <!-- <TmmAvatarUpload class=" mx-auto" v-model="uploadAvatarField" /> -->
                        <a-upload v-model:file-list="uploadAvatarField" name="avatar" list-type="picture-card"
                            class="avatar-uploader" :show-upload-list="false" :before-upload="beforeUpload"
                            @change="handleChange" accept="image/*">
                            <img v-if="upload_avatar_url" :src="upload_avatar_url" alt="avatar" />
                            <div v-else>
                                <loading-outlined v-if="loading"></loading-outlined>
                                <plus-outlined v-else></plus-outlined>
                                <div class="ant-upload-text">Upload</div>
                            </div>
                        </a-upload></div>
                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="สถานี" />
                        <TmmInput v-model="policeProvinceNameField" class="readonly" />
                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="เลขบัตรประชาชน" />
                        <TmmInput v-model="cidField" class="readonly" />
                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="เบอร์โทร" />
                        <TmmInput v-model="phoneField" class="readonly" />
                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="ตำแหน่ง" />
                        <TmmInput v-model="positionNameThField" class="readonly" />
                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="ยศ" />
                        <TmmInput v-model="rankNameThField" class="readonly" />
                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="ชื่อ" />
                        <TmmInput v-model="firstNameField" class="readonly" />
                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="นามสกุล" />
                        <TmmInput v-model="lastNameField" class="readonly" />
                    </div>

                </div>

                <div class="flex gap-5 justify-center max-w-[20rem] mx-auto">
                    <TmmButton type="primary" severity="secondary" className="w-full h-[2.5rem]" label="ยกเลิก"
                        @click="navigateTo('/auth/register')" />
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
        // cid: zod.string().max(13, requireValue).min(13, requireValue).nonempty(requireValue).default(""),
        // phone: zod.string().min(14, requireValue).max(14, requireValue).nonempty().default(""),
        // police_position_id: zod.number({
        //     required_error: requireValue,
        //     invalid_type_error: requireValue,
        // }),

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

// Retrieve the variables from session storage
const policeProvinceName = sessionStorage.getItem('province_station_name');
const cid = sessionStorage.getItem('cid');
const phone = sessionStorage.getItem('phone');
const positionNameTh = sessionStorage.getItem('position_name_th');
const rankNameTh = sessionStorage.getItem('rank_name_th');
const firstName = sessionStorage.getItem('first_name');
const lastName = sessionStorage.getItem('last_name');
const uploadAvatar = sessionStorage.getItem('upload_avatar');
const otp = sessionStorage.getItem('otp');
const ref_code = sessionStorage.getItem('ref_code');



const cidField = ref(cid);
const policeProvinceNameField = ref(policeProvinceName);
const phoneField = ref(phone);
const positionNameThField = ref(positionNameTh);
const rankNameThField = ref(rankNameTh);
const firstNameField = ref(firstName);
const lastNameField = ref(lastName);
const uploadAvatarField = ref();
const upload_avatar_url = ref(uploadAvatar)
const isEditImage  = ref(false)
const OtpField = ref(otp);
const refCodeField = ref(ref_code);
// const { value: cid } = useField("cid");



// ********** [[ ยศตำแหน่ง]] *********************
// *********************************** [[จบโหลด ยศตำแหน่ง]] ***************************

const onSubmit = handleSubmit(async (values) => {
    saveUsers(values);
});
const saveUsers = async (values) => {
    try {
        const phone_no_string = phoneField.value.replace(/\D/g, ""); //แปลงให้เหลือแต่ตัวเลข
        const formData = new FormData();
        formData.append('line_get_id_token', localStorage.getItem("tokenline"));
        formData.append('cid', cidField.value);
        formData.append('phone', phone_no_string);
        formData.append('otp', OtpField.value);
        if (isEditImage.value) {
            formData.append('upload_avatar', uploadAvatarField?.value[0].originFileObj);
        }
        formData.append('otp_refcode', refCodeField.value);
        
        const res = await dataApi.registerLineOtp(formData)
        await localStorage.setItem("token", res.data.data.token);
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };
        navigateTo('/')
    } catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }

    // const dataApi
}

// ******************** [[ upload avatar ]]
import { message } from 'ant-design-vue';
const loading = ref(false);
function getBase64(img, callback) {
    try {
        isEditImage.value = true;
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    } catch (error) {
        console.error(error)
    }
}
const beforeUpload = file => {
    try {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG or PNG files!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    } catch (error) {
        console.error(error)
    }
};
const handleChange = info => {
    try {
        if (info.file.status === 'uploading') {
            loading.value = true;
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, base64Url => {
                upload_avatar_url.value = base64Url;
                loading.value = false;
            });
        }
        if (info.file.status === 'error') {
            loading.value = false;
            message.error('upload error');
        }
    } catch (error) {
        console.error(error)
    }
};
</script>

<style>
.readonly {
    pointer-events: none;
    background-color: #ffffff;
    /* Optional: to give it a readonly look */
}

.avatar-uploader>.ant-upload {
    width: 128px !important;
    height: 128px !important;
}

.ant-upload-select-picture-card i {
    font-size: 32px !important;
    color: #999 !important;
}

.ant-upload img {
    /* border-radius: 9999px !important; */
    border-radius: 0.75rem
        /* 12px */
        !important;
    max-height: 128px;
    width: 100% !important;
}

.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px !important;
    color: #666 !important;
}
</style>