<template>
    <HeaderMenu class="flex justify-between">
        <TmmButtonBackPage @click="redirectToJobPage()" />
      <TmmButtonExportHeader @click="showDrawer" />
    </HeaderMenu>
    <!-- <NuxtLink :to="`/jobs/mission/process/export/pdf/${route.params.id}`"></NuxtLink> -->
    <a-drawer title="Export File" placement="bottom" :closable="false" :open="open" @close="onClose">
      <NuxtLink :to="`/jobs/mission/view/export/pdf/${route.params.id}?jobid=${route?.query?.jobid}`">
                <div class="flex gap-3 items-center bg-white border-blue-500 border-2 rounded-xl p-1 mb-2">
                    <TmmIcon icon="mdi mdi-file-pdf-box text-blue-600" style="font-size:30px" />
                    <span class="text-xl font-nomal">Export PDF</span>
                </div>
            </NuxtLink>

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

      
</template>
<script setup>
import { formatDateTime, formatDate, customDateFormat, formatCurrency, formatNumber, roundToTwoDecimalPlaces } from '@/helpers/utility';
//! /////// [Api Variable] /////////
import * as dataApi from './api/data.js'
import { format } from "date-fns";
import { useRoute } from 'vue-router';
const route = useRoute()
const router = useRouter()
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
  if (jobid && jobid!="undefined") {
    router.push(`/jobs/mission/${jobid}`);
  } else {
    router.push("/");
  }
};
</script>