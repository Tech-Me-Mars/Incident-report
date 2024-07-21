<template>
    <Button :label="label" icon="pi pi-times"  type="button" :severity="severity" size="small"
        class="w-auto" :loading="loading" />
</template>

<script setup>
const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: "ยกเลิก",
    },
    severity: {
        type: String,
        default: "secondary",
    },
});
</script>