<template>
    <a-space direction="vertical" style="width: 100%">

        <a-select v-model:value="value" mode="multiple" style="width: 100%" placeholder="select one country"
            :options="options">
            <template #option="{ value: val, label, icon }">
                <span >
                        <img :src="`/image/icon/${icon}`" class="w-5 h-5" />{{ label }}
                    </span>
            </template>
            <template #tagRender="{ value: val, label, closable, onClose, option }">
                <a-tag :closable="closable" style="margin-right: 3px" @close="onClose">
                    <span >
                        <img :src="`/image/icon/${option.icon}`" class="w-5 h-5" />{{ label }}
                    </span>
                </a-tag>
            </template>
        </a-select>


        
        <span>Note: v-slot:option support from v2.2.5</span>
    </a-space>
    <br />
    <br />

    Val:{{ value }}
</template>
<script setup>
import { ref, watch } from 'vue';
const value = ref([]);
const options = ref([
    {
        value: 'pdf',
        label: 'PDF',
        icon: 'pdf.png',
    },
    {
        value: 'jpeg',
        label: 'JPEG',
        icon: 'jpeg.png',
    },
    {
        value: 'word',
        label: 'Word',
        icon: 'word.png',
    },
    {
        value: 'excel',
        label: 'Excel',
        icon: 'excel.png',
    },
    {
        value: 'power point',
        label: 'Power Point',
        icon: 'ppt.png',
    },
]);
watch(value, val => {
    console.log(`selected:`, val);
});
</script>