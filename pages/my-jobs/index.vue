<template>
    <HeaderMainProfile />

    <section class="p-3">
        <div class="flex gap-5 items-center mb-3">
            <NuxtLink to="/profile">
                <TmmButtonBackPage />
            </NuxtLink>
        </div>
        <div class="bg-blue-600 p-3 text-center fontbold text-white mb-2">MY JOBS</div>
        <div v-if="resMyJobs?.length > 0">
            <div class="card p-2 mb-2" v-for="(item, index) in resMyJobs" :key="index">
                <div class="flex w-full items-center gap-1 mb-2">
                    <!-- <img src="/image/urgency/most_urgency.png" style="width:60px" /> -->
                    <a-popover placement="rightTop" :title="item?.jobs_level_of_urgency?.name">
                        <i :class="item?.jobs_level_of_urgency?.icon_class"
                            :style="{ fontSize: '20px', color: item?.jobs_level_of_urgency?.color, backgroundColor: item?.jobs_level_of_urgency?.bg_color }"></i>
                    </a-popover>
                    <a-popover placement="rightTop" :title="item?.jobs_level_priority?.name">
                        <i :class="item?.jobs_level_priority?.icon_class"
                            :style="{ fontSize: '20px', color: item?.jobs_level_priority?.color, backgroundColor: item?.jobs_level_priority?.bg_color }"></i>
                    </a-popover>
                    <div class="w-full flex flex-col justify-center">
                        <div class="flex w-full items-start gap-1">
                            <div class="w-full">
                                <div class="flex justify-between flex-wrap items-center">
                                    <NuxtLink :to="`/jobs/mission/${item?.id}`">
                                        <TmmLabelSubtitle class=" max-w-[14rem] overflow-hidden" :label="item?.name" />
                                    </NuxtLink>
                                </div>
                                <!-- <div class="flex justify-between">
                                dd {{item?.datetime_end}}
                                <TmmLabelSmall :label="calculateRemainingTime(item?.datetime_end)" />
                            </div> -->
                            </div>
                            <div>
                                <a-badge @click="navigateToChat(item)"
                                    :count="item.no_read_messages_count != 0 ? item.no_read_messages_count : null">
                                    <WechatOutlined style="font-size:25px;color: #0D8BD8 " />
                                </a-badge>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between">
                                <small>อัตราความสำเร็จ</small>
                                <small v-if="item.completion_percentage" class="text-blue-500 font-semibold">{{
                                    item?.completion_percentage
                                    }}%</small>
                            </div>
                            <TmmFeedbackProgress :value="item?.completion_percentage || '0'" />
                        </div>
                    </div>
                </div>
            </div>

            <van-action-sheet v-model:show="show" :actions="actions" @select="onSelect" />


            <div class="flex justify-center mb-5">
                <a-pagination v-model:current="currentPageMyWork" @change="pagiChangeMyJobs" :total="totalRowMywork"
                    class="border-gray-300 p-1 border rounded-xl bg-white" v-model:page-size="rowPerPageMyWork" />
            </div>
        </div>

        <div v-else>
            <a-list :data-source="[]" />
        </div>

    </section>
</template>

<script setup>
definePageMeta({
    middleware: 'auth'
});
useHead({ title: 'งานของฉัน' });
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

const currentPageMyWork = ref(1)
const rowPerPageMyWork = ref(5)
const totalRowMywork = ref(0)
const pagiChangeMyJobs = async () => {
    loadMyJobs();
}
const resMyJobs = ref([])
const loadMyJobs = async () => {
    try {
        const res = await dataApi.getMyJobs(currentPageMyWork.value, rowPerPageMyWork.value)
        resMyJobs.value = await res.data.data;
        totalRowMywork.value = res.data.total
        await mqttSub();
    } catch (error) {
        console.error(error);
    }
}

import { $mqtt } from "vue-paho-mqtt";
const mqtt_pre = useRuntimeConfig().public.MQTT_PRE;
const mqttSub = async () => {
    try {
        if (resMyJobs.value?.length > 0) {
            resMyJobs.value?.forEach((e, i) => {
                $mqtt.subscribe(`${mqtt_pre}/jobs/chat/${e.id}/ping_messages`, (message) => {
                    // const parsedMessage = JSON.parse(message);
                    // console.log("parsedMessage", parsedMessage);
                    getNoReadMessageJobMission(e.id)
                });
            });
        }

    } catch (error) {
        console.error(error);
    }
};

const getNoReadMessageJobMission = async (jobid) => {
    try {
        setTimeout(async () => {
            const res = await dataApi.getCheckNoRead(jobid);
            if (resMyJobs.value) {
                const jobMission = resMyJobs.value.find(job => job.id == jobid);
                if (jobMission) {
                    jobMission.no_read_messages_count = res.data.data.no_read_messages_count;
                    console.log('count of no read', res.data.data.no_read_messages_count)
                }
            }
        }, 1500);
    } catch (error) {
        console.error("Error updating no_read_messages_count:", error);
    }
};

// const currentPageMyReports = ref(1)
// const rowPerPageMyReports = ref(5)
// const totalRowMyReports = ref(0)
// const pagiChangeMyReports = async () => {
//   loadMyReports();
// }
// const resMyReports = ref()
// const loadMyReports = async () => {
//   try {
//     const res = await dataApi.getMyreport(currentPageMyReports.value, rowPerPageMyReports.value)
//     resMyReports.value = res.data.data;
//     totalRowMyReports.value = res.data?.total
//   } catch (error) {
//     console.error(error);
//   }
// }

onMounted(() => {
    loadMyJobs();
    //   loadMyReports();
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