<template>

    <Form @submit="onSubmit">
        <div class="card p-3 mb-3">
            <div class="mb-2">
                <TmmTypographyLabelForm label="ชื่อแผนงาน" />
                <TmmInput v-model="name" :error="errors.name" />
            </div>
            <div class="mb-2">
                <TmmTypographyLabelForm label="ผู้วางแผน" />
                <TmmInputDropDown v-model="plan_job_employee_id" placeholder="" className="" :options="resPlanJobEmp"
                    class="w-full" value="id" label="fullname" :error="errors.plan_job_employee_id" />
            </div>
            <div class="mb-2">
                <TmmTypographyLabelForm label="ผู้อนุมัติแผนงาน" />
                <TmmInputDropDown v-model="approve_plan_employee_id" placeholder="" className=""
                    :options="resPoliceHeadStation" class="w-full" value="id" label="fullname"
                    :error="errors.approve_plan_employee_id" />
            </div>
        </div>




        <div class="card p-3 mb-3" v-for="(item, index) in fields" :key="item.key">
            <div class="flex justify-between">
                <TmmTag color="#1677ff" class="rounded-xl mb-2">ลำดับที่ {{ index + 1 }}</TmmTag>
                <CloseCircleTwoTone @click="confirmRemove(item, index)" />
            </div>
            <div class="grid grid-cols-1">
                <div class="mb-2">
                    <TmmTypographyLabelForm label="ผู้รับผิดชอบ" />
                    <TmmInputDropDown v-model="item.value.responsible_employee_id"
                        @change="inquiryEmpChange(item.value.responsible_employee_id, index)" placeholder=""
                        className="" :options="resInquiryEmp" class="w-full" value="employee_id" label="fullname"
                        :error="errors.responsible_employee_id" />
                </div>
            </div>
            <div class="my-1">
                <TmmTypographyLabelForm label="ระยะเวลาดำเนินงาน" />
            </div>
            <div class="grid grid-cols-2 gap-2">
                <div class="mb-2">
                    <TmmTypographyLabelForm label="วันที่เริ่มต้น" />
                    <TmmInputCalendar class="w-full" v-model="item.value.date_start" />
                </div>
                <div class="mb-2">
                    <TmmTypographyLabelForm label="วันที่สิ้นสุด" />
                    <TmmInputCalendar class="w-full" v-model="item.value.date_end" />
                </div>
            </div>
            <div class="grid grid-cols-1">
                <div class="mb-2">
                    <TmmTypographyLabelForm label="รายละเอียดงาน" />
                    <TmmInputTextarea :rows="2" v-model="item.value.text_jobs_process_detail" />
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
                setting_approve: undefined,
                responsible_employee_id: undefined,
                responsible_employee_fullname: undefined,
                date_start: undefined,
                date_end: undefined,
                text_jobs_process_detail: undefined,

            })" className="border-gray-400 text-gray-600 w-full" />
        </div>
        <div class="flex gap-5 justify-center max-w-[20rem] mx-auto">
            <TmmButton type="primary" severity="secondary" className="w-full" label="ยกเลิก" />
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
                <p class="text-center text-gray-500 text-md mb-2">ไม่สามารถเข้าร่วมโครงการได้ เนื่องจาก พล.ต.ท สมหมาย
                    มีชัย
                    มีแผนงานมากเกินไป</p>
                <div class="flex justify-center">
                    <TmmButton label="ตกลง" @click="open = false" type="primary" severity="warning"
                        className="w-[10rem]" size="large" />
                </div>
            </div>
        </a-modal>
    </div>
</template>
<script setup>
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
});

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
const { value: plan_job_employee_id } = useField("plan_job_employee_id");
const { value: status } = useField('status', null, {
    initialValue: 1 // กำหนดค่าเริ่มต้นที่นี่
})
const { value: approve_plan_employee_id } = useField("approve_plan_employee_id");
const { remove, push, fields } = useFieldArray("work_array");

const confirmRemove = async (item, index) => {
    showConfirmDialog({
        title: 'ลบข้อมูล',
        message:
            `ยืนยันการลบลำดับผู้รับผิดชอบลำดับที่ ${index + 1} ใช่หรือไม่`,
    })
        .then(() => {
            remove(index)
        })
        .catch(() => {
        });
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
    console.log('values.work_array', values.work_array)
    try {
        const payload = {
            name: name.value,
            plan_job_employee_id: plan_job_employee_id.value,
            approve_plan_employee_id: approve_plan_employee_id.value,
            // type => 'create’=>’สร้างของตนเอง’ | 'assign' =>’สร้างให้ผู้อื่นรับผิดชอบงาน’
            // "type":"create",
            status: 1, // 1 | 0
            jobs_process: fields.value.map((item) => ({
                responsible_employee_id: item.value.responsible_employee_id,
                responsible_employee_fullname: item.value.responsible_employee_fullname,
                date_start: item.value.date_start,
                date_end: item.value.date_end,
                text_jobs_process_detail: item.value.text_jobs_process_detail,
                setting_approve: item.value.setting_approve ? 1 : 0 // 1 : 0 (ตั้งค่า approve)
            })),
        }
        console.log(payload)
        const res = await dataApi.saveJobs(payload);
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