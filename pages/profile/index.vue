<template>
  <HeaderMainProfile />
  <section class="p-3">
    <PageProfileHeader />
    <div class="grid grid-cols-3 mb-2" v-if="resPointSummary?.point">
    <div v-for="(point, index) in resPointSummary.point" :key="index" class="flex flex-col items-center w-full">
      <div
        class="w-24 h-24 rounded-full flex justify-center items-center text-white font-bold text-2xl"
        :style="{ color: point.color, backgroundColor: point.bg_color }"
      >
        <template v-if="point.style_mode === 'full'">
          <div class="text-center">
            <span>{{ point.value[0] }}</span>
            <p class="text-sm">{{ point.unit_text }}</p>
          </div>
          
        </template>
        <template v-else-if="point.style_mode === 'haft'">
          <div class="relative w-full h-full flex items-center justify-center">
            <div class="absolute top-0 left-0 w-full h-1/2 flex items-center justify-center">
              {{ point.value[0] }}
            </div>
            <div class="absolute bottom-0 left-0 w-full h-1/2 flex flex-col items-center justify-center">
              <span>{{ point.value[1] }}</span>
              <p class="text-sm">{{ point.unit_text }}</p>
            </div>
            <div class="absolute w-4/5 h-0.5 bg-white top-1/2 transform -translate-y-1/2"></div>
          </div>
        </template>
      </div>
      <p class="mt-2 text-gray-500 text-center">{{ point.text }}</p>
    </div>
  </div>

    <table class="table-fixed w-full bg-white rounded-lg shadow-md" v-if="resPointSummary">
      <thead>
        <tr class="text-lg font-medium border-b-2 border-gray-200">
          <th class="p-3">รูปแบบภารกิจ</th>
          <th class="p-2">จำนวน</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-gray-200" v-for="([key, value], index) in Object.entries(resPointSummary?.summary)"
          :key="index">
          <td class="p-1 ps-2">{{ key }}</td>
          <td class="p-1 text-center">{{ value }}</td>
        </tr>
      </tbody>
    </table>
    <!-- <PageProfileListproject /> -->
    <div class="mt-10 mb-3">
      <span class="text-gray-500">ข้อมูลทั่วไป</span>
    </div>
    <PageProfileMenu />

  </section>
</template>
<script setup>
definePageMeta({
   middleware: 'auth'
});
useHead({ title: 'โปรไฟล์' });
import * as dataApi from './api/data.js'

const resPointSummary = ref();
const loadPointSummary = async () => {
  try {
    const res = await dataApi.getPointSummary();
    resPointSummary.value = res.data.data
  } catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  loadPointSummary();
})
</script>
<style scoped></style>
