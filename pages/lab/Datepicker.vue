<template>
    <a-date-picker v-model:value="selectDate" :class="`block `" :valueFormat="formatDate" />
    {{ formatDate }}
</template>

<script setup>
import { ref, computed } from 'vue';

const selectDate = ref();

// สร้าง computed property เพื่อ format ค่าวันที่ใหม่ให้ตรงกับรูปแบบที่ต้องการ
const formatDate = computed(() => {
    if (selectDate.value) {
        const dateObj = new Date(selectDate.value);
        return dateObj.toString(); // สามารถแก้ไขการ format ตามที่ต้องการได้ที่นี่
    }
    return null;
});
</script>