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
        default: "อัพโหลด",
    },
    icon: {
        type: String,
        default: "mdi mdi-cloud-upload-outline",
    },
    severity: {
        type: String,
        default: "success",
    },
    size: {
        type: String,
        default: "",
    },
});

</script>