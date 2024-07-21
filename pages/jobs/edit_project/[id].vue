<template>
    <HeaderMainProfile />
    <!-- <PageJobsAddHeader /> -->

    <section class="p-3">
        <HeaderMenu class="flex justify-start items-center gap-5">
            <p class="font-bold text-lg">แก้ไข Jobs</p>
        </HeaderMenu>
        <!-- <PageJobsAddForm /> -->

        <Form @submit="onSubmit">
            <div class="card p-3 mb-3">
                <div class="mb-2">
                    <TmmTypographyLabelForm label="ชื่อแผนงาน" />
                    <TmmInput v-model="name" :error="errors.name" />
                </div>
                <div class="mb-2">
                    <TmmTypographyLabelForm label="ผู้วางแผน" />
                    <TmmInputDropDown v-model="plan_job_employee_id" placeholder="" className=""
                        :options="resPlanJobEmp" class="w-full" value="id" label="fullname"
                        :error="errors.plan_job_employee_id" />
                </div>
                <div class="mb-2">
                    <TmmTypographyLabelForm label="ผู้อนุมัติแผนงาน" />
                    <TmmInputDropDown v-model="approve_plan_employee_id" placeholder="" className=""
                        :options="resPoliceHeadStation" class="w-full" value="id" label="fullname"
                        :error="errors.approve_plan_employee_id" />
                </div>
                <div class="mb-2">
                    <TmmTypographyLabelForm label="ลำดับความเร่งด่วน" />
                    <TmmInputDropDown v-model="jobs_level_of_urgency_code" placeholder="" className=""
                        :options="resgetUrgency" class="w-full" value="code" label="name"
                        :error="errors.jobs_level_of_urgency_code" />
                </div>
                <div class="mb-2">
                    <TmmTypographyLabelForm label="ลำดับความสำคัญ" />
                    <TmmInputDropDown v-model="jobs_level_priority_code" placeholder="" className=""
                        :options="resPriority" class="w-full" value="code" label="name"
                        :error="errors.jobs_level_priority_code" />
                </div>
                <div class="mb-2">
                    <TmmTypographyLabelForm label="ชั้นความลับ" />
                    <TmmInputDropDown v-model="jobs_level_secret_code" placeholder="" className=""
                        :options="resgetSecret" class="w-full" value="code" label="name"
                        :error="errors.jobs_level_secret_code" />
                </div>
            </div>

        
            <div class="flex gap-5 justify-center max-w-[20rem] mx-auto">
                <TmmButton type="primary" severity="secondary" className="w-full" label="ยกเลิก"
                    @click="router.push(`/jobs/mission/${route.params.id}`)" />
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

onMounted(() => {
    getJobproccessMainById();
    loadDataToForm();
    loadPoliceHeadStation();
    loadPlanJobEmp();
    loadInquiryEmp();
    loadUrgency();
    loadPriority();
    loadSecret();
    loadTypeFileUpload();
});

const resJobProcess =ref();
const getJobproccessMainById =async () =>{
    try {
        const res = await dataApi.getJobproccessMainById(route.params.id);
        resJobProcess.value = res.data.data;
        if (resJobProcess.value?.jobs?.can_edit_main_job != true) {
            navigateTo(`/jobs/mission/${route.params.id}`)
        }
    } catch (error) {
        console.error(error);
    }
}
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
// const { value: jobs_level_secret_code } = useField("jobs_level_secret_code");
const loadDataToForm = async() =>{
    try {
        const res = await dataApi.getJobById(route.params.id);
        console.log(res.data.data)
        name.value = res.data.data.name
        plan_job_employee_id.value = res.data.data.plan_job_employee_id
        approve_plan_employee_id.value = res.data.data.approve_plan_employee_id
        jobs_level_of_urgency_code.value = res.data.data.jobs_level_of_urgency_code
        jobs_level_priority_code.value = res.data.data.jobs_level_priority_code
        jobs_level_secret_code.value = res.data.data.jobs_level_secret_code
        // name.value = res.
    } catch (error) {
        console.error(error);
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

const isSelected = (name) => {
    return allow_file_upload_type_arr.value.includes(name);
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

const plan_name = ref("โครงการสายตรวจเพื่อนประชาชน");
const planer = ref("พบ.ต.ท ยิ่งยศ ใจดี");
const approveper = ref("พล.ต.ล สมหวัง ใจแข็งแกร่ง");

const requireValue = "กรุณาระบุข้อมูล";
const validationSchema = toTypedSchema(
    zod.object({
        name: zod.string().nonempty(requireValue).default(""),
        plan_job_employee_id: zod.number({
            required_error: requireValue,
            invalid_type_error: requireValue,
        }),
        approve_plan_employee_id: zod.number({
            required_error: requireValue,
            invalid_type_error: requireValue,
        }),
    })
);
const { handleSubmit, errors, handleReset } = useForm({
    validationSchema,
});

const { value: name } = useField("name");
const { value: plan_job_employee_id } = useField("plan_job_employee_id");
const { value: status } = useField("status", null, {
    initialValue: 1, // กำหนดค่าเริ่มต้นที่นี่
});
const { value: approve_plan_employee_id } = useField(
    "approve_plan_employee_id"
);
const { value: jobs_level_of_urgency_code } = useField(
    "jobs_level_of_urgency_code"
);
const { value: jobs_level_priority_code } = useField(
    "jobs_level_priority_code"
);
const { value: jobs_level_secret_code } = useField("jobs_level_secret_code");

const { value: allow_file_upload_type_arr } = useField(
    "allow_file_upload_type_arr",
    null,
    {
        initialValue: [], // กำหนดค่าเริ่มต้นที่นี่
    }
);



const confirmRemove = async (item, index) => {
    showConfirmDialog({
        title: "ลบข้อมูล",
        message: `ยืนยันการลบลำดับผู้รับผิดชอบลำดับที่ ${index + 1} ใช่หรือไม่`,
    })
        .then(() => {
            remove(index);
        })
        .catch(() => { });
};
const inquiryEmpChange = async (emp_id, index) => {
    resInquiryEmp.value.forEach((e, i) => {
        if (e.employee_id == emp_id) {
            fields.value[index].value.responsible_employee_fullname = e.fullname;
        }
    });
    // resInquiryEmp.value.forEach(item => {
    //     if (item.employee_id == inquiry_employee_id.value) {
    //         console.log('item.id', item.employee_id)
    //         // Assign fullname to name
    //         inquiry_employee_fullname.value = item.fullname;
    //         inquiry_employee_phone.value = item.employee_phone
    //     }
    // });
    // console.log('change')
};

const onSubmit = handleSubmit((values) => {
    savejob(values);
});

const savejob = async (values) => {
    try {
        const payload = {
            name: name.value,
            plan_job_employee_id: plan_job_employee_id.value,
            approve_plan_employee_id: approve_plan_employee_id.value,
            jobs_level_of_urgency_code: jobs_level_of_urgency_code.value
                ? jobs_level_of_urgency_code.value
                : "",
            jobs_level_priority_code: jobs_level_priority_code.value
                ? jobs_level_priority_code.value
                : "",
            jobs_level_secret_code: jobs_level_secret_code.value
                ? jobs_level_secret_code.value
                : "",
                status:1

        };
        console.log(payload);
        const res = await dataApi.updateJob(payload,route.params.id);
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
