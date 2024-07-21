<template>
    <Button :label="label" :loading="loading" :size="size" :severity="severity" class="w-auto" >
        <i v-if="icon" :class="`${icon} mr-1`"></i><span v-if="icon">{{ label }}</span>
    </Button>
</template>

<script setup>

const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: "กลับ",
    },
    severity: {
        type: String,
        default: "secondary",
    },
    size:{
        type: String,
        default: "",
    },
    icon:{
        type: String,
        default: "",
    }
});

</script>