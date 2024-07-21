<!-- InputSearch.vue -->

<template>
    <a-textarea v-model:value="model" :autoResize="autoResize" :class="`${className}`" :placeholder="placeholder" :rows="rows" :disabled="disabled"
    :status="errorStatus" :readonly="readonly" />
</template>
      
<script setup>
const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: "",
    },
    rows: {
        type: [String,Number],
        default: 4,
    },
    cols: {
        type: String,
        default: "30",
    },
    readonly: {
        type: Boolean,
        default: false
    },
    autoResize: {
        type: Boolean,
        default: false
    },
    className: {
        type: String,
        default: "",
    },
    error: {
        type: String,
        default: "",
    }
});

const errorStatus = computed(() => {
    return props.error ? 'error' : ''; // ถ้ามี error ให้ส่งค่า 'error' มิฉะนั้นส่งค่าว่าง
});

const model = defineModel()
const emits = defineEmits();
const emitKeydown = (event) => {
    emits('keydown', event); // Emit the keydown event
}



</script>
      