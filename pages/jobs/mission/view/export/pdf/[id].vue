<template>
  <HeaderMainProfile />
  <section class="p-3">
    <HeaderMenu class="flex justify-start items-center gap-5">
    <!-- <NuxtLink :to="`/jobs/mission/view/${route.params.id}`"> -->
      <TmmButtonBackPage @click="redirectToJobPage()" />
    <!-- </NuxtLink> -->
    <p class="font-bold text-lg">ออกรายงาน PDF</p>
  </HeaderMenu>
    <!-- แสดงเอกสาร PDF โดยใช้ Vue PDF Embed -->
    <!-- {{ resPdf }} -->
    <div ref="pdfSection">
    <VuePdfEmbed annotation-layer text-layer :source="pdfUrl" />
  </div>
    <span class="underline cursor-pointer" @click="exportToPDF(`รายการ export${format(
          new Date(),
          'yyyyMMddHHmmss'
        )}`, pdfSection)">
      กดที่นี่เพื่อดาวโหลดเอกสาร
    </span>
  </section>
  <TmmAlertToast :data="alertToast" :error="errorAlert" :dataError="dataError" />
</template>

<script setup>
import VuePdfEmbed from 'vue-pdf-embed';
// สไตล์ที่จำเป็น
import 'vue-pdf-embed/dist/style/index.css';
// สไตล์ที่เพิ่มเติม
import 'vue-pdf-embed/dist/style/annotationLayer.css';
import 'vue-pdf-embed/dist/style/textLayer.css';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import * as dataApi from '../api/data.js';
import { format } from "date-fns";

const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({});
const route = useRoute();
const router = useRouter();

const redirectToJobPage = () => {
  const jobid = route?.query?.jobid;
  if (jobid && jobid!="undefined") {
    router.push(`/jobs/mission/view/${route.params.id}?jobid=${jobid}`);
  } else {
    router.push(`/jobs/mission/view/${route.params.id}`);
  }
};

onMounted(async () => {
  await loadPdf();
});

const resPdf = ref();
const pdfUrl = ref('');
const loadPdf = async () => {
  try {
    const res = await dataApi.getJobPdf(route.params.id);
    resPdf.value = res.data; // เก็บ Blob object ที่ได้จาก API
    const pdfObjectUrl = URL.createObjectURL(res.data); // แปลง Blob เป็น URL
    pdfUrl.value = pdfObjectUrl; // เก็บ URL ไว้ใช้งานในการแสดง PDF
    console.log(pdfUrl.value)
  } catch (error) {
    console.error(error);
  }
};

const pdfSection = ref(null)
</script>