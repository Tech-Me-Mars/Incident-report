<template>
    <span class="font-medium text-sm">{{ label }}</span>
</template>
<script setup>
const props = defineProps({
    label: {
        type: String,
        default: "",
    },
});
</script>