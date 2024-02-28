<template>
    <a-tooltip :title="label" placement="top">
        <a-avatar :src="src?src:image404" :size="size" />
    </a-tooltip>
</template>

<script setup>
import { FwbAvatar } from 'flowbite-vue'
import image404 from "@/assets/image/notfound.jpg"
const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
    label:{
        type: String,
        default: "",
    },
    src: {
        type: String,
        default: "",
    },
    size: {
        type: [String,Number],
        default: "default", //number | large | small | default | { xs: number, sm: number, ...}
    },
    shape: {
        type: String, // circle | square
        default: "circle",
    }

});
</script>