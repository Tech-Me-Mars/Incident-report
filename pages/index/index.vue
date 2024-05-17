<template>
  <PageHomeHeader />
  <section class="p-3">
    <PageHomeSlide />

    <div class="flex items-center justify-start px-5 w-full py-1 card !bg-blue-600 gap-3 mb-3">
      <TmmFeedbackProgresscircle :size="60" percent="50" />
      <div class="text-white">
        <p class="text-sm">คดีความของท่านวันนี้</p>
        <span class="text-xs text-stone-200">สำเร็จไปแล้ว
          {{
            resDashboardJobs?.jobs_summary[0]?.jobs_process_count_complate
          }}
          จาก {{ resDashboardJobs?.jobs_summary[0]?.jobs_process_count }}</span>
      </div>
    </div>

    <!--########## job mission########## -->
    <div class="flex justify-between items-center mb-1" v-if="resDashboardJobs?.jobs_mission.length > 0">
      <TmmLabelTitle label="เป้าหมายประจำวัน" />
    </div>
    <div class="card p-2 mb-2" v-for="(item, index) in paginatedJobsMission" :key="index">
      <div class="flex w-full items-center gap-1 mb-2">
        <StarTwoTone style="font-size: 22px" />
        <div class="w-full px-2">
          <div class="flex justify-between flex-wrap items-center">
            <NuxtLink :to="`/jobs/mission/${item?.id}`">
              <TmmLabelSubtitle class="line-clamp-1 max-w-[14rem] overflow-hidden" :label="item?.name" />
            </NuxtLink>
          </div>
          <div class="flex justify-between">
            <TmmLabelSmall :label="calculateRemainingTime(item?.datetime_end)" />
          </div>
        </div>
      </div>
      <div>
        <div class="flex justify-between">
          <small>อัตราความสำเร็จ</small>
          <small v-if="item.completion_percentage" class="text-blue-500 font-semibold">{{ item?.completion_percentage
            }}%</small>
        </div>
        <TmmFeedbackProgress :value="item?.completion_percentage || '0'" />
      </div>
      <div></div>
    </div>
    <a-pagination v-if="paginatedJobsMission?.length > pageSizeJobMission" v-model:current="currentPageJobMission"
      :total="resDashboardJobs?.jobs_mission?.length" v-model:page-size="pageSizeJobMission"
      class="border-gray-300 p-1 border rounded-xl bg-white" />
    <!-- ##########end job mission########## -->


    <!-- ##########  [[ JOBS FOLLOW ]] ############ -->
    <div class="flex justify-between items-center mb-1" v-if="resDashboardJobs?.jobs_mission_follow?.length > 0">
      <TmmLabelTitle label="ภารกิจที่ติดตาม" />
    </div>
    <div class="card p-2 mb-2" v-for="(item, index) in paginatedsMissionFollow" :key="index">
      <div class="flex w-full items-center gap-1 mb-2">
        <AlertTwoTone style="font-size: 22px" />
        <div class="w-full px-2">
          <div class="flex justify-between flex-wrap items-center">
            <NuxtLink :to="`/jobs/mission/${item?.id}`">
              <TmmLabelSubtitle class="line-clamp-1 max-w-[14rem] overflow-hidden" :label="item?.name" />
            </NuxtLink>
          </div>
          <div class="flex justify-between">
            <TmmLabelSmall :label="calculateRemainingTime(item?.datetime_end)" />
          </div>
        </div>
      </div>
      <div>
        <div class="flex justify-between">
          <small>อัตราความสำเร็จ</small>
          <small v-if="item.completion_percentage" class="text-blue-500 font-semibold">{{ item?.completion_percentage
            }}%</small>
        </div>
        <TmmFeedbackProgress :value="item?.completion_percentage || '0'" />
      </div>
      <div></div>
    </div>
    <a-pagination v-if="paginatedsMissionFollow?.length > pageSizeMissionFollow"
      v-model:current="currentPageMissionFollow" :total="resDashboardJobs?.jobs_mission_follow?.length"
      v-model:page-size="pageSizeMissionFollow" class="border-gray-300 p-1 border rounded-xl bg-white" />
    <!-- ############ [[END ]] -->
  </section>
  <TmmAlertToast :data="alertToast" :error="errorAlert" :dataError="dataError" />
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
  // or middleware: 'auth'
});
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
import { format } from "date-fns";
import * as zod from "zod";

const isloadingAxi = useState("isloadingAxi");
const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({});
const route = useRoute();

const calendaDashboardUseState = useState("calendaDashboardUseState");
const resDashboardJobs = ref();
const loadDashboardJobs = async () => {
  try {
    const res = await dataApi.getDashboardJobs(
      calendaDashboardUseState.value || format(new Date(), "yyyy-MM-dd")
    );
    resDashboardJobs.value = res.data.data;
    console.log(resDashboardJobs.value);
  } catch (error) {
    console.error(error);
  }
};
watch(calendaDashboardUseState, loadDashboardJobs, { immediate: true });
onMounted(() => {
  loadDashboardJobs();
});

const calculateRemainingTime = (endTime) => {
  console.log(endTime);
  try {
    if (!endTime) {
      return;
      // throw new Error('โปรดระบุวันที่สิ้นสุด');
    }

    let endDate;
    // ตรวจสอบว่า endTime เป็นวันที่อย่างเดียวหรือรวมเวลาด้วย
    if (endTime.includes && endTime.includes(" ")) {
      endDate = new Date(endTime);
    } else {
      endDate = new Date(endTime + " 23:59:59"); // เพิ่มเวลาสุดท้ายของวัน 23:59:59
    }

    const currentTime = new Date();

    // คำนวณเวลาที่เหลือโดยหารออกเป็นวัน, ชั่วโมง, นาที
    const diffMilliseconds = endDate.getTime() - currentTime.getTime();
    const diffSeconds = Math.floor(diffMilliseconds / 1000);

    // ตรวจสอบว่าเวลาหมดติดลบหรือไม่
    if (diffSeconds < 0) {
      return "หมดเวลาแล้ว";
    }

    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    const remainingHours = diffHours % 24;
    const remainingMinutes = diffMinutes % 60;
    const remainingSeconds = diffSeconds % 60;

    return `เหลือเวลา ${diffDays} วัน ${remainingHours} ชั่วโมง ${remainingMinutes} นาที`;
  } catch (error) {
    console.error(error);
    return "";
  }
};

// //////////////// [[ PAGINATION ]]////////////////////////////
// # jobs_mission
const currentPageJobMission = ref(1);
const pageSizeJobMission = ref(3);
const paginatedJobsMission = computed(() => {
  const startIndex =
    (currentPageJobMission.value - 1) * pageSizeJobMission.value;
  const endIndex = startIndex + pageSizeJobMission.value;
  return resDashboardJobs.value?.jobs_mission.slice(startIndex, endIndex);
});

// # jobs follow
const currentPageMissionFollow = ref(1);
const pageSizeMissionFollow = ref(3);
const paginatedsMissionFollow = computed(() => {
  const startIndex =
    (currentPageMissionFollow.value - 1) * pageSizeMissionFollow.value;
  const endIndex = startIndex + pageSizeMissionFollow.value;
  return resDashboardJobs.value?.jobs_mission_follow.slice(
    startIndex,
    endIndex
  );
});

</script>