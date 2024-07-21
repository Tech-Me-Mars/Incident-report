<template>
    <Button :label="label" :icon="icon" :type="type" :severity="severity" size="small" class="w-auto"
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
        default: "ไม่อนุมัติ",
    },
    severity: {
        type: String,
        default: "danger",
    },
    icon:{
        type: String,
        default: "mdi mdi-block-helper",
    },
    type:{
        type: String,
        default: "button",
    },

});
</script>