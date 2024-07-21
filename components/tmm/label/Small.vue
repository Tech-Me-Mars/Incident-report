<template>
    <small class="text-gray-300 text-xs">{{ label }}</small>
</template>
<script setup>
const props = defineProps({
    label: {
        type: String,
        default: "",
    },
});
</script>