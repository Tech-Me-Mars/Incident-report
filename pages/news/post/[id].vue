<template>
    <HeaderMenu class="flex justify-between items-center gap-5 sticky top-0 z-50">
        <div class="flex items-center gap-3">
            <NuxtLink to="/news">
                <TmmButtonBackPage />
            </NuxtLink>
            <p class="font-bold text-lg">NEWS</p>
        </div>
        <TmmButtonExportHeader @click="showDrawer" />
    </HeaderMenu>
    <section class="p-3">

        <PageNewsDetailContent />
        <!-- <PageNewsDetailComment /> -->

        <!-- MODAL -->
        <a-drawer title="Export File" placement="bottom" :closable="false" :open="open" @close="onClose">
            <NuxtLink :to="`/news/post/export/pdf/${$route.params.id}`">
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
        <!-- END MODAL -->
    </section>
</template>

<script setup>
// [MODAL VARIABLE AND FUCTION]
const open = ref(false);
const showDrawer = () => {
    console.log('open')
    open.value = true;
};
const onClose = () => {
    open.value = false;
};
// [END MODAL VARIABLE AND FUCTION]
</script>
