<template>
  <HeaderMainProfile />
  <section class="p-3">
    <HeaderMenu class="flex justify-start items-center gap-3">
    <NuxtLink :to="`/report/edit/${route.params.id}`">
      <TmmButtonBackPage />
    </NuxtLink>
    <p class="font-bold text-lg">ออกรายงาน PDF</p>
  </HeaderMenu>
    <!-- แสดงเอกสาร PDF โดยใช้ Vue PDF Embed -->
    <!-- {{ resPdf }} -->
      <div v-if="pdfUrl">
    <span  class="underline cursor-pointer" @click="exportToPDF(`รายการ export${format(
          new Date(),
          'yyyyMMddHHmmss'
        )}`, pdfSection)">
      กดที่นี่เพื่อดาวโหลดเอกสาร
    </span>
    <div ref="pdfSection">
    <VuePdfEmbed annotation-layer text-layer :source="pdfUrl" />
  </div> 
</div>

  <div v-else class="mt-10 text-center">
    <span class="">กำลังสร้างเอกสาร... <van-loading type="spinner" color="#1989fa" /></span>
  </div>

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

onMounted(async () => {
  await loadPdf();
});

const resPdf = ref();
const pdfUrl = ref('');
const loadPdf = async () => {
  try {
    const res = await dataApi.getReportPdfV2(route.params.id);
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