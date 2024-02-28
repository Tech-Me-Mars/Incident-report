<template>
    <span class="font-semibold">{{ label }}</span>
</template>
<script setup>
const props = defineProps({

    label: {
        type: String,
        default: "",
    },


});
</script>