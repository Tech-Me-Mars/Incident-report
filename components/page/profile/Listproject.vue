<template>
  <div class="flex justify-center mb-5 mt-2">
    <a-segmented class="font-medium border-2 border-zinc-100 rounded-full bg-gray-100" v-model:value="value"
      :options="data" size="" />
  </div>

  <div class="my-2">
    <TmmInputDropDown v-model="bestChoice" placeholder="เลือก" :options="options" class="w-full" value="id"
      label="name" />
  </div>
  <div class="card p-5 mb-2">
    <div class="flex w-full items-center gap-3 mb-2">
      <!-- <TmmIcon icon="mdi mdi-clock-time-four text-2xl text-blue-500" rounded /> -->
      <ClockCircleTwoTone style="font-size: 20px;" />
      <div class="flex flex-col">
        <TmmLabelSubtitle class="" label="โครงการตรวจสายตาเพื่อประชาชน" />
        <TmmLabelSmall label="เหลือเวลาอีก 5 วัน 13 ชั่วโมง" />
      </div>
    </div>
    <div>
      <div class="flex justify-between">
        <small>อัตราความสำเร็จ</small>
        <small class="text-blue-500 font-semibold">68%</small>
      </div>
      <TmmFeedbackProgress value=25 />
    </div>
  </div>

  <div class="card p-5 mb-2">
    <div class="flex w-full items-center gap-3 mb-2">
      <!-- <TmmIcon icon="mdi mdi-clock-time-four text-2xl text-blue-500" rounded /> -->
      <ClockCircleTwoTone style="font-size: 20px;" />
      <div class="flex flex-col">
        <TmmLabelSubtitle class="" label="ประสานงานทีมกับสน.ทองหล่อช่วยเหลือผู้เสียหาย" />
        <TmmLabelSmall label="เหลือเวลาอีก 5 วัน 13 ชั่วโมง" />
      </div>
    </div>
    <div>
      <div class="flex justify-between">
        <small>อัตราความสำเร็จ</small>
        <small class="text-blue-500 font-semibold">83%</small>
      </div>
      <TmmFeedbackProgress value=25 />
    </div>
  </div>

  <div class="flex justify-center">
    <a-pagination v-model:current="currentPage" :total="100" v-model:page-size="pageSize1" class="card w-full" />
  </div>
</template>
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
<script setup>
import { color } from 'chart.js/helpers';
import dropdown from '~/wind/dropdown';

const data = reactive(['ประวัติการทำงาน', 'ประวัติการรายงาน']);
const value = ref(data[0]);
const pageSize1 = ref(3);
const currentPage = ref(1)
const options = ref([
  {
    id: 1,
    name: 'Jack',
  },
  {
    id: 2,
    name: 'Lucy',
  },
  {
    id: 3,
    name: 'Disabled',
    disabled: true,
  },
  {
    id: 4,
    name: 'Yiminghe',
  },
]);
const bestChoice = ref(undefined)
</script>