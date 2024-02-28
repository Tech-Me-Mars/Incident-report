<template>
    <small>{{ label }}</small>
</template>
<script setup>
const props = defineProps({
    label: {
        type: String,
        default: "",
    },
});
</script>