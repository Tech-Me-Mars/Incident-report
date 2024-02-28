<template>
    <Button :label="label" :icon="icon" :severity="severity" :size="size" class="w-auto" :loading="loading" />
</template>
  
<script setup>
const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: "ลบทั้งหมด",
    },
    icon: {
        type: String,
        default: "mdi mdi-delete-forever",
    },
    severity: {
        type: String,
        default: "danger",
    },
    size: {
        type: String,
        default: "",
    },
});
</script>
  