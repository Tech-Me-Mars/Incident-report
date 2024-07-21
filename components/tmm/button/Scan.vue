<template>
    <Button :label="label" :icon="icon" :type="type" :severity="severity" :size="size" :class="className" :rounded="rounded" :loading="loading" />
</template>

<script setup>

const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: "",
    },
    icon: {
        type: String,
        default: "mdi mdi-barcode-scan",
    },
    severity: {
        type: String,
        default: "primary",
    },
    size: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        default: "button",
    },
    rounded:{
        type: Boolean,
        default: false
    },
    className:{
        type: String,
        default: "",
    }
});

</script>