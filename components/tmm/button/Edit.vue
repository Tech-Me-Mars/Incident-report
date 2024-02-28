<template>
    <Button outlined class="shadow-none p-0" style="min-width: 2rem;" :loading="loading">
        <span :class="`${icon}`"></span>
    </Button>
</template>
  
<script setup>
const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: "แก้ไข",
    },
    icon: {
        type: String,
        default: "mdi mdi-lead-pencil",
    },
    severity: {
        type: String,
        default: "secondary",
    },
    size: {
        type: String,
        default: "",
    },
});
</script>
  