<template>
  <div class="flex align-items-center">
    <div v-if="option.id === 'add_new'">
      <span class="text-red-600">ไม่มีข้อมูล</span>
      {{ option[optionLabel] }}
    </div>
    <div v-else>
      {{ option[optionLabel] }}
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const { option, optionLabel } = defineProps(['option', 'optionLabel']);
</script>