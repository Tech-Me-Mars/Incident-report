<template>
    <Button :label="label" :icon="icon" :type="type" :severity="severity" :size="size" class="w-auto" style="background-color: rgb(241, 237, 0);"
         :loading="loading" >
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
        default: "พิมพ์",
    },
    severity: {
        type: String,
        default: "success",
    },
    icon:{
        type: String,
        default: "mdi mdi-printer-outline",
    },
    type:{

    },
    size:{
        type: String,
        default: "normal",
    }

});
</script>