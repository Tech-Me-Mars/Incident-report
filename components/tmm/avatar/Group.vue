<template>
    <a-avatar-group :size="size" :max-style="{ color: '#f56a00', backgroundColor: '#fde3cf' }">
       <slot />
    </a-avatar-group>
</template>

<script setup>

const props = defineProps({
    size: {
        type: String,
        default: "default", //number | large | small | default | { xs: number, sm: number, ...}
    },
    shape: {
        type: String, // circle | square
        default: "circle",
    },

});
</script>