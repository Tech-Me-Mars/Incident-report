<template>
    <PageMissionDetailHeader />
    <section class="p-3">
        <PageMissionDetailProjectname />
        <hr />
        <TmmCard class="mb-2">
            <template #header>
                <TmmLabelSubtitle class="text-blue-500" label="ลำดับงานที่ 1" />
            </template>
            <template #body>
                <div class="py-3">
                    <PageMissionDetailWorkorder />
                </div>
                <hr>
            </template>
            <template #footer>
                <div class="py-1 flex items-center gap-2">
                    <span class="mdi mdi-comment-text-outline"></span>
                    <TmmLabelSmall label="2 ความคิดเห็น" />
                </div>
            </template>
        </TmmCard>
        
    </section>
    <PageMissionDetailComment />
</template>

<script setup>

</script>