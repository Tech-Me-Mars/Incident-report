<template>
    <div class="flex items-center flex-col justify-center h-[35rem]">
        <img src="/image/background/creat_work.png" alt="Background Image" class="object-cover  z-0 opacity-75">
            <p class="text-gray-400 text-center">ท่านสามารถสร้างแผนงานและเพิ่มเพื่อนร่วมทีมได้ ที่นี่!</p>
    </div>
    <div class="flex justify-center px-10">
        <NuxtLink to="/jobs/add">
            <TmmButton label="สร้างแผนงาน" className="w-full min-w-[16rem]" size="large" type="primary" />
        </NuxtLink>
    </div>
</template>