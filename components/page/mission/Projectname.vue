<template>
    <TmmCard class="bg-blue-600 mb-2 card">
        <template #header>
          <div class="py-1">
            <div class="flex gap-3 items-center">
              <TmmIcon icon="mdi mdi-clock-time-four text-2xl text-white" />
              <TmmLabelSubtitle class="text-white" label="โครงการตรวจสายตาเพื่อประชาชน" />
            </div>
          </div>
        </template>
        <template #body>
          <div class="flex justify-between text-blue-100 mb-2">
            <p class="font-medium text-xs">ผู้วางแผนงาน</p>
            <span class="ml-auto font-light text-xs">พล.ต.ท ยิ่งยศ ใจดี</span>
          </div>
          <div class="flex justify-between text-blue-100">
            <p class="font-medium text-xs">ผู้อนุมัติแผนงาน</p>
            <span class="ml-auto font-light text-xs">พล.ต.อ สมหวัง ใจแข็งแกร่ง</span>
          </div>
        </template>
      </TmmCard>
</template>