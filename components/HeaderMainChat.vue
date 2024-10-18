<template>

    <div class="bg-white py-2 px-3   w-full z-10">
        <!-- <slot /> -->
        <div class="flex flex-wrap justify-between items-center">
            <NuxtLink to="/profile">
                <div class="flex flex-col ">
                    <p class="font-medium">สวัสดี , {{ resProfile?.rank_name_th_abb }} {{ resProfile?.first_name }} {{
                        resProfile?.last_name }}</p>
                    <small class="font-light text-gray-500">มาทำเป้าหมายให้สำเร็จกัน!</small>
                </div>
            </NuxtLink>
            <div class="flex gap-5 items-center">
                <a-badge :count="resNotifyCount || 0" color="red">
                    <NuxtLink to="/notification">
                        <i type="" class="mdi mdi mdi-bell text-lg text-blue-500" style="font-size: 25px;">
                        </i>
                    </NuxtLink>
                </a-badge>
                <NuxtLink to="/profile">
                    <TmmAvatar :label="resProfile?.fullname || ''" :size="50"
                        :src="resProfile?.upload_avatar || '/image/police_no_img.png'">
                    </TmmAvatar>
                </NuxtLink>
            </div>
        </div>

    </div>
</template>

<script setup>
import { formatDateTime, formatDate, customDateFormat, formatCurrency, formatNumber, roundToTwoDecimalPlaces } from '@/helpers/utility';
//! /////// [Api Variable] /////////
import * as dataApi from '@/service/ProfileService.js'
import { format } from "date-fns";

const isloadingAxi = useState('isloadingAxi')
const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({});
const route = useRoute();



const resProfile = ref()
const loadProfile = async () => {
    try {
        const res = await dataApi.getMyProfile()
        resProfile.value = res.data.data;
        resProfile.value.fullname = `${res.data.data?.rank_name_th_abb} ${res.data.data?.first_name} ${res.data.data?.last_name}`
    } catch (error) {
        console.error(error);
    }
}

const resNotifyCount = ref()
const loadNotifyCount = async () => {
    try {
        setTimeout(async () => {
            const res = await dataApi.getNotifyCount();
            resNotifyCount.value = await res.data.data?.count_data;
        }, 1500);
    } catch (error) {
        console.error(error);
    }
}
onMounted(async () => {
    await loadProfile();
    await mqttSub()
    await loadNotifyCount();
})

// connect MQTT
import { $mqtt } from 'vue-paho-mqtt';
onMounted(() => {

});
const mqtt_pre = useRuntimeConfig().public.MQTT_PRE;
const mqttSub = async () => {
    $mqtt.subscribe(`${mqtt_pre}/notification/${resProfile.value.police_employee_id}`, (message) => {
        // เมื่อมีการรับข้อมูลจาก mqtt
        loadNotifyCount()
        console.log(message, 'received');
        const audio = new Audio('/mp3/goldencookie0-43081.mp3');
        audio.play();
    });
}

</script>