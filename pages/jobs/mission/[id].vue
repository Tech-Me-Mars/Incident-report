<template>
  <HeaderMainProfile />
  <div>
    <section class="p-3" v-if="resJobProcess">
      <HeaderMenu class="flex justify-between">
        <TmmButtonBackPage @click="router.push('/')" />
        <!-- <TmmButtonExportHeader @click="showDrawer" /> -->
      </HeaderMenu>
      <!-- <PageMissionProjectname /> -->
      <!-- <PageMissionWorkorder /> -->
      <!-- <TmmCard class="!bg-blue-600 mb-2 card">
        <template #header>
          <div class="py-1">
            <div class="flex gap-3 items-center">
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
</TmmCard> -->
      <div class="flex flex-wrap justify-center mb-3" v-if="resJobProcess?.remark_guide?.length > 0">
        <TmmTag v-for="(item, index) in resJobProcess?.remark_guide" :key="index" class="!px-4 !py-1"
          :style="{ color: item?.color, backgroundColor: item?.bg_color }">
          {{ item?.name }}
        </TmmTag>
      </div>

      <!-- {{resJobProcess?.jobs}} -->
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
              <span class="ml-auto font-light text-xs">{{
                resJobProcess?.jobs?.plan_job_employee_fullname
              }}</span>
            </div>
            <div class="flex justify-between text-blue-100">
              <p class="font-medium text-xs">ผู้อนุมัติแผนงาน</p>
              <span class="ml-auto font-light text-xs">{{
                resJobProcess?.jobs?.approve_plan_employee_fullname
              }}</span>
            </div>
            <div>
              <span v-if="resJobProcess?.jobs?.can_edit_main_job == true"
                class="font-medium text-xs text-white underline cursor-pointer">
                <NuxtLink :to="`/jobs/edit_project/${route.params.id}`">
                  แก้ไขโครงสร้าง<i class="mdi mdi-package"></i>
                </NuxtLink>
              </span>
            </div>
            <div>
              <span v-if="resJobProcess?.jobs?.can_add_jobs_process == true"
                class="font-medium text-xs text-white underline cursor-pointer">
                <a @click="assignWorkMore">
                  เพิ่มงาน<i class="mdi mdi-plus"></i>
                </a>
              </span>
            </div>
          </div>
        </template>
        <template #footer>

          <div v-if="resJobProcess?.jobs?.jobs_level_secret?.bg_color" class="p-0 py-2 flex items-center justify-center"
            :style="{ backgroundColor: resJobProcess?.jobs?.jobs_level_secret.bg_color }">
            <div class="text-white">
              {{ resJobProcess?.jobs?.jobs_level_secret?.name }}
            </div>
          </div>
        </template>
      </TmmCard>

      <TmmCard v-for="(item, index) in resJobProcess?.jobs_process" :key="index" class="mb-2 card">
        <template #header>
          <div class="flex justify-between">
            <div>
              <span v-if="item?.tools?.can_delete_job_process == true" class="mdi mdi-dots-vertical cursor-pointer"
                @click="toggleDotEvent(item)"></span>
              <TmmTag class="!px-4 !py-1"
                :style="{ color: item?.status?.color, backgroundColor: item?.status?.bg_color }">
                {{ item.status?.name }}
              </TmmTag>
            </div>
            <div>
              <TmmTag color="#f0c424" class="!px-4 !py-1">ลำดับงานที่ {{
                item?.sort_no }}</TmmTag>
            </div>
          </div>
        </template>
        <template #body>
          <div class="py-3">
            <!-- <div class="flex justify-between">
              <p class="font-medium text-xs">ผู้รับผิดชอบ</p>
              <span class="ml-auto font-light text-xs">{{ item?.responsible_employee_fullname }}</span>
            </div> -->
            <div class="flex flex-warp">
              <span class="font-medium text-xs">
                ผู้รับผิดชอบ:
                <span class="ml-auto font-light text-xs">{{
                  item?.responsible_employee_fullname
                }}</span>
              </span>
            </div>
            <div class="flex flex-warp">
              <span class="font-medium text-xs">
                ระยะเวลาดำเนินงาน:
                <span class="ml-auto font-light text-xs">{{ formattedDateBuddha(item?.date_start) }} ถึง {{ formattedDateBuddha(item?.date_end) }}</span>
              </span>
            </div>
            <!-- <div class="flex justify-between">
              <p class="font-medium text-xs">ระยะเวลาดำเนินงาน</p>
              <span class="ml-auto font-light text-xs">{{ item?.date_start }} ถึง {{ item?.date_end }}</span>
            </div> -->
            <!-- <div>
              <p class="font-medium text-xs">รายละเอียดงาน</p>
              <span class="font-light text-xs">
                {{ item?.text_process }}
              </span>
            </div> -->

            <span class="font-medium text-xs">
              รายละเอียดงาน:
              <span class="ml-auto font-light text-xs break-words">
                {{ item?.text_jobs_process_detail }}
              </span>
            </span>

          </div>
          <hr class="my-1" />
        </template>
        <template #footer>
          <div class="flex flex-warp">
            <span class="font-medium text-xs">
              ผลการดำเนินการ:
              <span class="ml-auto font-light text-xs">{{ item?.text_process }} </span>
            </span>
          </div>
          <!-- <div class="flex flex-warp">
            <p class="font-medium text-xs">
              ค่าใช้จ่ายรวม: <span class="ml-auto font-light text-xs">...</span>
            </p>
          </div> -->
          <NuxtLink :to="`/jobs/mission/detail/${item?.id}`">
            <div class="py-1 flex items-center gap-2 mb-3">
              <span class="mdi mdi-comment-text-outline"></span>
              <TmmLabelSmall :label="`${item?.jobs_process_note?.count_note} ความคิดเห็น`" />
            </div>
            <div class="flex flex-wrap gap-2 justify-center">
              <NuxtLink :to="`/jobs/mission/complete/${item?.id}?jobid=${resJobProcess?.jobs?.id}`">
                <TmmButton label="ดูข้อมูล" className="rounded-lg min-w-[10rem]" type="primary" severity="primary" />
              </NuxtLink>
              <NuxtLink v-if="item.tools.can_edit == true"
                :to="`/jobs/mission/process/${item?.id}?jobid=${resJobProcess?.jobs?.id}`">
                <TmmButton label="อัพเดทงาน" className="rounded-lg min-w-[10rem]" type="primary" severity="orange" />
              </NuxtLink>
              <NuxtLink v-if="item.tools.can_approve == true"
                :to="`/jobs/mission/approve/${item?.id}?jobid=${resJobProcess?.jobs?.id}`">
                <TmmButton label="อนุมัติ" className="rounded-lg min-w-[10rem]" type="primary" severity="orange" />
              </NuxtLink>
            </div>

          </NuxtLink>
          <div class="text-end mt-3" v-if="item?.tools?.can_create_edit == true">
            <NuxtLink :to="`/jobs/mission/edit_assign/${item?.id}?jobid=${resJobProcess?.jobs?.id}`">
              <span class="text-rose-500 underline text-sm"><i class="mdi mdi-wrench"></i>แก้ไข</span>
            </NuxtLink>
          </div>
        </template>
      </TmmCard>

      <a-drawer title="Export File" placement="bottom" :closable="false" :open="open" @close="onClose">
        <!-- <NuxtLink :to="`/jobs/mission/process/export/pdf/${route.params.id}`"> -->
        <div class="flex gap-3 items-center bg-white border-blue-500 border-2 rounded-xl p-1 mb-2">
          <TmmIcon icon="mdi mdi-file-pdf-box text-blue-600" style="font-size: 30px" />
          <span class="text-xl font-nomal">Export PDF</span>
        </div>
        <!-- </NuxtLink> -->

        <div class="flex gap-3 items-center bg-zinc-100 rounded-xl p-1 mb-2">
          <TmmIcon icon="mdi mdi-file-pdf-box text-4xl text-pink-600" style="font-size: 30px" />
          <span class="text-xl font-nomal">Export PPT</span>
        </div>

        <div class="flex gap-3 items-center bg-zinc-100 rounded-xl p-1 mb-2">
          <TmmIcon icon="mdi mdi-file-jpg-box text-4xl text-lime-600" style="font-size: 30px" />
          <span class="text-xl font-nomal">Export JPG</span>
        </div>

        <div class="flex gap-3 items-center bg-zinc-100 rounded-xl p-1 mb-2">
          <TmmIcon icon="mdi mdi mdi-drawing-box text-4xl text-orange-600" style="font-size: 30px" />
          <span class="text-xl font-nomal">Export DRAWio</span>
        </div>
      </a-drawer>

      <van-action-sheet v-model:show="show" :actions="actions" @select="onSelect" />
    </section>

    <a-empty v-else >
      <template #description>
          <span>
            ไม่มีงานหรืองานถูกลบไปแล้ว
          </span>
        </template>
    </a-empty>
  </div>

  <TmmAlertToast :data="alertToast" :error="errorAlert" :dataError="dataError" />
</template>

<script setup>
import {
  formatDateTime,
  formatDate,
  customDateFormat,
  formatCurrency,
  formatNumber,
  roundToTwoDecimalPlaces,
} from "@/helpers/utility";
//! /////// [Api Variable] /////////
import * as dataApi from "./api/data.js";
//! /////// [validation import] /////////
import { useField, useForm, Form, useFieldArray } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { format, parseISO } from 'date-fns';
import { th } from 'date-fns/locale';
import * as zod from "zod";

function formattedDateBuddha(dateString) {
    if (!dateString) {
      return ''
    }
    const date = parseISO(dateString);
    const buddhistYear = date.getFullYear() + 543;
    const formattedDate = format(date, `d MMMM yyyy`, { locale: th });

    // แทนที่ปี ค.ศ. ด้วยปี พ.ศ.
    return formattedDate.replace(date.getFullYear().toString(), buddhistYear.toString());
}

const router = useRouter();
const isloadingAxi = useState("isloadingAxi");
const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({});

const route = useRoute();
const resJobProcess = ref();
// const canEdit =ref(false);
const loadJobProcess = async () => {
  try {
    const res = await dataApi.getJobProcess(route.params.id);
    resJobProcess.value = res.data.data;
    // canEdit.value = res.data.data;
    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  mqttSub()
  loadJobProcess();
});
const open = ref(false);
const showDrawer = () => {
  console.log("open");
  open.value = true;
};
const onClose = () => {
  open.value = false;
};


const show = ref(false);
const resObjForEdit = ref();
const toggleDotEvent = async (obj) => {
  resObjForEdit.value = await obj;
  show.value = true;
}
const actions = [
  { name: 'ลบ', id: 1 },
];
const onSelect = (item) => {
  try {
    show.value = false;
    if (item.id == 1) {
      deleteDotJobProccess()
    }
  } catch (error) {
    console.error(error)
  }

};

// const count_for_assign_work_more = ref(0);
// const assignWorkMore = () => {
//   if (resJobProcess.value?.jobs_process?.length > 0) {
//     count_for_assign_work_more.value = resJobProcess.value?.jobs_process?.length + 1;
//     localStorage.setItem('count_for_assign_work_more', count_for_assign_work_more.value);
//     router.push(`/jobs/mission/create_assign/${route.params.id}`);
//   }else{
//     localStorage.setItem('count_for_assign_work_more', 0);
//     router.push(`/jobs/mission/create_assign/${route.params.id}`);
//   }

// }
const count_for_assign_work_more = useState("count_for_assign_work_more", () => 0);
const assignWorkMore = () => {
  if (resJobProcess.value?.jobs_process?.length > 0) {
    count_for_assign_work_more.value = resJobProcess.value?.jobs_process?.length + 1;
    router.push(`/jobs/mission/create_assign/${route.params.id}`);
  }
}

const deleteDotJobProccess = async () => {
  try {
    const res = await dataApi.deleteJobProcess(resObjForEdit.value.id);
    errorAlert.value = false;
    alertToast.value = {
      severity: "success",
      summary: "ทำรายการสำเร็จ",
      detail: res.data.message,
    };
    loadJobProcess()
  } catch (error) {
    errorAlert.value = true;
    dataError.value = error;
    console.error(error)
  }
}

import { $mqtt } from 'vue-paho-mqtt';
const mqtt_pre = useRuntimeConfig().public.MQTT_PRE;

const mqttSub = async () => {
  $mqtt.subscribe(`${mqtt_pre}/jobs/${route.params.id}`, (message) => {
    // เมื่อมีการรับข้อมูลจาก mqtt
    const parsedMessage = JSON.parse(message);
    console.log("parsedMessage", parsedMessage);
    errorAlert.value = false;
    alertToast.value = {
      severity: "success",
      summary: "ทำรายการสำเร็จ",
      detail: parsedMessage.massage,
    };
    loadJobProcess()
  });
}
</script>
