<template>
  <div>
    <HeaderMenu class="flex justify-between">

        <TmmButtonBackPage @click="router.push('/')" />

      <!-- <TmmButtonExportHeader @click="showDrawer" /> -->
    </HeaderMenu>

    <section class="p-3">
      <!-- <PageMissionProjectname /> -->
      <!-- <PageMissionWorkorder /> -->
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
            <span class="ml-auto font-light text-xs">{{ resJobProcess?.jobs?.plan_job_employee_fullname }}</span>
          </div>
          <div class="flex justify-between text-blue-100">
            <p class="font-medium text-xs">ผู้อนุมัติแผนงาน</p>
            <span class="ml-auto font-light text-xs">{{ resJobProcess?.jobs?.approve_plan_employee_fullname }}</span>
          </div>
        </template>
      </TmmCard>

      <TmmCard v-for="(item, index) in resJobProcess?.jobs_process" :key="index" class="mb-2 card">
        <template #header>
          <h2>
            <TmmTag color="#f0c424" class="rounded-xl px-4 py-1">ลำดับงานที่ {{ index + 1 }}</TmmTag>
          </h2>
        </template>
        <template #body>
          <div class="py-3">
            <div class="flex justify-between">
              <p class="font-medium text-xs">ผู้รับผิดชอบ</p>
              <span class="ml-auto font-light text-xs">{{ item?.responsible_employee_fullname }}</span>
            </div>
            <div class="flex justify-between">
              <p class="font-medium text-xs">ระยะเวลาดำเนินงาน</p>
              <span class="ml-auto font-light text-xs">{{ item?.date_start }} - {{ item?.date_end }}</span>
            </div>
            <div>
              <p class="font-medium text-xs">รายละเอียดงาน</p>
              <span class="font-light text-xs">
                {{ item?.text_process }}
              </span>
            </div>
          </div>
          <hr>
        </template>
        <template #footer>
          <NuxtLink :to="`/jobs/mission/detail/${item?.id}`">
            <div class="py-1 flex items-center gap-2 mb-3">
              <span class="mdi mdi-comment-text-outline"></span>
              <TmmLabelSmall :label="`${item?.jobs_process_note?.count_note} ความคิดเห็น`" />
            </div>
            <!-- {{ item.tools }} -->
            <div class="flex justify-center">
              <NuxtLink v-if="item.tools.edit == 1 && item.tools.is_complete != 1" :to="`/jobs/mission/edit/${item?.id}?jobid=${resJobProcess?.jobs?.id}`">
                <TmmButton label="จัดการ" className="rounded-lg min-w-[10rem]" type="primary" severity="orange" />
              </NuxtLink>
              <NuxtLink v-if="item.tools.edit == 0 && item.tools.is_complete != 1" :to="`/jobs/mission/edit/${item?.id}?jobid=${resJobProcess?.jobs?.id}`">
                <TmmButton label="ดูรายละเอียดงาน" className="rounded-lg min-w-[10rem]" type="primary"
                  severity="orange" />
              </NuxtLink>
              <NuxtLink v-if="item.tools.is_complete == 1" :to="`/jobs/mission/view/${item?.id}?jobid=${resJobProcess?.jobs?.id}`">
                <TmmButton label="ดูข้อมูล" className="rounded-lg min-w-[10rem]" type="primary"
                  severity="orange" />
              </NuxtLink>
            </div>
          </NuxtLink>
        </template>
      </TmmCard>


      <a-drawer title="Export File" placement="bottom" :closable="false" :open="open" @close="onClose">
        <!-- <NuxtLink :to="`/jobs/mission/edit/export/pdf/${route.params.id}`"> -->
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

    </section>
  </div>

  <TmmAlertToast :data="alertToast" :error="errorAlert" :dataError="dataError" />
</template>

<script setup>
import { formatDateTime, formatDate, customDateFormat, formatCurrency, formatNumber, roundToTwoDecimalPlaces } from '@/helpers/utility';
//! /////// [Api Variable] /////////
import * as dataApi from './api/data.js'
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

const rout = useRoute();
const resJobProcess = ref()
// const canEdit =ref(false);
const loadJobProcess = async () => {
  try {
    const res = await dataApi.getJobProcess(rout.params.id)
    resJobProcess.value = res.data.data;
    // canEdit.value = res.data.data;
    console.log(res.data)
  } catch (error) {
    console.error(error);
  }
}
onMounted(() => {
  loadJobProcess()
})
const open = ref(false);
const showDrawer = () => {
  console.log('open')
  open.value = true;
};
const onClose = () => {
  open.value = false;
};
</script>