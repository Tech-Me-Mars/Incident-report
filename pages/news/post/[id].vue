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
            <div class="flex gap-3 items-center bg-zinc-100 rounded-xl p-1 mb-2">
                <TmmIcon icon="mdi mdi-file-pdf-box text-4xl text-blue-600" />
                <span class="text-xl font-light">Export PDF</span>
            </div>

            <div class="flex gap-3 items-center bg-zinc-100 rounded-xl p-1 mb-2">
                <TmmIcon icon="mdi mdi-file-pdf-box text-4xl text-pink-600" />
                <span class="text-xl font-light">Export PPT</span>
            </div>

            <div class="flex gap-3 items-center bg-zinc-100 rounded-xl p-1 mb-2">
                <TmmIcon icon="mdi mdi-file-jpg-box text-4xl text-lime-600" />
                <span class="text-xl font-light">Export JPG</span>
            </div>

            <div class="flex gap-3 items-center bg-zinc-100 rounded-xl p-1 mb-2">
                <TmmIcon icon="mdi mdi mdi-drawing-box text-4xl text-orange-600" />
                <span class="text-xl font-light">Export DRAWio</span>
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

