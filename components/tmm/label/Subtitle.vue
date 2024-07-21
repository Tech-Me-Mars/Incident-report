<template>
    <span class="text-sm">{{ label }}</span>
</template>
<script setup>
const props = defineProps({
    label: {
        type: String,
        default: "",
    },
});
</script>