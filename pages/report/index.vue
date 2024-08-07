<template>
    <HeaderMainProfile />
    <section class="p-3">
    <HeaderMenu class="flex justify-start items-center gap-5">
        <p class="font-bold text-lg">Jobs</p>
    </HeaderMenu>
    <div class="flex items-center flex-col justify-center h-[35rem]">
        <img src="/image/background/creat_work.png" alt="Background Image" class="object-cover  z-0 opacity-75">
            <p class="text-gray-400 text-center">ท่านสามารถสร้างรายงานได้ ที่นี่!</p>
    </div>
    <div class="flex justify-center px-10">
        <NuxtLink to="/report/add">
            <TmmButton label="สร้างรายงาน" className="w-full min-w-[16rem]" size="large" type="primary" />
        </NuxtLink>
    </div>
</section>
</template>
<script setup>
definePageMeta({
   middleware: 'auth'
});
useHead({ title: 'รายงาน' });
onMounted(()=>{
    navigateTo('/report/add')
})
</script>