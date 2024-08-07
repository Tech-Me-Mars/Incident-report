<template>
  <HeaderMainProfile />
  <section class="p-3">
    <!-- <PageHomeSlide /> -->
    <div class="w-full mySwiper mb-3 flex gap-1">
        <div
            class="flex flex-col justify-center items-center border-2 border-gray-200 w-[3rem] h-[4rem] rounded-2xl font-semibold shadow-sm ">
            <Calendar showButtonBar :showTodayButton="true" :showClearButton="false" v-model="month"
                class="!bg-transparent !border-0 !border-none" view="month" showIcon iconDisplay="input" />
            <h6 class="text-sm font-light text-gray-400">{{ monthName }}</h6>
        </div>
        <swiper v-if="initialSlide != undefined" :slidesPerView="slidesPerView" :spaceBetween="5"
            :initialSlide="initialSlide" :freeMode="true" :pagination="{
                clickable: true,
            }" class="mySwiper">

            <swiper-slide v-for="(item, index) in daysOfMonth" :key="index" class="">
                <div class="flex flex-col justify-center items-center border-2 border-gray-200 w-[3rem] h-[4rem] rounded-2xl font-semibold shadow-sm "
                    :class="{ '!border-blue-500 !text-blue-500': item.active }" @click="toggleActive(item)">
                    <p class="text-md">{{ item.date }}</p>
                    <h6 class="text-xs font-light text-gray-400" :class="{ '!text-blue-500': item.active }">{{
                        item.datename }}</h6>
                </div>
            </swiper-slide>
        </swiper>
    </div>

    <div class="flex items-center justify-start px-5 w-full py-1 card !bg-blue-600 gap-3 mb-3">
      <TmmFeedbackProgresscircle :size="60"
        :percent="resDashboardJobs?.jobs_summary[0]?.jobs_process_count_complate || 0" />
      <div class="text-white">
        <p class="text-sm">คดีความของท่านวันนี้</p>
        <span class="text-xs text-stone-200">สำเร็จไปแล้ว
          {{
            resDashboardJobs?.jobs_summary[0]?.jobs_process_count_complate
          }}
          จาก {{ resDashboardJobs?.jobs_summary[0]?.jobs_process_count }}</span>
      </div>
    </div>

    <div>
      <TmmInputDropDown @change="fillterChange()" v-model="selectFillter" placeholder="ตัวกรอง" className=""
        :options="resFillter" class="w-full" value="value" label="name" :search="false" />
    </div>
    <!--########## job mission########## -->
    <div class="flex justify-between items-center mb-1" >
      <TmmLabelTitle label="เป้าหมายประจำวัน" />
    </div>


    <div class="flex justify-start mb-3 mt-3" v-if="resDashboardJobs?.jobs_mission?.length == 0 || !resDashboardJobs?.jobs_mission">
      <a-empty>
        <template #description>
          <span>
            เป้าหมายประจำวัน ไม่มีข้อมูล
          </span>
        </template>
      </a-empty>
    </div>

    <!-- <div v-else class="text-center my-5">
      <span>เป้าหมายประจำวัน</span> <span class="text-red-500">!ไม่มีข้อมูล กรุณาเลือกวันอื่น ๆ ที่มีข้อมูลงาน</span>
    </div> -->
    <div class="card p-2 mb-2" v-for="(item, index) in paginatedJobsMission" :key="index">
      <div class="flex w-full items-start gap-1 mb-2">
        <!-- <StarTwoTone style="font-size: 22px" /> -->
        <!-- <img src="/image/urgency/urgency.png" style="width:42px" /> -->
        <a-popover v-if="item?.jobs_level_of_urgency?.name" placement="rightTop"
          :title="item?.jobs_level_of_urgency?.name">
          <i :class="item?.jobs_level_of_urgency?.icon_class"
            :style="{ fontSize: '20px', color: item?.jobs_level_of_urgency?.color, backgroundColor: item?.jobs_level_of_urgency?.bg_color }"></i>
        </a-popover>
        <a-popover v-if="item?.jobs_level_priority?.name" placement="rightTop" :title="item?.jobs_level_priority?.name">
          <i :class="item?.jobs_level_priority?.icon_class"
            :style="{ fontSize: '20px', color: item?.jobs_level_priority?.color, backgroundColor: item?.jobs_level_priority?.bg_color }"></i>
        </a-popover>
        <div class="w-full">
          <div class="flex justify-between flex-wrap items-center">
            <NuxtLink :to="`/jobs/mission/${item?.id}`">
              <TmmLabelSubtitle class=" max-w-[14rem] overflow-hidden" :label="item?.name" />
            </NuxtLink>

          </div>
          <!-- <div class="flex justify-between">
            <TmmLabelSmall :label="calculateRemainingTime(item?.datetime_end)" />
          </div> -->
        </div>
        <div>
          <!-- <van-icon @click="navigateToChat(item)" name="chat-o" :badge="item.no_read_messages_count!=0?item.no_read_messages_count:null" size="20" /> -->
          <a-badge @click="navigateToChat(item)"
            :count="item.no_read_messages_count != 0 ? item.no_read_messages_count : null">
            <WechatOutlined style="font-size:25px;color: #0D8BD8 " />
          </a-badge>
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
    <div class="flex justify-between items-center mb-1" >
      <TmmLabelTitle label="ภารกิจที่ติดตาม" />
    </div>
    <!-- <div v-else class="text-center my-5">
      <span>ภารกิจที่ติดตาม</span> <span class="text-red-500">!ไม่มีข้อมูล กรุณาเลือกวันอื่น ๆ ที่มีข้อมูลภารกิจที่ติดตาม</span>
    </div> -->
    <div class="flex justify-start" v-if="resDashboardJobs?.jobs_mission_follow?.length == 0 || !resDashboardJobs?.jobs_mission_follow">
      <a-empty>
        <template #description>
          <span>
            ภารกิจที่ติดตาม ไม่มีข้อมูล
          </span>
        </template>
      </a-empty>
    </div>

    <div class="card p-2 mb-2" v-for="(item, index) in paginatedsMissionFollow" :key="index">
      <div class="flex w-full items-start gap-1 mb-2">
        <!-- <StarTwoTone style="font-size: 22px" /> -->
        <!-- <img src="/image/urgency/urgency.png" style="width:42px" /> -->
        <a-popover v-if="item?.jobs_level_of_urgency?.name" placement="rightTop"
          :title="item?.jobs_level_of_urgency?.name">
          <i :class="item?.jobs_level_of_urgency?.icon_class"
            :style="{ fontSize: '20px', color: item?.jobs_level_of_urgency?.color, backgroundColor: item?.jobs_level_of_urgency?.bg_color }"></i>
        </a-popover>
        <a-popover v-if="item?.jobs_level_priority?.name" placement="rightTop" :title="item?.jobs_level_priority?.name">
          <i :class="item?.jobs_level_priority?.icon_class"
            :style="{ fontSize: '20px', color: item?.jobs_level_priority?.color, backgroundColor: item?.jobs_level_priority?.bg_color }"></i>
        </a-popover>
        <div class="w-full">
          <div class="flex justify-between flex-wrap items-center">
            <NuxtLink :to="`/jobs/mission/${item?.id}`">
              <TmmLabelSubtitle class=" max-w-[14rem] overflow-hidden" :label="item?.name" />
            </NuxtLink>

          </div>
          <!-- <div class="flex justify-between">
            <TmmLabelSmall :label="calculateRemainingTime(item?.datetime_end)" />
          </div> -->
        </div>
        <div>
          <!-- <van-icon @click="navigateToChat(item)" name="chat-o" :badge="item.no_read_messages_count!=0?item.no_read_messages_count:null" size="20" /> -->
          <a-badge @click="navigateToChat(item)"
            :count="item.no_read_messages_count != 0 ? item.no_read_messages_count : null">
            <WechatOutlined style="font-size:25px;color: #0D8BD8 " />
          </a-badge>
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
useHead({ title: 'Home' });
import {
  formatDateTime,
  formatDate,
  customDateFormat,
  formatCurrency,
  formatNumber,
  roundToTwoDecimalPlaces,
} from "@/helpers/utility";
//! /////// [Api Variable] /////////
import * as dataApi from "./api/dataApiMqtt.js";
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

// ###################### SLIDE ######################

const daysOfMonth = ref([]);

const month = ref(new Date())
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// สร้าง computed property เพื่อดึงชื่อเดือนจากตัวแปร month
const monthName = computed(() => {
    if (!month.value) {
        month.value = new Date()
    }
    const monthIndex = month.value.getMonth();
    //   populateDaysOfMonth()
 
    return months[monthIndex];
});
const calendaDashboardUseState = useState("calendaDashboardUseState", () => "");
const initialSlide = ref();
const populateDaysOfMonth = () => {
    daysOfMonth.value = [];
    const currentDate = new Date(month.value);
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
        const dayIndex = date.getDay();
        const dayName = getDayName(dayIndex);
        const isActive = isSameDay(date, new Date()); // เช็คว่าเป็นวันปัจจุบันหรือไม่

        daysOfMonth.value.push({ date: i, datename: dayName, active: isActive });
        if (isActive) {
            calendaDashboardUseState.value = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            initialSlide.value = i - 1; // ลบออกเพราะ swiper เริ่มนับที่ 0
        }
    }
};
const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear();
};
watch(month, (newValue, oldValue) => {
    populateDaysOfMonth()
});

const getDayName = (dayIndex) => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return days[dayIndex];
};
// สร้างตัวแปร calendaDashboardUseState โดยกำหนดค่าเริ่มต้นเป็น null
const toggleActive = (item) => {
    daysOfMonth.value.forEach((e) => {
        e.active = false;
    });

    item.active = !item.active;
    // ตรวจสอบว่า item ที่ถูกคลิก active หรือไม่
    if (item.active) {
        // กำหนดค่า calendaDashboardUseState ให้เป็นวันที่ที่ถูกคลิก active ในรูปแบบ 'YYYY-mm-dd'
        calendaDashboardUseState.value = `${month.value.getFullYear()}-${String(month.value.getMonth() + 1).padStart(2, '0')}-${String(item.date).padStart(2, '0')}`;
    } else {
        calendaDashboardUseState.value = null; // ถ้าไม่ active กำหนดให้ calendaDashboardUseState เป็น null
    }
    console.log(calendaDashboardUseState.value)
};

onMounted(async () => {
    await populateDaysOfMonth()

});
const slidPerPage = ref(6);
const slidesPerView = computed(() => {
    let slidesToShow = slidPerPage.value;

    switch (true) {
        case window.innerWidth >= 1280:
            slidesToShow = 15;
            break;
        case window.innerWidth >= 1024:
            slidesToShow = 13;
            break;
        case window.innerWidth >= 768:
            slidesToShow = 12;
            break;
        case window.innerWidth >= 520:
            slidesToShow = 7;
            break;
        default:
            slidesToShow = slidPerPage.value;
            break;
    }

    return slidesToShow;
});
// ############################ [[ END SLIDE ]] ###################

const navigateToChat = (item) => {
  console.log(parseInt(item.no_read_messages_count))
  // ถ้าไม่มีแชทเลย
  if (parseInt(item.no_read_messages_count) < 3) {
    return navigateTo(`/jobs/chat/${item.id}`)
  }
  if (parseInt(item.jobs_process_count) >= 3) {
    const no_read_count = parseInt(item.no_read_messages_count+2)
    return navigateTo(`/jobs/chat/${item.id}?no_read=${no_read_count}`)
  }
}



const selectFillter = useState("selectFillter", () => undefined);
const resFillter = ref();
const loadFillter = async () => {
  try {
    const res = await dataApi.getFillter();
    resFillter.value = res.data.data;
    // selectFillter.value=res.data.data[0].value
  } catch (error) {
    console.error(error);
  }
}
const fillterChange = async () => {
  loadDashboardJobs();
}

const resDashboardJobs = ref();
const loadDashboardJobs = async () => {
  try {
    const res = await dataApi.getDashboardJobs(calendaDashboardUseState.value || format(new Date(), "yyyy-MM-dd"), selectFillter.value);
    resDashboardJobs.value = res.data.data;
    console.log('resDashboardJobs', resDashboardJobs.value);
  } catch (error) {
    console.error(error);
  }
};



const calculateRemainingTime = (endTime) => {
  // return ;
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

const mqtt_pre = useRuntimeConfig().public.MQTT_PRE;
import { $mqtt } from "vue-paho-mqtt";
const mqttSub = async () => {
  try {
    console.log(resDashboardJobs.value?.jobs_mission?.length)
    console.log(resDashboardJobs.value?.jobs_mission_follow?.length)
    if (resDashboardJobs.value?.jobs_mission?.length > 0) {
      resDashboardJobs.value?.jobs_mission.forEach((e, i) => {
        $mqtt.subscribe(`${mqtt_pre}/jobs/chat/${e.id}/ping_messages`, (message) => {
          // const parsedMessage = JSON.parse(message);
          // console.log("parsedMessage", parsedMessage);
          getNoReadMessageJobMission(e.id)
        });
      });
    }

    if (resDashboardJobs.value?.jobs_mission_follow?.length > 0) {
      resDashboardJobs.value?.jobs_mission_follow.forEach((e, i) => {
        $mqtt.subscribe(`${mqtt_pre}/jobs/chat/${e.id}/ping_messages`, (message) => {
          // const parsedMessage = JSON.parse(message);
          // console.log("parsedMessage", parsedMessage);
          getNoReadMessageJobMissionFollow(e.id);
        });
      });
    }
  } catch (error) {
    console.error(error);
  }
};
const getNoReadMessageJobMission = async (jobid) => {
  try {
    const res = await dataApi.getCheckNoRead(jobid);
    if (resDashboardJobs.value?.jobs_mission) {
      const jobMission = resDashboardJobs.value?.jobs_mission?.find(job => job.id == jobid);
      if (jobMission) {
        jobMission.no_read_messages_count = res.data.data.no_read_messages_count;
      }
    }
  } catch (error) {
    console.error("Error updating no_read_messages_count:", error);
  }
}

const getNoReadMessageJobMissionFollow = async (jobid) => {
  try {
    const res = await dataApi.getCheckNoRead(jobid);
    if (resDashboardJobs.value?.jobs_mission_follow) {
      const jobMission = resDashboardJobs.value?.jobs_mission_follow?.find(job => job.id === jobid);
      if (jobMission) {
        jobMission.no_read_messages_count = res.data.data.no_read_messages_count;
      }
    }
  } catch (error) {
    console.error("Error updating no_read_messages_count:", error);
  }
}

watch(calendaDashboardUseState, async () => {
  if (calendaDashboardUseState.value){
    await loadDashboardJobs();
    await mqttSub();
  }

}, { immediate: true });
</script>
<style>
.swiper {
    width: 85%;
    height: 100%;
}
</style>