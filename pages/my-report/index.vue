<template>
    <HeaderMainProfile />
    <section class="p-3">
        <div class="flex gap-5 items-center mb-3">
            <NuxtLink to="/profile">
                <TmmButtonBackPage />
            </NuxtLink>
        </div>
        <div class="bg-gray-900 p-3 text-center fontbold text-white mb-2">MY REPORTS</div>
        <div class="card p-5 mb-2" v-for="(item, index) in resMyReports" :key="index">
            <NuxtLink :to="`/report/edit/${item?.id}`">
                <div class="flex w-full items-center gap-3 mb-2">
                    <!-- <FileTextTwoTone style="font-size: 20px;" /> -->
                    <div class="flex flex-col justify-center items-center">
                        <HeartFilled class="!text-pink-600" />
                        <span v-if="item?.news_like_sum && item?.news_like_sum != 0" class="text-xs">({{
                            item?.news_like_sum}})</span>
                    </div>

                    <div class="flex flex-col">

                        <TmmLabelSubtitle class="" :label="item?.title" />

                        <!-- </NuxtLink> -->
                        <span class="text-sm ">ความเสียหาย :
                            <span>{{ formatCurrency(item?.property_price) }}</span></span>
                        <TmmLabelSmall :label="(item?.time_ago)" />
                    </div>
                </div>
                <!-- <div>
      <div class="flex justify-between">
        <small>อัตราความสำเร็จ</small>
        <small class="text-blue-500 font-semibold">68%</small>
      </div>
      <TmmFeedbackProgress value=25 />
    </div> -->
            </NuxtLink>
        </div>
        <div class="flex justify-center mb-5">
            <a-pagination v-model:current="currentPageMyReports" @change="pagiChangeMyReports"
                :total="totalRowMyReports" class="border-gray-300 p-1 border rounded-xl bg-white"
                v-model:page-size="rowPerPageMyReports" />
        </div>
    </section>

</template>

<script setup>
definePageMeta({
   middleware: 'auth'
});
useHead({ title: 'รายงานของฉัน' });
import { formatDateTime, formatDate, customDateFormat, formatCurrency, formatNumber, roundToTwoDecimalPlaces } from '@/helpers/utility';
//! /////// [Api Variable] /////////
import * as dataApi from './api/data.js'
import { format } from "date-fns";

const isloadingAxi = useState('isloadingAxi')
const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({});
const route = useRoute();

const navigateToChat = (item) => {
    console.log(parseInt(item.no_read_messages_count))
    // ถ้าไม่มีแชทเลย
    if (parseInt(item.no_read_messages_count) < 3) {
        return navigateTo(`/jobs/chat/${item.id}`)
    }
    if (parseInt(item.jobs_process_count) >= 3) {
        return navigateTo(`/jobs/chat/${item.id}?no_read=${item.no_read_messages_count + 2}`)
    }
}

// const currentPageMyWork = ref(1)
// const rowPerPageMyWork = ref(5)
// const totalRowMywork = ref(0)
// const pagiChangeMyJobs = async () => {
//     loadMyJobs();
// }
// const resMyJobs = ref()
// const loadMyJobs = async () => {
//     try {
//         const res = await dataApi.getMyJobs(currentPageMyWork.value, rowPerPageMyWork.value)
//         resMyJobs.value = res.data.data;
//         totalRowMywork.value = res.data.total
//         mqttSub();
//     } catch (error) {
//         console.error(error);
//     }
// }

// import { $mqtt } from "vue-paho-mqtt";
// const mqtt_pre = useRuntimeConfig().public.MQTT_PRE;
// const mqttSub = async () => {
//     try {
//         if (resMyJobs.value?.length > 0) {
//             resMyJobs.value?.forEach((e, i) => {
//                 $mqtt.subscribe(`${mqtt_pre}/jobs/chat/${e.id}/ping_messages`, (message) => {
//                     // const parsedMessage = JSON.parse(message);
//                     // console.log("parsedMessage", parsedMessage);
//                     getNoReadMessageJobMission()
//                 });
//             });
//         }

//     } catch (error) {
//         console.error(error);
//     }
// };

// const getNoReadMessageJobMission = async (jobid) => {
//     try {
//         const res = await dataApi.getCheckNoRead(jobid);
//         if (resMyJobs.value) {
//             const jobMission = resMyJobs.value.find(job => job.id == jobid);
//             if (jobMission) {
//                 jobMission.no_read_messages_count = res.data.data.no_read_messages_count;
//             }
//         }
//     } catch (error) {
//         console.error("Error updating no_read_messages_count:", error);
//     }
// };

const currentPageMyReports = ref(1)
const rowPerPageMyReports = ref(5)
const totalRowMyReports = ref(0)
const pagiChangeMyReports = async () => {
  loadMyReports();
}
const resMyReports = ref()
const loadMyReports = async () => {
  try {
    const res = await dataApi.getMyreport(currentPageMyReports.value, rowPerPageMyReports.value)
    resMyReports.value = res.data.data;
    totalRowMyReports.value = res.data?.total
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
    // loadMyJobs();
      loadMyReports();
})
const calculateRemainingTime = (endTime) => {
    console.log(endTime)
    try {
        if (!endTime) {
            return;
            // throw new Error('โปรดระบุวันที่สิ้นสุด');
        }

        let endDate;
        // ตรวจสอบว่า endTime เป็นวันที่อย่างเดียวหรือรวมเวลาด้วย
        if (endTime.includes && endTime.includes(' ')) {
            endDate = new Date(endTime);
        } else {
            endDate = new Date(endTime + ' 23:59:59'); // เพิ่มเวลาสุดท้ายของวัน 23:59:59
        }

        const currentTime = new Date();

        // คำนวณเวลาที่เหลือโดยหารออกเป็นวัน, ชั่วโมง, นาที
        const diffMilliseconds = endDate.getTime() - currentTime.getTime();
        const diffSeconds = Math.floor(diffMilliseconds / 1000);

        // ตรวจสอบว่าเวลาหมดติดลบหรือไม่
        if (diffSeconds < 0) {
            return 'หมดเวลาแล้ว';
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
        return '';
    }
};
// import { color } from 'chart.js/helpers';
// import dropdown from '~/wind/dropdown';

const show = ref(false);
const resObjForEdit = ref();
const toggleDotEvent = async (obj) => {

    resObjForEdit.value = await obj;
    console.log(resObjForEdit.value)
    show.value = true;
}
const actions = [
    { name: 'แก้ไข', id: 1 },

];
const onSelect = (item) => {
    try {
        show.value = false;
        if (item.id == 1) {
            console.log()
            navigateTo(`/jobs/edit/${resObjForEdit.value?.id}`)
        }
    } catch (error) {
        console.error(error)
    }

};


</script>
<style>
.ant-segmented-item {

    border: 10px !important;
    color: rgb(123, 124, 126);
    /* background-color: rgb(224, 223, 223) !important; */
}

.ant-segmented-item-selected {
    border-radius: 9999px !important;
    color: rgb(83, 128, 224) !important;
    background-color: rgba(255, 255, 255, 0.849) !important
}
</style>