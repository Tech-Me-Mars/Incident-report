<template>
    <Badge class="w-[3rem]" :value="label" severity="danger"></Badge>
</template>

<script setup>
const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: "ปิด",
    }
});
</script>