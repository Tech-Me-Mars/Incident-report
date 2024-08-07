<template>
    <HeaderMainProfile />
    <HeaderMenu class="flex justify-start items-center gap-5">
        <!-- <NuxtLink to="/"> -->
            <TmmButtonBackPage @click="router.back()" />
        <!-- </NuxtLink> -->
        <p class="font-bold text-lg">การแจ้งเตือน</p>
    </HeaderMenu>

    <section class="p-3">
        <!-- <PageNotificationNotifydata /> -->
        <div class="mb-3">
            <span class="text-gray-500">แจ้งเตือนใหม่</span>
        </div>
        <div class="card p-5 mb-2" v-for="(item, index) in resNotify" :key="index"
            :class="[{ '!bg-blue-50': !item.read_at }]">
            <NuxtLink 
                :to="`/notification/${item.id}`">
                <div class="flex w-full items-start gap-3">
                    <TmmIcon icon="mdi mdi-bell text-2xl text-blue-500" rounded />
                    <div class="flex flex-col">
                        <span v-html="item?.title" class="text-md mb-3"></span>
                        <!-- <div class="flex justify-between items-center">
                            <small class="text-gray-300 text-xs text-gray-900 mb-2">เหลือเวลาอีก 13 ชั่วโมง</small>
                        </div> -->
                    </div>
                </div>
            </NuxtLink>



        </div>

    </section>

    <TmmAlertToast :data="alertToast" :error="errorAlert" :dataError="dataError" />
</template>

<script setup>
definePageMeta({
   middleware: 'auth'
});
useHead({ title: 'แจ้งเตือน' });
import { formatDateTime, formatDate, customDateFormat, formatCurrency, formatNumber, roundToTwoDecimalPlaces } from '@/helpers/utility';
//! /////// [Api Variable] /////////
import * as dataApi from './api/dataApi.js'
import { format } from "date-fns";
//! /////// [validation import] /////////
import { useField, useForm, Form, useFieldArray } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

import * as zod from "zod";
const router = useRouter();
const isloadingAxi = useState('isloadingAxi')
const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({});
const route = useRoute();

const resNotify = ref()
const loadNotify = async () => {
    try {
        const res = await dataApi.gerNotify()
        resNotify.value = res.data.data;
        // console.log(resNotify.value)
    } catch (error) {
        console.error(error);
    }
}
onMounted(() => {
    loadNotify()
})
</script>