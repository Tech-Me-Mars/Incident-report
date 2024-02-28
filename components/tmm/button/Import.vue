<template>
    <Button :label="label" :icon="icon" :type="type" :severity="severity" :size="size" class="w-auto" style="background-color: green;"
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
        default: "นำเข้า",
    },
    severity: {
        type: String,
        default: "success",
    },
    icon:{
        type: String,
        default: "mdi mdi-import",
    },
    type:{

    },
    size:{
        type: String,
        default: "normal",
    }

});
</script>