<template>
    <Button :label="label" :loading="loading" severity="success" style="background-color: green;" >
        <i class="mdi mdi-microsoft-excel mr-1"></i>{{ label }}
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
        default: "เพิ่ม",
    }
});

</script>