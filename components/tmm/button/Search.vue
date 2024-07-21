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
        default: "ค้นหา",
    },
    icon: {
        type: String,
        default: "",
    },
    severity: {
        type: String,
        default: "primary",
    },
    size: {
        type: String,
        default: "",
    },
});

</script>