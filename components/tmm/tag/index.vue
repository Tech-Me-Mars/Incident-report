<template>
    <!-- <Tag :value="label" :severity="severity"></Tag> -->
    <a-tag :color="color" >
    <slot />
    </a-tag>
</template>

<script setup>
const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: "",
    },
    color:{
        type: String,
        default: "",
    }
});
</script>