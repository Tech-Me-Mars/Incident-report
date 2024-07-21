<template>
    <!-- <Button :label="label" :size="size" :loading="loading" :severity="severity" >
        <i :class="`${icon} mr-1 `"></i>{{ label }}
    </Button> -->
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
        default: "เพิ่มข้อมูล",
    },
    icon: {
        type: String,
        default: "mdi mdi-text-box-plus-outline",
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