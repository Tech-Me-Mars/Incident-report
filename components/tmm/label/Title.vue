<template>
    <span class="font-">{{ label }}</span>
</template>
<script setup>
const props = defineProps({

    label: {
        type: String,
        default: "",
    },


});
</script>