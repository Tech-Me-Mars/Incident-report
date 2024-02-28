<template>
    <Button :label="label" :icon="icon" :type="type" :severity="severity" :size="small" class="w-auto"
        :loading="loading" >
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
        default: "อนุมัติ",
    },
    severity:{
        type: String,
        default: "success",
    },
    icon:{
        type: String,
        default: "mdi mdi-check",
    },
    type:{
        type: String,
        default: "button",
    },
    small:{
        type: String,
        default: "small",
    }
});
</script>