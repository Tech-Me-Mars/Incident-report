<template>
    <PageMissionEditHeader />
    <!-- {{ fields }} -->
    <section class="p-3">
        <!-- <PageMissionEditProjectname /> -->
        <TmmCard class="!bg-blue-600 mb-2 card">
            <template #header>
                <div class="py-1">
                    <div class="flex gap-3 items-center">
                        <!-- <TmmIcon icon="mdi mdi-clock-time-four text-2xl text-white" /> -->
                        <ClockCircleTwoTone style="font-size: 22px;" />
                        <TmmLabelSubtitle class="text-white" :label="resJobProcess?.jobs?.name || ''" />
                    </div>
                </div>
            </template>
            <template #body>
                <div class="flex justify-between text-blue-100 mb-2">
                    <p class="font-medium text-xs">ผู้วางแผนงาน</p>
                    <span class="ml-auto font-light text-xs">{{ resJobProcess?.jobs?.plan_job_employee_fullname
                        }}</span>
                </div>
                <div class="flex justify-between text-blue-100">
                    <p class="font-medium text-xs">ผู้อนุมัติแผนงาน</p>
                    <span class="ml-auto font-light text-xs">{{ resJobProcess?.jobs?.approve_plan_employee_fullname
                        }}</span>
                </div>
            </template>
        </TmmCard>
        <!-- <hr /> -->
        <!-- <PageMissionEditForm /> -->
        <Form @submit="onSubmit" class="!bg-gray-100">
            <div class="card p-3 mb-3">
                <div class="flex justify-end">
                    <TmmTag color="#f0c424" class="rounded-xl mb-2">ลำดับที่ {{ sort_no }}
                    </TmmTag>
                    <!-- <CloseCircleTwoTone @click="remove(index)" /> -->
                </div>
                <div class="grid grid-cols-1">
                    <div class="mb-0 flex justify-between">
                        <TmmTypographyLabelForm label="ผู้รับผิดชอบ" />
                        <!-- <TmmInput v-model:value="responsible_person" /> -->
                        <p>{{ responsible_employee_fullname }}</p>
                    </div>
                </div>
                <div class="my-1">
                    <TmmTypographyLabelForm label="ระยะเวลาดำเนินงาน" />
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="วันที่เริ่มต้น" />
                        <TmmInputCalendar v-model="date_start" :disabled="edit" />
                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="วันที่สิ้นสุด" />
                        <TmmInputCalendar v-model="date_end" :disabled="edit" />
                    </div>
                </div>
                <div class="grid grid-cols-1 mb-2">
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="รายละเอียดงาน" />
                        <TmmInputTextarea :rows="2" v-model="text_jobs_process_detail" :disabled="edit" />
                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="การดำเนิการ" />
                        <TmmInputTextarea :rows="2" v-model="text_process" :error="errors.text_process" />
                    </div>


                </div>
                <div class="flex flex-col gap-2 mb-2">
                    <TmmTypographyLabelForm label="เอกสารที่เกี่ยวข้อง (ถ้ามี)" />
                    <!-- <TmmInputUploadFile multiple v-model="jobs_process_image" /> -->
                    <a-upload v-model:file-list="jobs_process_image" accept="image/*" @preview="handlePreview"
                        list-type="picture" multiple name="file" :headers="headers"
                        :custom-request="customRequestAddFile" @remove="handleRemove" :disabled="edit">
                        <a-button>
                            <upload-outlined></upload-outlined>
                            เลือกไฟล์
                        </a-button>
                    </a-upload>
                    <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
                        <img alt="example" style="width: 100%" :src="previewImage" />
                    </a-modal>
                </div>

                <div class="grid grid-cols-1 mb-2">
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="สถานะดำเนินงาน" />
                        <TmmInputDropDown v-model="status_approve" placeholder="สถานะดำเนินงาน" className=""
                            :options="resJobStatusProcessApprove" class="w-full" value="id" label="name" :error="errors.status_approve" />
                    </div>
                </div>

            </div>


            <div class="flex gap-5 justify-center max-w-[20rem] mx-auto">
                <NuxtLink :to="`/jobs/mission/${route.params.id}`" class="w-full">
                    <TmmButton type="primary" severity="secondary" className="w-full" label="ยกเลิก" />
                </NuxtLink>
                <TmmButton type="primary" severity="primary" className="w-full" htmlType="submit" label="บันทึก" />
            </div>
        </Form>
        <div>
            <a-modal v-model:open="open" centered :footer="false" width="1000px">
                <div class="p-5">
                    <div class="flex justify-center flex-col items-center mb-5">
                        <FrownOutlined class="mb-3" style="font-size: 120px; color: #fcc03f;" />
                        <h1 class="text-4xl" style="color: #f8b31e;">ERROR!</h1>
                    </div>
                    <h1 class="text-center text-xl font-medium mb-2">พล.ต.ท สมหมาย มีชัย</h1>
                    <p class="text-center text-gray-500 text-md mb-2">ไม่สามารถเข้าร่วมโครงการได้ เนื่องจาก พล.ต.ท
                        สมหมาย
                        มีชัย
                        มีแผนงานมากเกินไป</p>
                    <div class="flex justify-center">
                        <TmmButton label="ตกลง" @click="open = false" type="primary" severity="warning"
                            className="w-[10rem]" size="large" />
                    </div>
                </div>
            </a-modal>
        </div>

    </section>

    <TmmAlertToast :data="alertToast" :error="errorAlert" :dataError="dataError" />
</template>

<script setup>
import { useRoute } from 'vue-router';
import * as dataApi from './api/data.js'
const route = useRoute()
console.log(route.query)
//! /////// [validation] /////////
const open = ref(false);
const showModal = () => {
    open.value = true;
};

const isloadingAxi = useState('isloadingAxi')
const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({});

import { useFieldArray, useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

onMounted(() => {
    getJobProcess()

})

// status_approve

const resJobStatusProcessApprove = ref();
const loadJobStatusProcessApprove = async () => {
    try {
        let res = undefined;
        if (can_approve.value == 1) {
            res = await dataApi.getJobStatusProcessApprove();
        } else {
            res = await dataApi.getJobStatusProcess();
        }
        resJobStatusProcessApprove.value = res.data.data;
    } catch (error) {
        console.error(error);
    }
}



const requireValue = "กรุณาระบุข้อมูล";
const validationSchema = toTypedSchema(
    zod.object({
        text_process: zod.string().nonempty(requireValue).default(""),
        status_approve: zod.number({
            required_error: requireValue,
            invalid_type_error: requireValue,
        }),
        // approve_plan_employee_id: zod.number({
        //     required_error: requireValue,
        //     invalid_type_error: requireValue,
        // }),
    })
);
const { handleSubmit, errors, handleReset } = useForm({
    initialValues: {
        work_array: [
            {
                setting_approve: undefined,
                responsible_employee_id: undefined,
                responsible_employee_fullname: undefined,
                date_start: undefined,
                date_end: undefined,
                text_jobs_process_detail: undefined,

            },
        ],
    },
    validationSchema,
});




const { value: name } = useField("name");
const { value: sort_no } = useField("sort_no");
const { value: plan_job_employee_id } = useField("plan_job_employee_id");
const { value: approve_plan_employee_id } = useField("approve_plan_employee_id");

const { value: responsible_employee_id } = useField("responsible_employee_id");
const { value: responsible_employee_fullname } = useField("responsible_employee_fullname");
const { value: date_start } = useField("date_start");
const { value: date_end } = useField("date_end");
const { value: jobs_status_process_id } = useField("jobs_status_process_id");
const { value: text_jobs_process_detail } = useField("text_jobs_process_detail");
const { value: setting_approve } = useField("setting_approve");

const { value: text_process } = useField("text_process");
const { value: text_process_approve } = useField("text_process_approve");
const { value: status } = useField("status");
const { value: edit } = useField("edit");
const { value: can_approve } = useField("can_approve");
const { value: is_complete } = useField("is_complete");
const { value: status_approve } = useField("status_approve");

const { value: jobs_process_image } = useField('jobs_process_image', null, {
    initialValue: [] // กำหนดค่าเริ่มต้นที่นี่
})

const { remove, push, fields } = useFieldArray("work_array");
const onSubmit = handleSubmit((values) => {
    savejob(values);
});

const customRequestAddFile = async ({ action, file, headers, onSuccess, onError }) => {
    try {
        const formData = new FormData();
        formData.append('jobs_process_id', route.params.id);
        formData.append('image_detail[]', file);
        const res = await dataApi.addProcessImage(formData);
        onSuccess()
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };
        // handleReset();
        getJobProcess()
    } catch (error) {
        onError()
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }
};
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');

const handleCancel = () => {
    previewVisible.value = false;
    previewTitle.value = '';
};
const handlePreview = async file => {
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
    }
    previewImage.value = file.url || file.preview;
    previewVisible.value = true;
    previewTitle.value = '';
};

const handleRemove = async (e) => {
    try {
        const res = await dataApi.deleteProcessImage(e.id);
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };
        getJobProcess();
    } catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }
}

const resJobProcess = ref();
const getJobProcess = async () => {
    try {
        const res = await dataApi.getJobProcess(route.params.id);
        resJobProcess.value = res.data.data;
        sort_no.value = resJobProcess.value.jobs_process.sort_no;
        // responsible_employee_id.value = resJobProcess.value.jobs_process.sort_no;
        plan_job_employee_id.value = resJobProcess.value?.jobs?.plan_job_employee_id
        approve_plan_employee_id.value = resJobProcess.value?.jobs?.approve_plan_employee_id
        name.value = resJobProcess.value?.jobs?.name
        responsible_employee_fullname.value = resJobProcess.value.jobs_process.responsible_employee_fullname
        date_start.value = resJobProcess.value.jobs_process.date_start
        date_end.value = resJobProcess.value.jobs_process.date_end
        jobs_status_process_id.value = resJobProcess.value.jobs_process.jobs_status_process_id
        text_jobs_process_detail.value = resJobProcess.value.jobs_process.text_jobs_process_detail
        text_process.value = resJobProcess.value.jobs_process?.text_process
        text_process_approve.value = resJobProcess.value.jobs_process.text_process_approve
        status.value = resJobProcess.value.status.id
        edit.value = resJobProcess.value.tools.edit == 0 ? true : false;
        setting_approve.value = resJobProcess.value.tools.setting_approve
        can_approve.value = resJobProcess.value.tools.can_approve
        is_complete.value = resJobProcess.value.tools.is_complete
        status_approve.value = resJobProcess.value?.status?.id

        //map รูปfile
        if (resJobProcess.value.jobs_process_image.length > 0) {
            jobs_process_image.value = resJobProcess.value?.jobs_process_image.map((e, i) => ({
                ...e,
                name: e?.image_path,
                uid: i + 1,
                url: e?.image_path,
            }));
        }

        await loadJobStatusProcessApprove();
    } catch (error) {
        console.error(error);
    }
}


const savejob = async (values) => {
    // console.log('values.work_array', values.work_array)
    try {
        const payload = {
            // "responsible_employee_id": "1", เอาออก
            // "responsible_employee_fullname": "responsible_employee_fullname", เอาออก
            date_start: date_start.value,
            date_end: date_end.value,
            text_jobs_process_detail: text_jobs_process_detail.value,
            setting_approve: setting_approve.value ? 1 : 0, // 1 : 0 (ตั้งค่า approve)
            jobs_status_process_id: jobs_status_process_id.value, // {{url_api}}/api/v1/jobs_status_process
            text_process: text_process.value,
            // ==== approve ====
            text_process_approve: ""
        }
        console.log(payload)
        const res = await dataApi.updateJobProcess(payload, route.params.id);
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };
        handleReset();
    } catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }
}
</script>