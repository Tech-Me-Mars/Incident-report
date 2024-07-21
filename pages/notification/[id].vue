<template>
    <HeaderMainProfile />
    <HeaderMenu class="flex justify-start items-center gap-5">

            <TmmButtonBackPage @click="router.back()" />

        <p class="font-bold text-lg">การแจ้งเตือน</p>
    </HeaderMenu>
    <section class="p-3">
        <div class="card p-5 mb-2 min-h-[16rem] flex flex-col items-center justify-between">

            <div class="flex w-full items-start gap-3">
                <!-- <TmmIcon icon="mdi mdi-bell text-2xl text-blue-500" rounded /> -->
                <NotificationTwoTone />
                <div class="flex flex-col">
                    <!-- <span class="text-md mb-3">{{ resNotify?.title }}</span>
                        <p class="text-sm" >{{ resNotify?.body }}</p> -->
                    <span v-html="resNotify?.title" class="text-md mb-3"></span>
                    <p v-html="resNotify?.body" class="text-sm"></p>
                </div>
            </div>

            <!-- edit // approve -->
            <NuxtLink v-if="resNotify?.topic != 'show' && resNotify?.topic == 'jobs'"
                :to="`/jobs/mission/${resNotify?.value_id}`">
                <TmmButton label="ดูรายละเอียด" type="primary" />
            </NuxtLink>
            <NuxtLink v-else-if="resNotify?.topic != 'show' && resNotify?.topic == 'jobs_process' && resNotify?.action_page == 'edit'"
                :to="`/jobs/mission/process/${resNotify?.value_id}?jobid=${resNotify?.jobs_id}`">
                <TmmButton label="ดูรายละเอียด" type="primary" />
            </NuxtLink>
            <NuxtLink v-else-if="resNotify?.topic != 'show' && resNotify?.topic == 'jobs_process' && resNotify?.action_page == 'approve'"
                :to="`/jobs/mission/approve/${resNotify?.value_id}?jobid=${resNotify?.jobs_id}`">
                <TmmButton label="ดูรายละเอียด" type="primary" />
            </NuxtLink>
            <NuxtLink v-else-if="resNotify?.topic != 'show' && resNotify?.topic == 'jobs_process'"
                :to="`/jobs/mission/complete/${resNotify?.value_id}?jobid=${resNotify?.jobs_id}`">
                <TmmButton label="ดูรายละเอียด" type="primary" />
            </NuxtLink>
            <NuxtLink v-else-if="resNotify?.topic != 'show' && resNotify?.topic == 'report'"
                :to="`/report/edit/${resNotify?.value_id}`">
                <TmmButton label="ดูรายละเอียด" type="primary" />
            </NuxtLink>
            <!-- <NuxtLink v-if="resNotify?.topic == 'show'" :to="`/jobs/mission/${resNotify?.id}`">
                <TmmButton label="ดูรายละเอียด" type="primary" />
            </NuxtLink> -->

        </div>
    </section>
</template>

<script setup>
import { formatDateTime, formatDate, customDateFormat, formatCurrency, formatNumber, roundToTwoDecimalPlaces } from '@/helpers/utility';
//! /////// [Api Variable] /////////
import * as dataApi from './api/dataApi.js'

const isloadingAxi = useState('isloadingAxi')
const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({});
const route = useRoute();
const router = useRouter();
const resNotify = ref()
const loadNotify = async () => {
    try {
        const res = await dataApi.getNotifyById(route.params.id);
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