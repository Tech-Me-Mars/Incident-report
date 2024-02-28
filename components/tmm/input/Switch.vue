<template>
<a-switch v-model:checked="model" :class="`${className}`" :disabled="disabled" :readonly="readonly" :loading="loading" :size="size"  @click="emitClick"/>
</template>
  
<script setup>
const model = defineModel()
const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: "",
    },
    readonly: {
        type: Boolean,
        default: false
    },
    className: {
        type: String,
        default: "",
    },
    size: {
        type: String,
        default: "default ", //default | small
    },
});
const emits = defineEmits();
const emitKeydown = (event) => {
    emits('keydown', event); // Emit the keydown event
}
const emitInput = (event) => {
    emits('input', event);
};

const emitClick = (event) => {
    emits('click', event); // Emit the keydown event
}
</script>
  


