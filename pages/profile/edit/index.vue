<template>
    <HeaderMainProfile />
    <section class="p-3">
        <HeaderMenu class="flex justify-start items-center gap-5">
        <NuxtLink to="/profile">
            <TmmButtonBackPage />
        </NuxtLink>
        <p class="font-bold text-lg">แก้ไขข้อมูล</p>
    </HeaderMenu>
        <div class="card p-3">
            <Form @submit="onSubmit">
                <div class="mb-5">
                    <div class="!flex justify-center">
                        <div class="">
                            <a-upload v-model:file-list="upload_avatar_file" name="avatar" list-type="picture-card"
                                class="avatar-uploader" :show-upload-list="false" :before-upload="beforeUpload"
                                @change="handleChange" accept="image/*">
                                <img v-if="upload_avatar_url" :src="upload_avatar_url" alt="avatar" />
                                <div v-else>
                                    <loading-outlined v-if="loading"></loading-outlined>
                                    <plus-outlined v-else></plus-outlined>
                                    <div class="ant-upload-text">Upload</div>
                                </div>
                            </a-upload>
                        </div>
                        <!-- <TmmAvatarUpload class=" mx-auto" v-model="upload_avatar" /> -->
                        <!-- {{ upload_avatar }} -->
                    </div>
                    <!-- <span v-if="upload_avatar">{{ JSON.stringify(upload_avatar[0]) }}</span> -->
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="รหัสบัตรประชาชน" />
                        <TmmInput v-model="resProfile.cid" class="!bg-gray-50" readonly  />
                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="ชื่อ" />
                        <TmmInput v-model="resProfile.fullname" class="!bg-gray-50" readonly />
                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="ตำแหน่ง" />
                        <TmmInput v-model="resProfile.position_name_th" class="!bg-gray-50" readonly />
                    </div>

                    <div class="mb-2">
                        <TmmTypographyLabelForm label="แผนก" />
                        <TmmInput v-model="resProfile.police_department_name" class="!bg-gray-50" readonly />
                    </div>

                    <div class="mb-2">
                        <TmmTypographyLabelForm label="เบอร์โทร" />
                        <TmmInput v-model="phone" :error="errors.phone" />
                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="วันเกิด" />
                        <TmmInput v-model="resProfile.birthday_date" class="!bg-gray-50" readonly />
                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="สถานี" />
                        <TmmInput v-model="resProfile.station_name" class="!bg-gray-50" readonly />
                    </div>

                </div>

                <div class="flex gap-5 justify-center max-w-[20rem] mx-auto">
                    <NuxtLink to="/profile" class="w-full">
                    <TmmButton type="primary" severity="secondary" className="w-full h-[2.5rem]" label="ยกเลิก" />
                </NuxtLink>
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
   middleware: 'auth'
});
useHead({ title: 'แก้ไขโปรไฟล์' });
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
    loadProfile();
})

const resProfile = ref({
    cid: undefined,
    fullname: undefined,
    position_name_th: undefined,
    police_department_name: undefined,
    phone: undefined,
    birthday_date: undefined,
    station_name: undefined,
    upload_avatar: "https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5LTj8NtXpbCKmEbkx05tFY2KkSx287VxGkHUIMWC2lk669wMoy2.jpg",
});
const loadProfile = async () => {
    try {
        const res = await dataApi.getProfileMe();
        resProfile.value = res.data.data;
        resProfile.value.fullname = `${resProfile?.value?.rank_name_th_abb} ${resProfile?.value?.first_name} ${resProfile?.value?.last_name}`
        upload_avatar_url.value = res.data.data?.upload_avatar
        phone.value = res.data.data?.phone
    } catch (error) {
        console.error(error)
    }
}



const changeImg = (event) => {
    console.log('changeImg' + upload_avatar.value[0])
    console.log(event)
}

const requireValue = "กรุณาระบุข้อมูล";
const validationSchema = toTypedSchema(
    zod.object({
        phone: zod.string()
            .nonempty(requireValue)
            .min(10, requireValue)
            .max(10, requireValue)
            .regex(/^\d+$/, { message: "Phone must contain only digits." })
            .default(""),
    })
);
const { handleReset, handleSubmit, errors } = useForm({
    validationSchema
})

const { value: phone } = useField("phone");
const { value: upload_avatar_file } = useField('upload_avatar_file', null, {
    initialValue: [] // กำหนดค่าเริ่มต้นที่นี่
})
const { value: isEditImage } = useField('isEditImage', null, {
    initialValue: false // กำหนดค่าเริ่มต้นที่นี่
})
const { value: upload_avatar_url } = useField("upload_avatar_url");

// *********************************** [[จบโหลด ยศตำแหน่ง]] ***************************

const onSubmit = handleSubmit(async (values) => {
    saveUsers(values);
});
const saveUsers = async (values) => {
    try {
        // phone.value = phone.value.replace(/\D/g, ""); //แปลงให้เหลือแต่ตัวเลข
        const formData = new FormData();
        formData.append('phone', phone.value);
        if (isEditImage.value == true) {
            formData.append('upload_avatar', upload_avatar_file.value[0].originFileObj);
        }
        const res = await dataApi.updateProfile(formData)
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };
        navigateTo('/profile')
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
</script>

<style>
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