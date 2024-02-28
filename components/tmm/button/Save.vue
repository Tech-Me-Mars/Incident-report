<template>
    <Button :label="label" :icon="icon" :type="type" :severity="severity" :size="size" class="w-auto"
        :loading="loading" />
</template>

<script setup>
const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: "บันทึก",
    },
    severity: {
        type: String,
        default: "success",
    },
    icon:{
        type: String,
        default: "mdi mdi-content-save-check",
    },
    type:{
        type: String,
        default: "button",
    },
    size:{
        type: String,
        default: "normal",
    }
});
</script>