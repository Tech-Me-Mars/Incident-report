<template>
    <a-progress type="circle" class="" :percent="percent" :size="size" :strokeColor="strokeColor" :trailColor="trailColor"
        style="stroke: #ffffff;">
        <template #format="percent">
            <span :style="{ color: labelColor }">{{ percent }}%</span>
        </template>
    </a-progress>
</template>

<script setup>
const props = defineProps({
    percent: {
        type: String,
        required: true
    },
    size: {
        type: [String, Number],
        default: "default" //number | [number, number] | "small" | "default"
    },
    strokeColor: {
        type: String,
        default: "#ffffff"
    },
    trailColor: {
        type: String,
        default: "#accae3"
    },
    labelColor: {
        type: String,
        default: "#ffffff"
    }
})
</script>

