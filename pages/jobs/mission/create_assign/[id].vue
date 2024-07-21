<template>
    <HeaderMainProfile />
    <!-- <PageJobsAddHeader /> -->

    <section class="p-3">
        <HeaderMenu class="flex justify-start items-center gap-5">
            <p class="font-bold text-lg">เพิ่มงาน Job Process</p>
        </HeaderMenu>
        <!-- <PageJobsAddForm /> -->

        <Form @submit="onSubmit">
            <div class="card p-3 mb-3">
                <div class="flex justify-between">
                    <TmmTag color="#1677ff" class="rounded-xl mb-2">ลำดับที่ {{count_for_assign_work_more}}
                    </TmmTag>
                </div>
                <div class="grid grid-cols-1">
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="ผู้รับผิดชอบ" />
                        <TmmInputDropDown v-model="responsible_employee_id" placeholder="" className="" :options="resInquiryEmp" class="w-full" value="employee_id"
                            label="fullname" :error="errors.responsible_employee_id" />
                    </div>
                </div>
                <div class="my-1">
                    <TmmTypographyLabelForm label="ระยะเวลาดำเนินงาน" />
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="วันที่เริ่มต้น" />
                        <TmmInputCalendar class="w-full" v-model="date_start" :error="errors.date_start" />
                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="วันที่สิ้นสุด" />
                        <TmmInputCalendar class="w-full" v-model="date_end" :error="errors.date_end" />
                    </div>
                </div>
                <div class="grid grid-cols-1">
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="รายละเอียดงาน" />
                        <TmmInputTextarea :rows="2" v-model="text_jobs_process_detail"
                            :error="errors.text_jobs_process_detail" />
                    </div>
                    <div class="mb-2 flex flex-col">
                        <TmmTypographyLabelForm label="ตั้งค่าการอนุมัติ" />
                        <span>
                            <TmmInputSwitch v-model="setting_approve" />
                        </span>
                    </div>
                </div>
                <div class="flex flex-col">
                    <TmmTypographyLabelForm label="ข้อกำหนดส่งงาน (เลือกได้มากกว่า1ข้อ)" />
                    <TmmTypographyTextValidator v-if="errors?.allow_file_upload_type_arr" :errors="'กรุณาเลือกอย่างน้อย 1 ประเภทไฟล์'" />
                    <a-space class="mb-3" v-if="resTypeFileUpload.length > 0" direction="horizontal" wrap>
                        <a-button v-for="item in resTypeFileUpload" :key="item.name" @click="toggleSelect(item.type)"
                            :class="{
                                '!bg-blue-600 !text-white': isSelected(item.type),
                                '!text-gray-700': !isSelected(item.type),
                            }" class="!flex !flex-col !items-center rounded cursor-pointer !h-[3.5rem]">
                            <i v-if="item.is_use_class" :class="item.icon_class"
                                :style="{ fontSize: '18px', color: item.color }"></i>
                            <img v-else :src="item.image_path" alt="" class="w-5" />
                            <span>{{ item.name }}</span>
                        </a-button>
                    </a-space>
                    
                </div>
            </div>


            <div class="flex gap-5 justify-center max-w-[20rem] mx-auto">
                <TmmButton type="primary" severity="secondary" className="w-full" label="ยกเลิก"
                    @click="redirectToJobPage" />
                <TmmButton type="primary" severity="primary" className="w-full" htmlType="submit" label="บันทึก" />
            </div>
        </Form>
        <div>
            <a-modal v-model:open="open" centered :footer="false" width="1000px">
                <div class="p-5">
                    <div class="flex justify-center flex-col items-center mb-5">
                        <FrownOutlined class="mb-3" style="font-size: 120px; color: #fcc03f" />
                        <h1 class="text-4xl" style="color: #f8b31e">ERROR!</h1>
                    </div>
                    <h1 class="text-center text-xl font-medium mb-2">
                        พล.ต.ท สมหมาย มีชัย
                    </h1>
                    <p class="text-center text-gray-500 text-md mb-2">
                        ไม่สามารถเข้าร่วมโครงการได้ เนื่องจาก พล.ต.ท สมหมาย มีชัย
                        มีแผนงานมากเกินไป
                    </p>
                    <div class="flex justify-center">
                        <TmmButton label="ตกลง" @click="open = false" type="primary" severity="warning"
                            className="w-[10rem]" size="large" />
                    </div>
                </div>
            </a-modal>
        </div>
        <TmmAlertToast :data="alertToast" :error="errorAlert" :dataError="dataError" />
    </section>
</template>
<script setup>
//! /////// [validation] /////////
const open = ref(false);
const showModal = () => {
    open.value = true;
};
//! /////// [Api Variable] /////////
import * as dataApi from "./api/data.js";
import { useFieldArray, useForm, Form, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
const router = useRouter();
const route = useRoute();
const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({});

const redirectToJobPage = () => {
        router.push(`/jobs/mission/${route.params.id}`);
};

// const count_for_assign_work_more = ref(0);
// const loadLocal = () => {
//     const storedValue = localStorage.getItem('count_for_assign_work_more');
//     console.log('storedValue')
//     if (storedValue) {
//         count_for_assign_work_more.value = storedValue;
//     }
// }
const count_for_assign_work_more = useState("count_for_assign_work_more");

onMounted(() => {
    // loadJobProcess();
    loadPoliceHeadStation();
    loadPlanJobEmp();
    loadInquiryEmp();
    loadUrgency();
    loadPriority();
    loadSecret();
    loadTypeFileUpload();
});


// const { value: name } = useField("name");
// const { value: plan_job_employee_id } = useField("plan_job_employee_id");
// const { value: status } = useField("status", null, {
//     initialValue: 1, // กำหนดค่าเริ่มต้นที่นี่
// });
// const { value: approve_plan_employee_id } = useField(
//     "approve_plan_employee_id"
// );
// const { value: jobs_level_of_urgency_code } = useField(
//     "jobs_level_of_urgency_code"
// );
// const { value: jobs_level_priority_code } = useField(
//     "jobs_level_priority_code"
// );

const resProccess = ref()
const loadJobProcess = async () => {
    try {
        const res = await dataApi.getJobProcess(route.params.id);
        resProccess.value = res.data.data;
        console.log('resProccess',resProccess.value)
        if (resProccess.value?.tools?.can_create_edit!=true) {
            return navigateTo('/')
        }
        responsible_employee_id.value = res.data.data?.jobs_process?.responsible_employee_id
        date_start.value = res.data.data?.jobs_process?.date_start
        date_end.value = res.data.data?.jobs_process?.date_end
        text_jobs_process_detail.value = res.data.data?.jobs_process?.text_jobs_process_detail
        setting_approve.value = res.data.data?.jobs_process?.setting_approve || false
        allow_file_upload_type_arr.value = res.data.data?.jobs_process?.allow_file_upload_type_arr || []
    } catch (error) {
        console.error(error)
    }
}

const resTypeFileUpload = ref([]);
const loadTypeFileUpload = async () => {
    try {
        const res = await dataApi.getTypeFileUpload();
        console.log('tpye file ', res.data.data)
        resTypeFileUpload.value = res.data.data;
    } catch (error) {
        console.error(error);
    }
};


const toggleSelect = (type) => {
    try {
        if (allow_file_upload_type_arr.value.includes(type)) {
            allow_file_upload_type_arr.value = allow_file_upload_type_arr.value.filter(
                (item) => item !== type
            );
        } else {
            allow_file_upload_type_arr.value.push(type);
        }
    } catch (error) {
        console.error(error)
    }


};
const isSelected = (type) => {
    try {
        return allow_file_upload_type_arr.value.includes(type);
    } catch (error) {
        console.error(error)
    }

};

const resPlanJobEmp = ref();
const loadPlanJobEmp = async () => {
    try {
        const res = await dataApi.getPoliceEmployee();
        resPlanJobEmp.value = res.data.data;
        resPlanJobEmp.value = resPlanJobEmp.value.map((e, i) => ({
            ...e,
            fullname: `${e.rank_name_th_abb} ${e.first_name} ${e.last_name} ${e.position_name_th_abb}`,
        }));
    } catch (error) {
        console.error(error);
    }
};

const resgetUrgency = ref();
const loadUrgency = async () => {
    try {
        const res = await dataApi.getUrgency();
        resgetUrgency.value = res.data.data;
    } catch (error) {
        console.error(error);
    }
};

const resPriority = ref();
const loadPriority = async () => {
    try {
        const res = await dataApi.getPriority();
        resPriority.value = res.data.data;
    } catch (error) {
        console.error(error);
    }
};

const resgetSecret = ref();
const loadSecret = async () => {
    try {
        const res = await dataApi.getSecret();
        resgetSecret.value = res.data.data;
    } catch (error) {
        console.error(error);
    }
};

const resPoliceHeadStation = ref();
const loadPoliceHeadStation = async () => {
    try {
        const res = await dataApi.getPoliceHeadStation();
        console.log("res", res);
        resPoliceHeadStation.value = res.data.data;
        resPoliceHeadStation.value = resPoliceHeadStation.value.map((e, i) => ({
            ...e,
            fullname: `${e.rank_name_th_abb} ${e.first_name} ${e.last_name} ${e.position_name_th_abb}`,
        }));
    } catch (error) {
        console.error(error);
    }
};

const resInquiryEmp = ref();
const loadInquiryEmp = async () => {
    try {
        const res = await dataApi.getInquiryEmp();
        console.log("res", res);
        resInquiryEmp.value = res.data.data;
        resInquiryEmp.value = resInquiryEmp.value.map((e, i) => ({
            ...e,
            fullname: `${e.rank_name_th_abb} ${e.first_name} ${e.last_name} ${e.position_name_th_abb}`,
        }));
    } catch (error) {
        console.error(error);
    }
};

const requireValue = "กรุณาระบุข้อมูล";
const validationSchema = toTypedSchema(
    zod.object({
        responsible_employee_id: zod.number({
            required_error: requireValue,
            invalid_type_error: requireValue,
        }),
        date_start: zod.string().nonempty(requireValue).default(""),
        date_end: zod.string().nonempty(requireValue).default(""),
        text_jobs_process_detail: zod.string().nonempty(requireValue).default(""),
        setting_approve: zod.boolean({
            required_error: requireValue,
            invalid_type_error: requireValue,
        }),
        allow_file_upload_type_arr: zod.array(zod.any()).nonempty("Array must have at least one item")
    })
);
const { handleSubmit, errors, handleReset } = useForm({
    validationSchema,
});

const { value: responsible_employee_id } = useField("responsible_employee_id");
const { value: date_start } = useField("date_start");
const { value: date_end } = useField("date_end");
const { value: text_jobs_process_detail } = useField("text_jobs_process_detail");
const { value: allow_file_upload_type_arr } = useField("allow_file_upload_type_arr", null, {
    initialValue: [], // กำหนดค่าเริ่มต้นที่นี่
});
const { value: setting_approve } = useField("setting_approve", null, {
    initialValue: true, // กำหนดค่าเริ่มต้นที่นี่
});
const onSubmit = handleSubmit((values) => {
    savejob(values);
});

const savejob = async (values) => {
    try {
        const payload = {
            job_id:route.params.id,
            responsible_employee_id: responsible_employee_id.value ? responsible_employee_id.value : "",
            date_start: date_start.value ? date_start.value : "",
            date_end: date_end.value ? date_end.value : "",
            text_jobs_process_detail: text_jobs_process_detail.value ? text_jobs_process_detail.value : "",
            setting_approve: setting_approve.value ? 1 : 0,
            allow_file_upload_type_arr: allow_file_upload_type_arr.value || [], // 1 : 0 (ตั้งค่า approve)

        };
        const res = await dataApi.saveJobprocess(payload);
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };
        handleReset();
        navigateTo(`/jobs/mission/${route.params.id}`);
    } catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error);
    }
};
</script>
