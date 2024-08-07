<template>
    <HeaderMainProfile />
    <div>
        <section class="p-3">
            <HeaderMenu class="flex justify-between">
                <TmmButtonBackPage @click="redirectToJobPage()" />
                <!-- <TmmButtonExportHeader @click="showDrawer" /> -->
            </HeaderMenu>
            <!-- <PageMissionProjectname /> -->
            <!-- <PageMissionWorkorder /> -->
            <TmmCard class="!bg-blue-600 mb-2 card !rounded-b-none pb-0 px-0">
                <template #header>
                    <div class="py-1 px-2">
                        <!-- <div class="flex justify-between flex-wrap gap-3 items-center">
                            <TmmLabelSubtitle class="text-white" :label="resJobProcessDetail?.jobs?.name || ''" />
                            <div class="flex gap-1">
                                    <a-popover placement="leftTop" :title="resJobProcessDetail?.jobs?.jobs_level_of_urgency?.name">
                                <i :class="`${resJobProcessDetail?.jobs?.jobs_level_of_urgency?.icon_class}`"
                                    :style="{ color: resJobProcessDetail?.jobs?.jobs_level_of_urgency.color }"></i>
                                </a-popover>
                                <a-popover placement="leftTop" :title="resJobProcessDetail?.jobs?.jobs_level_priority?.name">
                                <i :class="`${resJobProcessDetail?.jobs?.jobs_level_priority?.icon_class}`"
                                    :style="{ color: resJobProcessDetail?.jobs?.jobs_level_priority.color }"></i>
                                </a-popover>
                            </div>
                        </div> -->
                        <div class="grid grid-cols-10">
                            <div class="col-span-9">
                                <TmmLabelSubtitle class="text-white" :label="resJobProcessDetail?.jobs?.name || ''" />
                            </div>
                            <div class="col-span-1 flex justify-end">
                                <a-popover placement="leftTop"
                                    :title="resJobProcessDetail?.jobs?.jobs_level_of_urgency?.name">
                                    <i :class="`${resJobProcessDetail?.jobs?.jobs_level_of_urgency?.icon_class}`"
                                        :style="{ color: resJobProcessDetail?.jobs?.jobs_level_of_urgency.color }"></i>
                                </a-popover>
                                <a-popover placement="leftTop" :title="resJobProcessDetail?.jobs?.jobs_level_priority?.name">
                                    <i :class="`${resJobProcessDetail?.jobs?.jobs_level_priority?.icon_class}`"
                                        :style="{ color: resJobProcessDetail?.jobs?.jobs_level_priority.color }"></i>
                                </a-popover>
                            </div>
                        </div>
                    </div>
                </template>
                <template #body>
                    <div class="px-2">
                        <div class="flex justify-between text-blue-100 mb-2 ">
                            <p class="font-medium text-xs">ผู้วางแผนงาน</p>
                            <span class="ml-auto font-light text-xs">{{
                                resJobProcessDetail?.jobs?.plan_job_employee_fullname
                                }}</span>
                        </div>
                        <div class="flex justify-between text-blue-100">
                            <p class="font-medium text-xs">ผู้อนุมัติแผนงาน</p>
                            <span class="ml-auto font-light text-xs">{{
                                resJobProcessDetail?.jobs?.approve_plan_employee_fullname
                                }}</span>
                        </div>
                    </div>
                </template>
                <template #footer>
                    <div v-if="resJobProcessDetail?.jobs?.jobs_level_secret.bg_color"
                        class="p-0 py-2 flex items-center justify-center"
                        :style="{ backgroundColor: resJobProcessDetail?.jobs?.jobs_level_secret.bg_color }">
                        <div class="text-white">
                            {{ resJobProcessDetail?.jobs?.jobs_level_secret?.name }}
                        </div>
                    </div>
                </template>
            </TmmCard>

            <TmmCard :key="index" class="mb-2 card">
                <template #header>
                    <div class="flex justify-between">
                        <div>
                            <!-- {{resJobProcessDetail?.status}} -->
                            <TmmTag class="!px-4 !py-1"
                                :style="{ color: resJobProcessDetail?.status?.color, backgroundColor: resJobProcessDetail?.status?.bg_color }">
                                {{ resJobProcessDetail?.status?.name }}
                            </TmmTag>
                        </div>
                        <div>
                            <TmmTag color="#f0c424" class="!px-4 !py-1">ลำดับงานที่ {{
                                resJobProcessDetail?.jobs_process?.sort_no }}</TmmTag>
                        </div>
                    </div>
                </template>
                <template #body>
                    <div class="py-2">
                        <!-- <div class="flex justify-between">
                <p class="font-medium text-xs">ผู้รับผิดชอบ</p>
                <span class="ml-auto font-light text-xs">{{ item?.responsible_employee_fullname }}</span>
              </div> -->
                        <div class="flex flex-warp">
                            <p class="font-medium text-md">ผู้รับผิดชอบ: <span class="ml-auto font-light text-sm">
                                    {{ resJobProcessDetail?.jobs_process?.responsible_employee_fullname }}
                                </span></p>
                        </div>
                        <div class="flex flex-warp">
                            <p class="font-medium text-md">ระยะเวลาดำเนินงาน: <span
                                    class="ml-auto font-light text-sm">{{ resJobProcessDetail?.jobs_process?.date_start
                                    }} ถึง {{ resJobProcessDetail?.jobs_process?.date_end }}</span></p>
                        </div>
                        <div class="w-full">
                            <span class="font-medium text-md">รายละเอียดงาน:
                                <span class="ml-auto font-light text-sm break-words">
                                    {{ resJobProcessDetail?.jobs_process?.text_jobs_process_detail }}
                                </span>
                            </span>
                        </div>
                    </div>
                    <hr class="my-1">
                    <div class="flex flex-warp mb-4">
                        <p class="font-medium text-md">ผลการดำเนินการ: <span class="ml-auto font-light text-sm">{{
                            resJobProcessDetail?.jobs_process?.text_process }}</span></p>
                    </div>
                    <div class="mb-4">
                        <p class="font-medium text-md">เอกสารแนบ:</p>
                        <div>
                            <ul class="text-blue-400">
                                <li class="line-clamp-1" v-for="(item, index) in resJobProcessDetail?.attachment_file"
                                    :key="index">
                                    <a href="javascript:void(0);" @click="handleFileClick(item)">
                                        {{ getFileName(item.attachment_file) }}
                                    </a>
                                </li>
                            </ul>

                            <!-- Image Modal -->
                            <a-modal v-model:open="imageVisible" width="100%" height="100%" wrap-class-name="full-modal"
                                :footer="null" @cancel="handleCancel">
                                <a-image style="width: 100%" class="pt-5" :src="currentFile" />
                            </a-modal>

                            <!-- PDF Modal -->
                            <a-modal v-model:open="pdfVisible" width="100%" wrap-class-name="full-modal" :footer="null"
                                @cancel="handleCancel" style="max-width: 100%;
    top: 0;
    padding-bottom: 0;  
    margin: 0;
    flex: 1;">
                                <div class="" style="    display: flex;
    flex-direction: column;
    height: calc(100vh);
    flex: 1;">
                                    <iframe :src="currentFile" class="w-full pt-5 h-[100%]"></iframe>
                                </div>
                                <!-- <div ref="pdfSection">
                                    <VuePdfEmbed annotation-layer text-layer
                                        :source="currentFile" />
                                </div> -->
                                <!-- <span class="underline cursor-pointer" @click="exportToPDF(`รายการ export${format(
                                    new Date(),
                                    'yyyyMMddHHmmss'
                                )}`, pdfSection)">
                                    กดที่นี่เพื่อดาวโหลดเอกสาร
                                </span> -->
                            </a-modal>
                        </div>
                    </div>

                    <!-- <div class="">
                        <p class="font-medium text-xs">เอกสารแนบ:</p>
                    </div> -->
                    <div class="">
                        <p class="font-medium text-md mb-2">สรุปค่าใช้จ่าย:</p>
                        <!-- <div class="flex justify-between font-light text-sm mb-1"
                            v-for="(item, index) in resJobProcessDetail?.attachment_file_expense" :key="index">
                            <div class="flex flex-wrap gap-1">
                                <a-image v-if="item?.image_status" :width="20" :height="20"
                                    :src="item?.attachment_file" />
                                <i @click="handleFileClick(item)" v-else
                                    :style="{ fontSize: '20px', backgroundColor: item.icon_bg_color, backgroundColor: item.icon_color }"
                                    :class="item?.icon_class"></i>
                                <p>{{ item?.type_expense_code }}</p>
                            </div>
                            <p>{{ item?.price }} บาท</p>
                        </div> -->
                        <a-table :columns="columns" :scroll="{ x: 100 }" bordered :pagination="false"
                            :dataSource="resJobProcessDetail?.attachment_file_expense" :summary="summary">
                            <template #summary>
                                <a-table-summary-row>
                                    <a-table-summary-cell colSpan="3">รวมค่าใช้จ่าย</a-table-summary-cell>
                                    <a-table-summary-cell>{{ (formatNumberDecimal(totalExpense)) }}</a-table-summary-cell>
                                </a-table-summary-row>
                            </template>
                            <template #bodyCell="{ column, text, record, index }">
                                <template v-if="column.dataIndex === 'index'">
                                    {{ index + 1 }}
                                </template>
                                <template v-if="column.dataIndex === 'price'">
                                    {{ formatNumberDecimal(record.price) }}
                                </template>
                                <template v-if="column.dataIndex === 'attachment_file'">
                                    <a-image v-if="record?.image_status" :width="20" :height="20"
                                        :src="record?.attachment_file" />
                                    <i @click="handleFileClick(record)" v-else
                                        :style="{ fontSize: '20px', backgroundColor: record.icon_bg_color, color: record.icon_color }"
                                        :class="record?.icon_class"></i>
                                </template>
                            </template>
                        </a-table>
                    </div>

                    <!-- <div class="flex gap-5 justify-center  mx-auto">

                        <TmmButton type="primary" @click="redirectToJobPage()" severity="secondary" class="!w-full"
                            className="!w-full" label="ยกเลิก" />
                        <TmmButton type="primary" severity="success" className="w-full" htmlType="submit"
                            label="บันทึก" />
                    </div> -->
                </template>
                <template #footer>
                </template>
            </TmmCard>


            <a-drawer title="Export File" placement="bottom" :closable="false" :open="open" @close="onClose">
                <!-- <NuxtLink :to="`/jobs/mission/process/export/pdf/${route.params.id}`"> -->
                <div class="flex gap-3 items-center bg-white border-blue-500 border-2 rounded-xl p-1 mb-2">
                    <TmmIcon icon="mdi mdi-file-pdf-box text-blue-600" style="font-size:30px" />
                    <span class="text-xl font-nomal">Export PDF</span>
                </div>
                <!-- </NuxtLink> -->

                <div class="flex gap-3 items-center bg-zinc-100 rounded-xl p-1 mb-2">
                    <TmmIcon icon="mdi mdi-file-pdf-box text-4xl text-pink-600" style="font-size:30px" />
                    <span class="text-xl font-nomal">Export PPT</span>
                </div>

                <div class="flex gap-3 items-center bg-zinc-100 rounded-xl p-1 mb-2">
                    <TmmIcon icon="mdi mdi-file-jpg-box text-4xl text-lime-600" style="font-size:30px" />
                    <span class="text-xl font-nomal">Export JPG</span>
                </div>

                <div class="flex gap-3 items-center bg-zinc-100 rounded-xl p-1 mb-2">
                    <TmmIcon icon="mdi mdi mdi-drawing-box text-4xl text-orange-600" style="font-size:30px" />
                    <span class="text-xl font-nomal">Export DRAWio</span>
                </div>
            </a-drawer>

            <div class="flex gap-5 justify-center  mx-auto">

                <!-- <TmmButton type="primary" @click="redirectToJobPage()" severity="secondary" class="!w-full"
    className="!w-full" label="ยกเลิก" /> -->
                <TmmButton type="primary" @click="showModalEdit = true" severity="warning" className="w-full"
                    htmlType="button" label="ตีกลับ-แก้ไข" />
                <TmmButton type="primary" @click="approveOrEdit('902')" severity="success" className="w-full"
                    htmlType="button" label="อนุมัติ" />
            </div>
            <a-modal v-model:open="showModalEdit" centered>
                <template #footer>
                    <a-button @click="cancelApprove">ยกเลิก</a-button>
                    <a-button type="primary" :loading="loading" :disabled="!text_process_note"
                        @click="approveOrEdit('901')">ตกลง</a-button>
                </template>
                <div class="p-5 mt-5">
                    <h1>เหตุผลที่ไม่ผ่านการดำเนินงาน</h1>
                    <!-- <TmmInput v-model="text_process_note" placeholder="ข้อความปรับปรุงการดำเนินงาน" /> -->
                    <TmmInputTextarea :rows="2" v-model="text_process_note" placeholder="ข้อความปรับปรุงการดำเนินงาน" />
                </div>
                <!-- <img :src="currentFile" class="w-full h-full" alt="Image Preview" /> -->
            </a-modal>

        </section>
    </div>

    <TmmAlertToast :data="alertToast" :error="errorAlert" :dataError="dataError" />
</template>

<script setup>
definePageMeta({
   middleware: 'auth'
});
useHead({ title: 'อนุมัติ' });
import VuePdfEmbed from 'vue-pdf-embed'
import 'vue-pdf-embed/dist/style/index.css'
import 'vue-pdf-embed/dist/style/annotationLayer.css'
import 'vue-pdf-embed/dist/style/textLayer.css'
const pdfSection = ref(null)

import { formatDateTime, formatDate, customDateFormat, formatCurrency, formatNumber,formatNumberDecimal, roundToTwoDecimalPlaces } from '@/helpers/utility';
//! /////// [Api Variable] /////////
import * as dataApi from './api/dataApi.js'
//! /////// [validation import] /////////
import { useField, useForm, Form, useFieldArray } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { format } from "date-fns";
import * as zod from "zod";

const router = useRouter()
const isloadingAxi = useState('isloadingAxi')
const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({});


const currentFile = ref('');
const imageVisible = ref(false);
const pdfVisible = ref(false);

const getFileName = (fileUrl) => {
    return fileUrl.split('/').pop();
};

const handleFileClick = (file) => {
    const fileExtension = file.attachment_file.split('.').pop().toLowerCase();
    if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg') {
        currentFile.value = file.attachment_file;
        imageVisible.value = true;
    } else if (fileExtension === 'pdf') {
        console.log('pdf')
        currentFile.value = file.attachment_file;
        pdfVisible.value = true;
    } else {
        window.location.href = file.attachment_file;
    }
};

const handleCancel = () => {
    imageVisible.value = false;
    pdfVisible.value = false;
};


const route = useRoute();
const resJobProcess = ref()
const loadJobProcess = async () => {
    try {
        const res = await dataApi.getJobProcess(route?.query?.jobid)
        resJobProcess.value = res.data.data;
        console.log(res.data)
    } catch (error) {
        console.error(error);
    }
}
const resJobProcessDetail = ref()
const loadJobProcessDetail = async () => {
    try {
        const res = await dataApi.getJobProcessDetail(route.params.id)
        resJobProcessDetail.value = res.data.data;
        if (resJobProcessDetail.value?.tools?.can_approve != true) {
            redirectToJobPage();
        }
        console.log(res.data)
    } catch (error) {
        console.error(error);
    }
}
const columns = [
    {
        title: 'ลำดับ',
        dataIndex: 'index',
        key: 'index',
    },
    {
        title: 'ไฟล์',
        dataIndex: 'attachment_file',
        key: 'attachment_file',
        // customRender: (text) => {
        //   return <a href={text} target="_blank">ดูไฟล์</a>;
        // }
    },
    {
        title: 'รายการ',
        dataIndex: 'type_expense_code',
        key: 'type_expense_code',
    },
    {
        title: 'ยอดเงิน (บาท)',
        dataIndex: 'price',
        key: 'price',
    },
];

const totalExpense = computed(() => {
    return resJobProcessDetail.value?.attachment_file_expense?.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
});

onMounted(() => {
    loadJobProcess()
    loadJobProcessDetail()
})
const open = ref(false);
const showDrawer = () => {
    console.log('open')
    open.value = true;
};
const onClose = () => {
    open.value = false;
};

const redirectToJobPage = () => {
    const jobid = route?.query?.jobid;
    if (jobid && jobid != "undefined") {
        router.push(`/jobs/mission/${jobid}`);
    } else {
        router.push("/");
    }
};

const showModalEdit = ref(false)
const cancelApprove = () => {
    showModalEdit.value = false
    text_process_note.value = undefined
}
const text_process_note = ref()
const approveOrEdit = async (code_id) => {
    try {
        console.log(code_id)
        showModalEdit.value = false
        const payload = {
            jobs_status_process_id: code_id, // ตีกลับ-แก้ไข = 901 | อนุมัติ = 902
            text_process_note: text_process_note.value ? text_process_note.value : "" //  หากแก้ไข ถึง Modal ให้ note เป็น textarea
        }
        const res = await dataApi.updateDataApprove(payload, route.params.id);
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };
        text_process_note.value = undefined
        redirectToJobPage();
    } catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }
}
</script>

<style>
/* .full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    flex: 1;
  }
} */
</style>