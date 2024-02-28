<template>
    <Badge class="w-[3rem]" :value="label" severity="success"></Badge>
</template>

<script setup>
const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: "เปิด",
    }
});
</script>