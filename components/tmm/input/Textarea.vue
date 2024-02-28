<!-- InputSearch.vue -->

<template>
    <a-textarea v-model:value="model" :class="`${className}`" :placeholder="placeholder" :rows="rows" :disabled="disabled"
        :readonly="readonly" />
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
        type: String,
        default: "4",
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
});

const model = defineModel()
const emits = defineEmits();
const emitKeydown = (event) => {
    emits('keydown', event); // Emit the keydown event
}



</script>
      