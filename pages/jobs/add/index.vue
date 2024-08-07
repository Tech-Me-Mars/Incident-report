<template>
    <HeaderMainProfile />
    <!-- <PageJobsAddHeader /> -->

    <section class="p-3">
        <HeaderMenu class="flex justify-start items-center gap-5">
            <p class="font-bold text-lg">Jobs</p>
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
                        :options="resPoliceHeadStation" class="w-full" value="employee_id" label="fullname"
                        :error="errors.approve_plan_employee_id" />
                </div>
                <div class="mb-2">
                    <TmmTypographyLabelForm label="ลำดับความเร่งด่วน" />
                    <!-- <TmmInputDropDown v-model="jobs_level_of_urgency_code" placeholder="" className=""
                        :options="resgetUrgency" class="w-full" value="code" label="name"
                        :error="errors.jobs_level_of_urgency_code" >dd</TmmInputDropDown> -->
                    <a-select @change="urgencyChange" allowClear v-model:value="jobs_level_of_urgency_code"
                        :status="errors?.jobs_level_of_urgency_code ? 'error' : ''" class="custom-select w-full"
                        :style="{ backgroundColor: urgencyBgColor, color: urgencyTextColor }">
                        <a-select-option v-for="(item, index) in resgetUrgency" :key="index"
                            :style="{ backgroundColor: item?.bg_color, color: item?.color }" :value="item?.code"
                            :data-bg-color="item?.bg_color" :data-color="item?.color">
                            {{ item?.name }}
                        </a-select-option>
                    </a-select>

                </div>
                <div class="mb-2">
                    <TmmTypographyLabelForm label="ลำดับความสำคัญ" />
                    <!-- <TmmInputDropDown v-model="jobs_level_priority_code" placeholder="" className=""
                        :options="resPriority" class="w-full" value="code" label="name"
                        :error="errors.jobs_level_priority_code" /> -->
                    <a-select @change="priorityChange" allowClear v-model:value="jobs_level_priority_code"
                        :status="(errors?.jobs_level_priority_code ? 'error' : '')" class="custom-select w-full"
                        :style="{ backgroundColor: priorityBgColor, color: priorityTextColor }">
                        <a-select-option v-for="(item, index) in resPriority" :key="index"
                            :style="{ backgroundColor: item?.bg_color, color: item?.color }" :value="item?.code">{{
                                item?.name }}</a-select-option>
                    </a-select>
                </div>
                <div class="mb-2">
                    <TmmTypographyLabelForm label="ชั้นความลับ" />
                    <!-- <TmmInputDropDown v-model="jobs_level_secret_code" placeholder="" className=""
                        :options="resgetSecret" class="w-full" value="code" label="name"
                        :error="errors.jobs_level_secret_code" /> -->
                    <a-select @change="secretChange" allowClear v-model:value="jobs_level_secret_code"
                        :status="(errors?.jobs_level_secret_code ? 'error' : '')" class="custom-select w-full"
                        :style="{ backgroundColor: secretBgColor, color: secretTextColor }" >
                        <a-select-option v-for="(item, index) in resgetSecret" :key="index"
                            :style="{ backgroundColor: item?.bg_color, color: item?.color }" :value="item?.code">{{
                                item?.name }}</a-select-option>
                    </a-select>
                </div>
            </div>

            <div class="card p-3 mb-3" v-for="(item, index) in fields" :key="item.key">
                <div class="flex justify-between">
                    <TmmTag color="#1677ff" class="rounded-xl mb-2">ลำดับที่ {{ index + 1 }}</TmmTag>
                    <CloseCircleTwoTone v-if="fields.length > 1" @click="confirmRemove(item, index)" />
                </div>
                <div class="grid grid-cols-1">
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="ผู้รับผิดชอบ" />
                        <TmmInputDropDown v-model="item.value.responsible_employee_id" @change="
                            inquiryEmpChange(item.value.responsible_employee_id, index)
                            " placeholder="" className="" :options="resInquiryEmp" class="w-full" value="employee_id"
                            label="fullname" :error="errors[`work_array[${index}].responsible_employee_id`]" />
                    </div>
                </div>
                <div class="my-1">
                    <TmmTypographyLabelForm label="ระยะเวลาดำเนินงาน" />
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="วันที่เริ่มต้น" />
                        <TmmInputCalendar class="w-full" v-model="item.value.date_start"
                            :error="errors[`work_array[${index}].date_start`]" />
                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="วันที่สิ้นสุด" />
                        <TmmInputCalendar class="w-full" v-model="item.value.date_end"
                            :error="errors[`work_array[${index}].date_end`]" />
                    </div>
                </div>
                <div class="grid grid-cols-1">
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="รายละเอียดงาน" />
                        <TmmInputTextarea :rows="2" v-model="item.value.text_jobs_process_detail"
                            :error="errors[`work_array[${index}].text_jobs_process_detail`]" />
                    </div>
                    <div class="mb-2 flex flex-col">
                        <TmmTypographyLabelForm label="ตั้งค่าการอนุมัติ" />
                        <span>
                            <TmmInputSwitch v-model="item.value.setting_approve" />
                        </span>
                    </div>
                </div>
                <div class="flex flex-col">
                    <TmmTypographyLabelForm label="ข้อกำหนดส่งงาน (เลือกได้มากกว่า1ข้อ)" />
                    <TmmTypographyTextValidator v-if="errors[`work_array[${index}].access_file_array`]"
                        :errors="'กรุณาเลือกอย่างน้อย 1 ประเภทไฟล์'" />
                    <a-space v-if="resTypeFileUpload.length > 0" direction="horizontal" wrap>
                        <a-button v-for="typeFile in resTypeFileUpload" :key="typeFile.name"
                            @click="toggleSelect(index, typeFile.type)" :class="{
                                '!bg-blue-600 !text-white': isSelected(index, typeFile.type),
                                '!text-gray-700': !isSelected(index, typeFile.type),
                            }" class="!flex !flex-col !items-center rounded cursor-pointer !h-[3.5rem]">
                            <i v-if="typeFile.is_use_class" :class="typeFile.icon_class"
                                :style="{ fontSize: '18px', color: typeFile.color }"></i>
                            <img v-else :src="typeFile.image_path" alt="" class="w-5" />
                            <span>{{ typeFile.name }}</span>
                        </a-button>
                    </a-space>
                </div>
            </div>

            <div class="w-full px-10 py-5 mb-3">
                <TmmButton type="primary" outlined icon="mdi mdi-plus" label="เพิ่มลำดับงาน" @click="
                    push({
                        setting_approve: true,
                        responsible_employee_id: undefined,
                        responsible_employee_fullname: undefined,
                        date_start: undefined,
                        date_end: undefined,
                        text_jobs_process_detail: undefined,
                        access_file_array: [],
                    })
                    " className="border-gray-400 text-gray-600 w-full" />
            </div>
            <div class="flex gap-5 justify-center max-w-[20rem] mx-auto">
                <TmmButton type="primary" severity="secondary" :loading="disabledButton" className="w-full"
                    label="ยกเลิก" @click="router.push('/')" />
                <TmmButton type="primary" severity="primary" :loading="disabledButton" className="w-full"
                    htmlType="submit" label="บันทึก" />
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
definePageMeta({
  middleware: ["auth"],
  // or middleware: 'auth'
});
useHead({ title: 'สร้าง job' });
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
const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({});

onMounted(() => {
    loadPoliceHeadStation();
    loadPlanJobEmp();
    loadInquiryEmp();
    loadUrgency();
    loadPriority();
    loadSecret();
    loadTypeFileUpload();
});

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

const optionFile = ref([
    { id: 1, name: "pdf", path: "/image/icon/pdf.png" },
    { id: 2, name: "jpeg", path: "/image/icon/jpeg.png" },
    { id: 3, name: "word", path: "/image/icon/word.png" },
    { id: 4, name: "excel", path: "/image/icon/excel.png" },
    { id: 5, name: "power point", path: "/image/icon/ppt.png" },
]);

const toggleSelect = (index, type) => {
    const selectedArray = fields.value[index].value.access_file_array;
    if (selectedArray.includes(type)) {
        fields.value[index].value.access_file_array = selectedArray.filter(item => item !== type);
    } else {
        fields.value[index].value.access_file_array.push(type);
    }
};
const isSelected = (index, type) => {
    return fields.value[index].value.access_file_array.includes(type);
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

const resgetUrgency = ref([]);
const loadUrgency = async () => {
    try {
        const res = await dataApi.getUrgency();
        resgetUrgency.value = res.data.data;
    } catch (error) {
        console.error(error);
    }
};

const resPriority = ref([]);
const loadPriority = async () => {
    try {
        const res = await dataApi.getPriority();
        resPriority.value = res.data.data;
    } catch (error) {
        console.error(error);
    }
};

const resgetSecret = ref([]);
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

const optionsWorkSubmit = ref([
    {
        value: "pdf",
        label: "PDF",
        icon: "pdf.png",
    },
    {
        value: "jpeg",
        label: "JPEG",
        icon: "jpeg.png",
    },
    {
        value: "word",
        label: "Word",
        icon: "word.png",
    },
    {
        value: "excel",
        label: "Excel",
        icon: "excel.png",
    },
    {
        value: "power point",
        label: "Power Point",
        icon: "ppt.png",
    },
]);

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
        work_array: zod.array(
            zod.object({
                access_file_array: zod.array(zod.any()).nonempty("Array must have at least one item"),
                responsible_employee_id: zod.number({
                    required_error: requireValue,
                    invalid_type_error: requireValue,
                }),
                responsible_employee_fullname: zod
                    .string()
                    .nonempty(requireValue)
                    .default(""),
                date_start: zod.string().nonempty(requireValue).default(""),
                date_end: zod.string().nonempty(requireValue).default(""),
                text_jobs_process_detail: zod
                    .string()
                    .nonempty(requireValue)
                    .default(""),
            })
        ),
    })
);
const { handleSubmit, errors, handleReset } = useForm({
    initialValues: {
        work_array: [
            {
                setting_approve: true,
                responsible_employee_id: undefined,
                responsible_employee_fullname: undefined,
                date_start: undefined,
                date_end: undefined,
                text_jobs_process_detail: undefined,
                access_file_array: [],
            },
        ],
    },
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

const { remove, push, fields } = useFieldArray("work_array");

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
const disabledButton = ref(false)
const savejob = async (values) => {
    console.log("values.work_array", values.work_array);
    try {
        disabledButton.value = true;
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
            // type => 'create’=>’สร้างของตนเอง’ | 'assign' =>’สร้างให้ผู้อื่นรับผิดชอบงาน’
            // "type":"create",
            status: 1, // 1 | 0
            jobs_process: fields.value.map((item) => ({
                responsible_employee_id: item.value.responsible_employee_id,
                responsible_employee_fullname: item.value.responsible_employee_fullname,
                date_start: item.value.date_start,
                date_end: item.value.date_end,
                text_jobs_process_detail: item.value.text_jobs_process_detail,
                setting_approve: item.value.setting_approve ? 1 : 0, // 1 : 0 (ตั้งค่า approve)
                allow_file_upload_type_arr: item.value.access_file_array
            })),

        };
        console.log(payload);
        const res = await dataApi.saveJobs(payload);
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };
        handleReset();
        disabledButton.value = false;
        navigateTo("/");
    } catch (error) {
        disabledButton.value = false;
        errorAlert.value = true;
        dataError.value = error;
        console.error(error);
    }
};

const urgencyBgColor = ref('');
const urgencyTextColor = ref('');
const urgencyChange = (value) => {
    try {
        const selectedItem = resgetUrgency.value.find(item => item.code == value);
        if (selectedItem) {
            urgencyBgColor.value = selectedItem.bg_color;
            urgencyTextColor.value = selectedItem.color;
        } else {
            urgencyBgColor.value = null;
            urgencyTextColor.value = null;
        }
    } catch (error) {
        console.error(error)
    }
};

const priorityBgColor = ref('');
const priorityTextColor = ref('');
const priorityChange = (value) => {
    try {
        const selectedItem = resPriority.value.find(item => item.code == value);
        if (selectedItem) {
            priorityBgColor.value = selectedItem.bg_color;
            priorityTextColor.value = selectedItem.color;
        } else {
            priorityBgColor.value = null;
            priorityTextColor.value = null;
        }
    } catch (error) {
        console.error(error)
    }
};


const secretBgColor = ref('');
const secretTextColor = ref('');
const secretChange = (value) => {
    try {
        const selectedItem = resgetSecret.value.find(item => item.code == value);
        if (selectedItem) {
            secretBgColor.value = selectedItem.bg_color;
            secretTextColor.value = selectedItem.color;
        } else {
            secretBgColor.value = null;
            secretTextColor.value = null;
        }
    } catch (error) {
        console.error(error)
    }
};

</script>

<style>
.custom-select .ant-select-selector {
    background-color: var(--bg-color) !important;
    color: var(--text-color) !important;
}

/* .custom-select .ant-select-selection-item {
    background-color: var(--bg-color) !important;
    color: var(--text-color) !important;
} */
</style>
