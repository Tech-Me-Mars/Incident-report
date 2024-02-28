<template>
    <span class="text-xs text-gray-400">{{ label }}</span>
</template>

<script setup>


const props = defineProps({

    label:{
        type: String,
        default: "VIEW ALL",
    },


});
</script>