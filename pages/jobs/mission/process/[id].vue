<template>
    <HeaderMainProfile />
    <!-- {{ fields }} -->
    <section class="p-3">
        <PageMissionProcessHeader />
        <!-- <PageMissionProcessProjectname /> -->
        <TmmCard class="!bg-blue-600 mb-2 card !rounded-b-none pb-0 px-0">
            <template #header>
                <div class="py-1 px-2">
                    <div class="grid grid-cols-10">
                        <div class="col-span-9">
                            <TmmLabelSubtitle class="text-white" :label="resJobProcess?.jobs?.name || ''" />
                        </div>
                        <div class="col-span-1 flex justify-end">
                            <a-popover placement="leftTop" :title="resJobProcess?.jobs?.jobs_level_of_urgency?.name">
                                <i :class="`${resJobProcess?.jobs?.jobs_level_of_urgency?.icon_class}`"
                                    :style="{ color: resJobProcess?.jobs?.jobs_level_of_urgency.color }"></i>
                            </a-popover>
                            <a-popover placement="leftTop" :title="resJobProcess?.jobs?.jobs_level_priority?.name">
                                <i :class="`${resJobProcess?.jobs?.jobs_level_priority?.icon_class}`"
                                    :style="{ color: resJobProcess?.jobs?.jobs_level_priority.color }"></i>
                            </a-popover>
                        </div>
                    </div>
                </div>
            </template>
            <template #body>
                <div class="px-2">
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
                </div>
            </template>
            <template #footer>

                <div v-if="resJobProcess?.jobs?.jobs_level_secret?.bg_color"
                    class="p-0 py-2 flex items-center justify-center"
                    :style="{ backgroundColor: resJobProcess?.jobs?.jobs_level_secret.bg_color }">
                    <div class="text-white">
                        {{ resJobProcess?.jobs?.jobs_level_secret?.name }}
                    </div>
                </div>
            </template>
        </TmmCard>
        <!-- <hr /> -->
        <!-- <PageMissionProcessForm /> -->
        <Form @submit="onSubmit" class="!bg-gray-100">
            <div class="card p-3 mb-3">
                <div class="flex justify-between mb-2">
                    <TmmTag class="!px-4 !py-1"
                        :style="{ color: resJobProcess?.status?.color, backgroundColor: resJobProcess?.status?.bg_color }">
                        {{ resJobProcess?.status?.name }}
                    </TmmTag>
                    <TmmTag color="#f0c424" class="rounded-xl mb-2">ลำดับที่ {{ sort_no }}
                    </TmmTag>
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
                        <TmmInputCalendar v-model="date_start" disabled />
                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="วันที่สิ้นสุด" />
                        <TmmInputCalendar @change="changeDateEnd" v-model="date_end"
                            :disabled="!resJobProcess?.tools?.can_edit_date_end" />
                    </div>
                </div>
                <div class="grid grid-cols-1 mb-2">
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="รายละเอียดงาน" />
                        <TmmInputTextarea :auto-size="{ minRows: 3, maxRows: 99 }" disabled
                            v-model="text_jobs_process_detail" />
                    </div>
                    <!-- v-if="resJobProcess?.tools?.text_process_note_status == true" -->
                    <div class="mb-2" v-if="text_process_note_status == true">
                        <TmmTypographyLabelForm label="รายละเอียดที่ต้องแก้ไข" />
                        <TmmInputTextarea readonly :auto-size="{ minRows: 3, maxRows: 99 }" v-model="text_process_note"
                            :error="errors?.text_process_note" />
                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="ดำเนินการ" />
                        <TmmInputTextarea :auto-size="{ minRows: 3, maxRows: 99 }" v-model="text_process"
                            :error="errors.text_process" />
                    </div>
                </div>

                <Divider>
                    <TmmTypographyLabelForm class="mb-1" label="อัพโหลดงาน" />
                    <div v-if="resJobProcess?.jobs_process?.allow_file_upload_type_arr?.length > 0">
                        <div class="mb-3 card p-2"
                            v-for="(item, index) in resJobProcess?.jobs_process?.allow_file_upload_type_arr"
                            :key="index">
                            <div class="mb-1">
                                <div class="text-xs">กรุณาอัพโหลด {{ item }}</div>
                                <div class="text-xs text-red-600" v-if="attachment_file[index]?.length == 0">
                                    อัพโหลดอย่างน้อย 1
                                    ไฟล์</div>
                                <a-upload v-model:file-list="attachment_file[index]" :accept="customeAccept(item)"
                                    list-type="text" multiple name="file" :headers="headers"
                                    :custom-request="customRequestAddFile" @preview="handlePreview"
                                    @remove="handleRemove">
                                    <a-button>
                                        <upload-outlined></upload-outlined>
                                        เลือกไฟล์
                                    </a-button>
                                </a-upload>
                                <TmmTypographyTextValidator
                                    v-if="errors.attachment_file && errors.attachment_file[index]"
                                    :errors="errors.attachment_file[index]" />
                            </div>
                        </div>
                    </div>
                </Divider>

                <TmmTypographyLabelForm class="mb-1" label="เพิ่มค่าใช้จ่ายในการปฏิบัติงาน" />
                <div class="grid grid-cols-1  gap-3 mb-2 card p-2" v-for="(item, index) in fields" :key="item.key">
                    <div class="flex justify-between">
                        <TmmTag color="#1677ff" class="rounded-xl mb-2">ค่าใช้จ่ายที่ {{ index + 1 }}
                        </TmmTag>
                        <CloseCircleTwoTone two-tone-color="red" v-if="fields.length > 1"
                            @click="confirmRemove(item, index)" />
                    </div>
                    <div class="">
                        <TmmInputDropDown @change="() => checkMoreinput(item)" v-model="item.value.type_expense_code"
                            placeholder="ประเภทค่าใช้จ่าย..." className="" :options="resTypeExpense" class="w-full"
                            value="code" label="detail"
                            :error="errors[`expense_type_array[${index}].type_expense_code`]" />
                    </div>
                    <div class="">
                        <TmmInput v-if="item.value.type_expense_text_more_status"
                            v-model="item.value.type_expense_text_more" placeholder="ประเภทอื่น ๆ..." class="w-full"
                            :error="errors[`expense_type_array[${index}].price`]" />
                    </div>
                    <div class="">
                        <labl>ยอดค่าใช้จ่าย (บาท)</labl>
                        <TmmInputNumber v-model="item.value.price" placeholder="ยอดใช้จ่าย..." class="w-full"
                            :error="errors[`expense_type_array[${index}].price`]" />
                    </div>
                    <div>

                        <a-upload :maxCount="1" accept="*" :multiple="false" :before-upload="beforeUpload"
                            v-model:file-list="item.value.attachment_file" list-type="text"
                            :showUploadList="{ showRemoveIcon: false }" @preview="handlePreviewExpnse" :max-count="1">
                            <a-button>
                                เลือกไฟล์
                            </a-button>
                        </a-upload>
                        <!-- <TmmInputUploadFile /> -->
                        <TmmTypographyTextValidator v-if="errors.attachment_file"
                            :errors="errors[`expense_type_array[${index}].attachment_file`]" />
                    </div>

                    <div class="text-center">
                        <TmmButton v-if="item.value.id" type="primary" :disabled="isButtonDisabled(item)"
                            @click="updateExpense(item)" htmlType="button" label="อัพเดท"></TmmButton>
                        <TmmButton v-else type="primary" :disabled="isButtonDisabled(item)" @click="insertExpense(item)"
                            htmlType="button" label="ยืนยันค่าใช้จ่าย"></TmmButton>
                    </div>
                </div>
                <div class="flex justify-center py-2 pb-3 mb-3">
                    <TmmButton type="primary" severity="secondary" icon="mdi mdi-plus"
                        label="เพิ่มค่าใช้จ่ายในการปฏิบัติงาน" @click="pushExpense()" className="" />
                </div>

                <!-- expense_type: undefined,
                expense_total: undefined,
                expense_file: [], -->


                <!-- <div class="flex flex-col gap-2 mb-2">
                    <TmmTypographyLabelForm label="เอกสารที่เกี่ยวข้อง (ถ้ามี)" />
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
                </div> -->

                <!-- <div class="grid grid-cols-1 mb-2">
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="สถานะดำเนินงาน" />
                        <TmmInputDropDown v-model="status_approve" placeholder="สถานะดำเนินงาน" className=""
                            :options="resJobStatusProcessApprove" class="w-full" value="id" label="name"
                            :error="errors.status_approve" />
                    </div>
                </div> -->

            </div>


            <div class="flex gap-5 justify-center  mx-auto">

                <TmmButton @click="redirectToJobPage()" type="primary" severity="secondary" class="!w-full"
                    className="!w-full" label="ยกเลิก" />
                <TmmButton @click="jobs_status_process_id = 2" type="primary" severity="primary" className="w-full"
                    htmlType="submit" label="บันทึกแบบร่าง" />
                <TmmButton @click="jobs_status_process_id = 3" type="primary" severity="success" className="w-full"
                    htmlType="submit" label="ส่งงาน" :disabled="isSaveButtonDisabled" />
            </div>

            <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
                <!-- <img alt="example" class="pt-5" style="width: 100%" :src="currentFile" /> -->
                <a-image style="width: 100%" :src="currentFile" />
            </a-modal>

        </Form>
        <!-- <div>
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
        </div> -->
        <a-modal v-model:open="pdfVisible" width="100%" wrap-class-name="full-modal" :footer="null"
            @cancel="handleCancel" style="max-width: 100%;
    top: 0;
    padding-bottom: 0;
    padding-top: 0;
    margin: 0;
    flex: 1;">
            <div class="" style="    display: flex;
    flex-direction: column;
    height: calc(100vh);
    flex: 1;">
                <iframe :src="currentFile" class="w-full pt-5 h-[100%]"></iframe>
            </div>
        </a-modal>

    </section>
    <a-modal v-model:open="changeDateEndModal" centered :footer="false" width="1000px">
        <div class="p-5">
            <div class="flex justify-center flex-col items-center mb-5">
                <FrownOutlined class="mb-3" style="font-size: 120px; color: #fcc03f;" />
                <h1 class="text-4xl" style="color: #f8b31e;">confirm!</h1>
            </div>
            <h1 class="text-center text-xl font-medium mb-2">เปลี่ยนวันที่สิ้นสุด</h1>
            <p class="text-center text-gray-500 text-md mb-2">คุณต้องการยืนยันการแก้ไขเวลาสิ้นสุดงานหรือใหม่ <span
                    class="text-red-500">(สามาแก้ไขได้1ครั้ง)</span></p>
            <div class="flex justify-center gap-2">
                <TmmButton label="ตกลง" @click="confirmChangeDateEnd" type="primary" severity="warning"
                    className="w-[10rem]" size="large" />
                <TmmButton label="ยกเลิก" @click="cancelChangeDateEnd" type="primary" severity="secondary"
                    className="w-[10rem]" size="large" />
            </div>
        </div>
    </a-modal>
    <TmmAlertToast :data="alertToast" :error="errorAlert" :dataError="dataError" />
</template>

<script setup>
definePageMeta({
   middleware: 'auth'
});
useHead({ title: 'โปรเซส' });
import { useRoute } from 'vue-router';
import * as dataApi from './api/data.js'
const route = useRoute()
const router = useRouter()
console.log(route.query)
//! /////// [validation] /////////
const open = ref(false);
const showModal = () => {
    open.value = true;
};

const redirectToJobPage = () => {
    const jobid = route?.query?.jobid;
    if (jobid && jobid != "undefined") {
        router.push(`/jobs/mission/${jobid}`);
    } else {
        router.push("/");
    }
};

const isloadingAxi = useState('isloadingAxi')
const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({});

import { useFieldArray, useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
import { id } from 'date-fns/locale';


onMounted(async () => {
    await loadTypeExpense();
    await getJobProcess();

})
const isSaveButtonDisabled = computed(() => {
    const hasEmptyAttachment = attachment_file.value.some(subArray => subArray.length === 0);
    const isTextProcessNoteRequired = text_process_note_status.value == true && !text_process_note.value;
    return hasEmptyAttachment || isTextProcessNoteRequired;
});

const confirmChangeDateEnd = async () => {
    try {

        const payload = {
            date_end: date_end.value
        }
        const res = await dataApi.updateProcessDateEnd(payload, route.params.id)
        date_end_pre.value = date_end.value
        changeDateEndModal.value = false
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };
        getJobProcess();
    } catch (error) {
        changeDateEndModal.value = false
        date_end.value = date_end_pre.value
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }

}
const cancelChangeDateEnd = () => {
    changeDateEndModal.value = false
    //คือนค่ากลับ
    date_end.value = date_end_pre.value
}
// status_approve
const changeDateEndModal = ref(false)
const changeDateEnd = (e) => {
    try {
        changeDateEndModal.value = true;

        console.log('e', e)

    } catch (error) {
        console.error(error)
    }
}

const resJobStatusProcessApprove = ref();
const loadJobStatusProcessApprove = async () => {
    try {
        let res = undefined;
        if (is_complete.value == 1) {
            res = await dataApi.getJobStatusProcessApprove();
        }
        else if (can_approve.value == 1) {
            res = await dataApi.getJobStatusProcessApprove();
        } else {
            res = await dataApi.getJobStatusProcess();
        }
        resJobStatusProcessApprove.value = res.data.data;
    } catch (error) {
        console.error(error);
    }
}

// const { value: text_process_note_status } = useField('text_process_note_status', null, {
//     initialValue: false // กำหนดค่าเริ่มต้นที่นี่
// })
const text_process_note_status = ref(false)
const requireValue = "กรุณาระบุข้อมูล";
const validationSchema = toTypedSchema(
    zod.object({
        text_process: zod.string().nonempty(requireValue).default(""),
        // text_process_note: zod.union([zod.string({
        //             required_error: requireValue,
        //             invalid_type_error: requireValue,
        //         }).nonempty(requireValue), zod.undefined()]).optional(),
        jobs_status_process_id: zod.number({
            required_error: requireValue,
            invalid_type_error: requireValue,
        }),
        // status_approve: zod.number({
        //     required_error: requireValue,
        //     invalid_type_error: requireValue,
        // }),
        // approve_plan_employee_id: zod.number({
        //     required_error: requireValue,
        //     invalid_type_error: requireValue,
        // }),
    })
    //     .refine(data => {
    //     if (text_process_note_status.value == true && !data.text_process_note) {
    //       return false;
    //     }
    //     return true;
    //   }, {
    //     message: 'date_start ต้องถูกกำหนดเมื่อ responsible_employee_id ถูกกำหนด',
    //     path: ['text_process_note'],
    //   })       
    // .refine(val => text_process_note_status.value != true || val !== "", {
    //         message: "Field is required when text_process_note_status is true",
    //         path: ["text_process_note"],
    //     })
);
const { handleSubmit, errors, handleReset } = useForm({
    initialValues: {
        expense_type_array: [
            {
                id: undefined,
                jobs_process_id: undefined,
                type_expense_code: undefined,
                expense_total: undefined,
                attachment_file: [],
                price: undefined,
                type_expense_text_more: undefined,
                type_expense_text_more_status: false
            },
        ],
    },
    validationSchema,
});


const customeAccept = (item) => {
    return item.split(',').map(ext => `.${ext.trim()}`).join(',');
};

const beforeUpload = file => {
    fields.value.forEach((e, i) => {
        fields.value[i].value.attachment_file.forEach((item, index) => {
            // alert(JSON.stringify(fields.value[i].value))
            // .attachment_file
            
            fields.value[i].value.attachment_file[item].status = "done"
        })

    });
};

const { value: name } = useField("name");
const { value: sort_no } = useField("sort_no");
const { value: plan_job_employee_id } = useField("plan_job_employee_id");
const { value: approve_plan_employee_id } = useField("approve_plan_employee_id");

const { value: responsible_employee_id } = useField("responsible_employee_id");
const { value: responsible_employee_fullname } = useField("responsible_employee_fullname");
const { value: date_start } = useField("date_start");
const { value: date_end } = useField("date_end");
const { value: date_end_pre } = useField("date_end_pre");

const { value: text_jobs_process_detail } = useField("text_jobs_process_detail");
// const { value: setting_approve } = useField("setting_approve");


const { value: text_process } = useField("text_process");
const { value: text_process_note } = useField("text_process_note");


const { value: text_process_approve } = useField("text_process_approve");
const { value: status } = useField("status");
const { value: edit } = useField("edit");
const { value: can_approve } = useField("can_approve");
const { value: is_complete } = useField("is_complete");
const { value: status_approve } = useField("status_approve");

const { value: attachment_file } = useField('attachment_file', null, {
    initialValue: [] // กำหนดค่าเริ่มต้นที่นี่
})
const { value: jobs_status_process_id } = useField('jobs_status_process_id')
const { value: attachment_file_expense } = useField('attachment_file_expense', null, {
    initialValue: [] // กำหนดค่าเริ่มต้นที่นี่
})
const { value: jobs_process_image } = useField('jobs_process_image', null, {
    initialValue: [] // กำหนดค่าเริ่มต้นที่นี่
})
const { remove, push, fields } = useFieldArray("expense_type_array");
const onSubmit = handleSubmit((values) => {
    savejob(values);
});

const pushExpense = () => {

    fields.value.push({
        key: fields.value.length + 1,
        value: {
            id: undefined,
            jobs_process_id: undefined,
            type_expense_code: undefined,
            expense_total: undefined,
            attachment_file: [],
            price: undefined,
            type_expense_text_more: undefined,
            type_expense_text_more_status: false
        }
    });
}
function isButtonDisabled(item) {
    const requiredMoreText = item.value.type_expense_text_more_status && !item.value.type_expense_text_more;
    return !item.value.type_expense_code || requiredMoreText || !item.value.price || !item.value.attachment_file.length;
}

const insertExpense = async (item) => {
    try {
        const formData = new FormData();

        formData.append('jobs_process_id', route.params.id);
        formData.append('type_expense_code', item.value.type_expense_code);
        if (item.value.attachment_file[0].url) {
            // ไม่ต้องส่ง เป็น url หมายถึงเขาไม่ได้อัพเดทรูป
            // formData.append('attachment_file', item.value.attachment_file[0].url);
        } else {
            formData.append('attachment_file', item.value.attachment_file[0].originFileObj);
        }
        formData.append('price', item.value.price?item.value.price:0);
        formData.append('type_expense_text_more', item.value.type_expense_text_more ? item.value.type_expense_text_more : "");
        const res = await dataApi.insertProcessAttachmentExpense(formData);
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };
        rePlaceFileExpense(res.data.data)
        // getJobProcess()
    } catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }
    // getJobProcess()
}
const rePlaceFileExpense = (dataFileReplace) => {
    try {
        const generateRandomUid = () => Math.random().toString(36).substring(2, 15);
        if (dataFileReplace && fields.value) {
            dataFileReplace.forEach((e, i) => {
                // Check if the index exists in the fields.value array
                if (fields.value[i]) {
                    fields.value[i].value = {
                        id: e.id,
                        type_expense_code: e.type_expense_code,
                        type_expense_text_more: e.type_expense_text_more,
                        type_expense_text_more_status: e.type_expense_text_more_status,
                        price: e.price,
                        attachment_file: [
                            {
                                id: e.id,
                                uid: generateRandomUid(),
                                url: e.attachment_file,
                                name: e.attachment_file,
                            }
                        ]
                    };
                } else {
                    // If the index does not exist, create a new object
                    fields.value.push({
                        value: {
                            id: e.id,
                            type_expense_code: e.type_expense_code,
                            type_expense_text_more: e.type_expense_text_more,
                            type_expense_text_more_status: e.type_expense_text_more_status,
                            price: e.price,
                            attachment_file: [
                                {
                                    id: e.id,
                                    uid: generateRandomUid(),
                                    url: e.attachment_file,
                                    name: e.attachment_file,
                                }
                            ]
                        }
                    });
                }
            });
        }
    } catch (error) {
        console.log(error)
    }

}


const updateExpense = async (item) => {
    try {
        console.log(item.value.attachment_file[0])
        // item.value
        const formData = new FormData();

        formData.append('jobs_process_id', route.params.id);
        formData.append('type_expense_code', item.value.type_expense_code);
        if (item.value.attachment_file[0].url) {
            // ไม่ต้องส่ง เป็น url หมายถึงเขาไม่ได้อัพเดทรูป
            // formData.append('attachment_file', item.value.attachment_file[0].url);
        } else {
            formData.append('attachment_file', item.value.attachment_file[0].originFileObj);
        }
        formData.append('price', item.value.price);
        formData.append('type_expense_text_more', item.value.type_expense_text_more ? item.value.type_expense_text_more : "");
        const res = await dataApi.updateProcessAttachmentExpense(formData, item.value.id);
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };
        rePlaceFileExpense(res.data.data)
        // getJobProcess ()
    } catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }
    // getJobProcess()
}

function removeCustom(index) {
    fields.value.splice(index, 1);
}

const confirmRemove = async (item, index) => {
    showConfirmDialog({
        title: 'ลบข้อมูล',
        message:
            `ยืนยันการลบค่าใช้จ่ายลำดับที่ ${index + 1} ใช่หรือไม่`,
    })
        .then(() => {
            deleteProcessAttachmentExpense(item, index)
        })
        .catch(() => {
        });
}


const deleteProcessAttachmentExpense = async (item, index) => {
    try {
        if (!item.value.id) {
            return removeCustom(index)
        }
        const res = await dataApi.deleteProcessAttachmentExpense(item.value.id)
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };
        // getJobProcess()
        removeCustom(index)
    } catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }
    // getJobProcess();
}

const customRequestAddFile = async ({ action, file, headers, onSuccess, onError }) => {
    try {
        console.log(file)
        const formData = new FormData();
        formData.append('jobs_process_id[]', route.params.id);
        formData.append('attachment_file[]', file);
        const res = await dataApi.updateProcessImage(formData);
        onSuccess()
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };
        replaceIdImage(res.data.data);
        // handleReset();
        // getJobProcess()
    } catch (error) {
        onError()
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }
    // getJobProcess();
};
const replaceIdImage = (dataImageForReplace) => {
    try {
        const generateRandomUid = () => Math.random().toString(36).substring(2, 15);
        const groupedFiles = resJobProcess.value.jobs_process.allow_file_upload_type_arr.map(type => {
            const extensions = type.split(',').map(ext => ext.trim());
            return dataImageForReplace
                .filter(file => {
                    const fileExt = file.attachment_file.split('.').pop().toLowerCase();
                    return extensions.includes(fileExt);
                })
                .map(file => ({
                    uid: generateRandomUid(),
                    url: file.attachment_file,
                    name: file.attachment_file,
                    ...file
                }));
        });
        attachment_file.value = groupedFiles;
    } catch (error) {
        console.error(error)
    }
}


const previewVisible = ref(false);
const previewTitle = ref('');

const handleCancel = () => {
    previewVisible.value = false;
    previewTitle.value = '';
};
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const currentFile = ref('');
const pdfVisible = ref(false);

const handlePreview = async file => {
    try {
        // const previewTypeFiles = ['jpg', 'jpeg', 'png'];
        // const hasValidPreviewExtension = previewTypeFiles.some(ext => file.attachment_file.endsWith(`.${ext}`));
        // if (!hasValidPreviewExtension) {
        //     window.open(file.attachment_file, '_blank');
        //     return;
        // }
        // if (!file.url && !file.preview) {
        //     file.preview = await getBase64(file.originFileObj);
        // }

        // previewImage.value = file.url || file.preview;
        // previewVisible.value = true;
        // previewTitle.value = '';
        const fileExtension = file.attachment_file.split('.').pop().toLowerCase();
        if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg') {
            currentFile.value = file.attachment_file;
            previewVisible.value = true;
        } else if (fileExtension === 'pdf') {
            currentFile.value = file.attachment_file;
            pdfVisible.value = true;
        } else {
            window.location.href = file.attachment_file;
        }
    } catch (error) {
        console.error(error)
    }
};


const handlePreviewExpnse = async file => {
    // file.attachment_file
    try {
        const fileExtension = file.url.split('.').pop().toLowerCase();
        if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg') {
            currentFile.value = file.url;
            previewVisible.value = true;
        } else if (fileExtension === 'pdf') {
            currentFile.value = file.url;
            pdfVisible.value = true;
        } else {
            window.location.href = file.url;
        }
    } catch (error) {
        console.error(error)
    }

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

    } catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }
    // getJobProcess();
}



const resJobProcess = ref();
const getJobProcess = async () => {
    // try {
    const generateRandomUid = () => Math.random().toString(36).substring(2, 15);
    const res = await dataApi.getJobProcess(route.params.id);
    resJobProcess.value = res.data.data;
    if (resJobProcess.value?.tools?.can_edit == false) {
        const jobid = route?.query?.jobid;
        if (jobid && jobid != "undefined") {
            return navigateTo(`/jobs/mission/${jobid}`);
        } else {
            return navigateTo("/");
        }

    }
    text_process_note_status.value = resJobProcess.value?.tools?.text_process_note_status;
    if (resJobProcess.value?.jobs_process?.allow_file_upload_type_arr?.length > 0) {
        const groupedFiles = resJobProcess.value?.jobs_process?.allow_file_upload_type_arr?.map(type => {
            const extensions = type.split(',').map(ext => ext.trim());
            return resJobProcess.value?.attachment_file
                .filter(file => {
                    const fileExt = file.attachment_file.split('.').pop().toLowerCase();
                    return extensions.includes(fileExt);
                })
                .map(file => ({
                    uid: generateRandomUid(),
                    url: file.attachment_file,
                    name: file.attachment_file,
                    ...file
                }));
        });
        attachment_file.value = groupedFiles;
    }


    if (resJobProcess.value?.attachment_file_expense?.length > 0 && fields.value) {
        resJobProcess.value?.attachment_file_expense.forEach((e, i) => {
            // Check if the index exists in the fields.value array
            if (fields.value[i]) {
                fields.value[i].value = {
                    id: e.id,
                    type_expense_code: e.type_expense_code,
                    type_expense_text_more: e.type_expense_text_more,
                    type_expense_text_more_status: e.type_expense_text_more_status,
                    price: e.price,
                    attachment_file: [
                        {
                            id: e.id,
                            uid: generateRandomUid(),
                            url: e.attachment_file,
                            name: e.attachment_file,
                        }
                    ]
                };
            } else {
                // If the index does not exist, create a new object
                fields.value.push({
                    value: {
                        id: e.id,
                        type_expense_code: e.type_expense_code,
                        type_expense_text_more: e.type_expense_text_more,
                        type_expense_text_more_status: e.type_expense_text_more_status,
                        price: e.price,
                        attachment_file: [
                            {
                                id: e.id,
                                uid: generateRandomUid(),
                                url: e.attachment_file,
                                name: e.attachment_file,
                            }
                        ]
                    }
                });
            }
        });
    }





    sort_no.value = resJobProcess.value.jobs_process.sort_no;
    // responsible_employee_id.value = resJobProcess.value.jobs_process.sort_no;
    plan_job_employee_id.value = resJobProcess.value?.jobs?.plan_job_employee_id
    approve_plan_employee_id.value = resJobProcess.value?.jobs?.approve_plan_employee_id
    name.value = resJobProcess.value?.jobs?.name
    responsible_employee_fullname.value = resJobProcess.value.jobs_process.responsible_employee_fullname
    date_start.value = resJobProcess.value.jobs_process.date_start
    date_end.value = resJobProcess.value.jobs_process.date_end
    date_end_pre.value = resJobProcess.value.jobs_process.date_end
    text_process.value = resJobProcess.value.jobs_process.text_process
    jobs_status_process_id.value = resJobProcess.value.jobs_process.jobs_status_process_id
    text_jobs_process_detail.value = resJobProcess.value.jobs_process.text_jobs_process_detail
    text_process_note.value = resJobProcess.value.jobs_process?.text_process_note
    text_process_approve.value = resJobProcess.value.jobs_process.text_process_approve
    status.value = resJobProcess.value.status.id
    edit.value = resJobProcess.value.tools.edit == 0 ? true : false;
    // setting_approve.value = resJobProcess.value.tools.setting_approve
    can_approve.value = resJobProcess.value.tools.can_approve
    is_complete.value = resJobProcess.value.tools.is_complete
    status_approve.value = resJobProcess.value?.status?.id
    //map รูปfile
    // if (resJobProcess.value.jobs_process_image.length > 0) {
    //     jobs_process_image.value = resJobProcess.value?.jobs_process_image.map((e, i) => ({
    //         ...e,
    //         name: e?.image_path,
    //         uid: i + 1,
    //         url: e?.image_path,
    //     }));
    // }
    await loadJobStatusProcessApprove();
    // } catch (error) {
    //     console.error(error);
    // }
}

const resTypeExpense = ref()
const loadTypeExpense = async () => {
    try {
        const res = await dataApi.getTypeExpense();
        resTypeExpense.value = res.data.data
    } catch (error) {
        console.error(error)
    }
}

const checkMoreinput = (item) => {
    try {
        const selectedExpense = resTypeExpense.value.find(expense => expense.code == item.value.type_expense_code);
        if (selectedExpense) {
            item.value.type_expense_text_more_status = selectedExpense.is_input_more;
        }
    } catch (error) {
        console.error(error)
    }
}


const savejob = async (values) => {
    // console.log('values.expense_type_array', values.expense_type_array)
    try {
    let payload = {
        jobs_status_process_id: jobs_status_process_id.value,
        text_process: text_process.value ? text_process.value : ""
    }
    if (text_process_note.value && text_process_note_status.value == true) {
        payload.text_process_note = text_process_note.value
    }
    console.log(payload)
    const res = await dataApi.updateJobProcess(payload, route.params.id);
    errorAlert.value = false;
    alertToast.value = {
        severity: "success",
        summary: "ทำรายการสำเร็จ",
        detail: res.data.message,
    };
    redirectToJobPage()
    // getJobProcess();
    // handleReset();
    } 
    catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }
}
</script>