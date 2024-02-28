<template>
    <fwb-progress :progress="value" :size="size" :label="label" :label-position="labelposition"
 />
</template>

<script setup>
import { FwbProgress } from 'flowbite-vue'

const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
    label:{
        type: String,
        default: "",
    },
    value: {
        type: String,
        default: "",
    },
    size: {
        type: String,
        default: "sm", //sm || md || lg ||xl
    },
    labelposition: {
        type: String, // outside | inside
        default: "outside",
    }

});
</script>