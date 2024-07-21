<template>
  <TmmCard class="mb-2 card">
    <template #header>
      <h2>
        <TmmTag color="#f0c424" class="rounded-xl px-4 py-1">ลำดับงานที่ 2</TmmTag>
      </h2>
    </template>
    <template #body>
      <div class="py-3">
        <div class="flex justify-between">
          <p class="font-medium text-xs">ผู้รับผิดชอบ</p>
          <span class="ml-auto font-light text-xs">พล.ต.ท สมปอง รุ่งเรือง</span>
        </div>
        <div class="flex justify-between">
          <p class="font-medium text-xs">ระยะเวลาดำเนินงาน</p>
          <span class="ml-auto font-light text-xs">12 ม.ค. 67 - 20 ม.ค. 67</span>
        </div>
        <div>
          <p class="font-medium text-xs">รายละเอียดงาน</p>
          <span class="font-light text-xs">
            ไดรับมอบหมายงานให้ลงพื้นที่ตรวจสอบความปลอดภัยให้แก่ประชาชนในพื้นที่ลาดพร้าว 71
          </span>
        </div>


      </div>
      <hr>
    </template>
    <template #footer>
      <NuxtLink to="/jobs/mission/detail/1">
      <div class="py-1 flex items-center gap-2 mb-3">
        <span class="mdi mdi-comment-text-outline"></span>
        <TmmLabelSmall label="2 ความคิดเห็น" />
      </div>
    </NuxtLink>
      <div class="flex justify-center">
        <NuxtLink to="/jobs/mission/process/1">
          <TmmButton label="จัดการ" className="rounded-lg min-w-[10rem]" type="primary" severity="orange" />
        </NuxtLink>
      </div>
    </template>
  </TmmCard>


</template>