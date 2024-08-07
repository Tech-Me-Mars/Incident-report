<template>
    <HeaderMainProfile />
    <section class="p-3">
        <HeaderMenu class="flex justify-start items-center gap-5">
        <p class="font-bold text-lg">แก้ไข jobs</p>
    </HeaderMenu>
        <!-- <PageJobsAddForm /> -->
        <Form @submit="onSubmit">
            <div class="card p-3 mb-3" v-if="resProcessJobs?.jobs?.can_edit == true">
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



           
            <div class="card p-3 mb-3" v-for="(item, index) in fields" :key="item.key">
                <!-- {{ errors }} -->
                <div class="flex justify-between">
                    <TmmTag color="#1677ff" class="rounded-xl mb-2">ลำดับที่ {{ index + 1 }}</TmmTag>
                    <CloseCircleTwoTone @click="confirmRemove(item.value, index)" />
                </div>
                <div class="grid grid-cols-1">
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="ผู้รับผิดชอบ" />
                        <TmmInputDropDown v-model="item.value.responsible_employee_id"
                            @change="inquiryEmpChange(item.value.responsible_employee_id, index)" placeholder=""
                            className="" :options="resInquiryEmp" class="w-full" value="employee_id" label="fullname"
                            :error="errors[`work_array[${index}].responsible_employee_id`]" />
                    </div>
                </div>
                <div class="my-1">
                    <TmmTypographyLabelForm label="ระยะเวลาดำเนินงาน" />
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="วันที่เริ่มต้น" />
                        <TmmInputCalendar class="w-full" v-model="item.value.date_start" :error="errors[`work_array[${index}].date_start`]" />
                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="วันที่สิ้นสุด" />
                        <TmmInputCalendar class="w-full" v-model="item.value.date_end" :error="errors[`work_array[${index}].date_end`]" />
                    </div>
                </div>
                <div class="grid grid-cols-1">
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="รายละเอียดงาน" />
                        <TmmInputTextarea :rows="2" v-model="item.value.text_jobs_process_detail" :error="errors[`work_array[${index}].text_jobs_process_detail`]" />
                    </div>
                    <div class="mb-2 flex flex-col">
                        <TmmTypographyLabelForm label="ตั้งค่าการอนุมัติ" />
                        <span>
                            <TmmInputSwitch v-model="item.value.setting_approve" />
                        </span>
                    </div>
                </div>
            </div>

            <div class="w-full px-10 py-5 mb-3">
                <TmmButton type="primary" outlined icon="mdi mdi-plus" label="เพิ่มลำดับงาน" @click="push({
                    id: undefined,
                    setting_approve: true,
                    responsible_employee_id: undefined,
                    responsible_employee_fullname: undefined,
                    date_start: undefined,
                    date_end: undefined,
                    text_jobs_process_detail: undefined,

                })" className="border-gray-400 text-gray-600 w-full" />
            </div>
            <div class="flex gap-5 justify-center max-w-[20rem] mx-auto">
                <TmmButton type="primary" severity="secondary" className="w-full" label="ยกเลิก" @click="backPage()" />
                <TmmButton type="primary" severity="primary" className="w-full" htmlType="submit" label="บันทึก" />
            </div>

        </Form>

        <TmmAlertToast :data="alertToast" :error="errorAlert" :dataError="dataError" />
    </section>
</template>
<script setup>
definePageMeta({
   middleware: 'auth'
});
useHead({ title: 'แก้ไขโปเซส' });
//! /////// [validation] /////////
const open = ref(false);
const showModal = () => {
    open.value = true;
};
//! /////// [Api Variable] /////////
import * as dataApi from './api/data.js'
import { useFieldArray, useForm, Form, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({});

onMounted(() => {
    loadPoliceHeadStation();
    loadPlanJobEmp();
    loadInquiryEmp();
    loadDataToForm();
    loadUrgency();
    loadPriority();
    loadSecret();
});

const router= useRouter()
const backPage = () =>{
    router.go(-1)
}


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
}

const resgetUrgency = ref();
const loadUrgency = async () => {
    try {
        const res = await dataApi.getUrgency()
        resgetUrgency.value = res.data.data;
    } catch (error) {
        console.error(error);
    }
}
const resPriority = ref();
const loadPriority = async () => {
    try {
        const res = await dataApi.getPriority()
        resPriority.value = res.data.data;
    } catch (error) {
        console.error(error);
    }
}

const resgetSecret = ref();
const loadSecret = async () => {
    try {
        const res = await dataApi.getSecret()
        resgetSecret.value = res.data.data;
    } catch (error) {
        console.error(error);
    }
}

const resPoliceHeadStation = ref();
const loadPoliceHeadStation = async () => {
    try {
        const res = await dataApi.getPoliceHeadStation()
        console.log('res', res)
        resPoliceHeadStation.value = res.data.data;
        resPoliceHeadStation.value = resPoliceHeadStation.value.map((e, i) => ({
            ...e,
            fullname: `${e.rank_name_th_abb} ${e.first_name} ${e.last_name} ${e.position_name_th_abb}`,
        }));
    } catch (error) {
        console.error(error);
    }
}

const resInquiryEmp = ref();
const loadInquiryEmp = async () => {
    try {
        const res = await dataApi.getInquiryEmp()
        console.log('res', res)
        resInquiryEmp.value = res.data.data;
        resInquiryEmp.value = resInquiryEmp.value.map((e, i) => ({
            ...e,
            fullname: `${e.rank_name_th_abb} ${e.first_name} ${e.last_name} ${e.position_name_th_abb}`,
        }));
    } catch (error) {
        console.error(error);
    }
}


const plan_name = ref('โครงการสายตรวจเพื่อนประชาชน')
const planer = ref('พบ.ต.ท ยิ่งยศ ใจดี')
const approveper = ref('พล.ต.ล สมหวัง ใจแข็งแกร่ง')

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
        work_array: zod.array(
            zod.object({
                responsible_employee_id: zod.number({
                    required_error: requireValue,
                    invalid_type_error: requireValue,
                }),
                responsible_employee_fullname: zod.string().nonempty(requireValue).default(""),
                date_start: zod.string().nonempty(requireValue).default(""),
                date_end: zod.string().nonempty(requireValue).default(""),
                text_jobs_process_detail: zod.string().nonempty(requireValue).default(""),
            })
        ),
    })
);
const { handleSubmit, errors, handleReset } = useForm({
    initialValues: {
        work_array: [
            {
                id: undefined,
                setting_approve: true,
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
const { value: plan_job_employee_id } = useField("plan_job_employee_id");
const { value: approve_plan_employee_id } = useField("approve_plan_employee_id");
const { value: jobs_level_of_urgency_code } = useField("jobs_level_of_urgency_code");
const { value: jobs_level_priority_code } = useField("jobs_level_priority_code");
const { value: jobs_level_secret_code } = useField("jobs_level_secret_code");
const { value: status } = useField('status', null, {
    initialValue: 1 // กำหนดค่าเริ่มต้นที่นี่
})

const route = useRoute();
const resProcessJobs = ref();
const loadDataToForm = async () => {
    try {
        const res = await dataApi.getProcessJobById(route.params.id);
        resProcessJobs.value = res.data.data;
        name.value = res.data.data?.jobs?.name
        plan_job_employee_id.value = res.data.data?.jobs?.plan_job_employee_id
        approve_plan_employee_id.value = res.data.data?.jobs?.approve_plan_employee_id
        jobs_level_of_urgency_code.value = res.data.data?.jobs?.jobs_level_of_urgency_code
        jobs_level_priority_code.value = res.data.data?.jobs?.jobs_level_priority_code
        jobs_level_secret_code.value = res.data.data?.jobs?.jobs_level_secret_code
        res.data.data?.jobs_process.forEach((e, i) => {
            fields.value[i].value.id = e.id;
            fields.value[i].value.setting_approve = e.tools?.setting_approve == 1 ? true : false;
            fields.value[i].value.responsible_employee_id = e.responsible_employee_id;
            fields.value[i].value.responsible_employee_fullname = e.responsible_employee_fullname;
            fields.value[i].value.date_start = e.date_start;
            fields.value[i].value.date_end = e.date_end;
            fields.value[i].value.text_jobs_process_detail = e.text_jobs_process_detail;
        });
        // jobs_process: fields.value.map((item) => ({
        //         responsible_employee_id: item.value.responsible_employee_id,
        //         responsible_employee_fullname: item.value.responsible_employee_fullname,
        //         date_start: item.value.date_start,
        //         date_end: item.value.date_end,
        //         text_jobs_process_detail: item.value.text_jobs_process_detail,
        //         setting_approve: item.value.setting_approve ? 1 : 0 // 1 : 0 (ตั้งค่า approve)
        //     })),

        // name.value = res.data.data?.jobs?.name
        // name.value = res.data.data?.jobs?.name
        // name.value = res.data.data?.jobs?.name
    } catch (error) {
        console.error(error);
    }
}

const { remove, push, fields } = useFieldArray("work_array");

const confirmRemove = async (item, index) => {
    console.log(item)
    showConfirmDialog({
        title: 'ลบข้อมูล',
        message:
            `ยืนยันการลบลำดับผู้รับผิดชอบลำดับที่ ${index + 1} ใช่หรือไม่`,
    })
        .then(() => {
            if (item.id) {
                deleteJobProcess(item.id)
            }
            remove(index)
        })
        .catch(() => {
        });
}

const deleteJobProcess = async (id) => {
    try {
        const res = await dataApi.deleteProcessJobById(id)
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };
    } catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }

}
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
}

const onSubmit = handleSubmit((values) => {
    savejob(values);
});

const savejob = async (values) => {
    // console.log('values.work_array', values.work_array)
    try {
        const payload = {
            name: name.value,
            plan_job_employee_id: plan_job_employee_id.value,
            approve_plan_employee_id: approve_plan_employee_id.value,
            jobs_level_of_urgency_code: jobs_level_of_urgency_code.value?jobs_level_of_urgency_code.value:"",
            jobs_level_priority_code: jobs_level_priority_code.value?jobs_level_priority_code.value:"",
            jobs_level_secret_code: jobs_level_secret_code.value?jobs_level_secret_code.value:"",
            // type => 'create’=>’สร้างของตนเอง’ | 'assign' =>’สร้างให้ผู้อื่นรับผิดชอบงาน’
            // "type":"create",
            status: 1, // 1 | 0
            jobs_process: fields.value.map((item) => ({
                jobs_process_id: item.value.id,
                responsible_employee_id: item.value.responsible_employee_id,
                responsible_employee_fullname: item.value.responsible_employee_fullname,
                date_start: item.value.date_start,
                date_end: item.value.date_end,
                text_jobs_process_detail: item.value.text_jobs_process_detail,
                setting_approve: item.value.setting_approve ? 1 : 0 // 1 : 0 (ตั้งค่า approve)
            })),
        }
        console.log(payload)
        const res = await dataApi.updateJobs(payload,route.params.id);
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };
        router.go(-1)
        // handleReset();
    } catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }
}

</script>