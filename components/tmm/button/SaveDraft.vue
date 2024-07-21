<template>
    <Button :label="label" :icon="icon" :type="type" :severity="severity" :size="size" class="w-auto "
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
        default: "บันทึกร่าง",
    },
    severity: {
        type: String,
        default: "primary",
    },
    icon:{
        type: String,
        default: "mdi mdi-file-document-arrow-right",
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