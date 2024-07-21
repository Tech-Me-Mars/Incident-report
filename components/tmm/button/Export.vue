<template>
  <div class="flex align-middle gap-3 my-2 md:my-0">
    <button class="group">
      <Icon icon="vscode-icons:file-type-pdf2" class="text-4xl px-0 py-0 m-0 transition-transform transform group-hover:scale-110"></Icon>
    </button>
    <button @click="$emit('export-csv')">
      <Icon icon="vscode-icons:file-type-excel" class="text-4xl px-0 py-0 m-0 transition-transform transform group-hover:scale-110"></Icon>
    </button>
    <button class="group">
      <Icon icon="flat-color-icons:print" class="text-4xl px-0 py-0 m-0 transition-transform transform group-hover:scale-110"></Icon>
    </button>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { defineEmits } from 'vue';

const emit = defineEmits(['export-csv']);

const emitExportCSV = () => {
  emit('export-csv');
};
</script>
