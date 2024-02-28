<template>
    <a-input :class="`${className}`" v-model:value="model" :disabled="disabled" :placeholder="placeholder"
        @input="emitInput" @keydown="emitKeydown" :readonly="readonly">
        <template #prefix v-if="iconleft">
            <i :class="`${iconleft}`"></i>
        </template>
        <template #suffix v-if="iconright">
            <i :class="`${iconright}`"></i>
        </template>
    </a-input>
</template>
  
<script setup>

const model = defineModel()
const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: "",
    },
    iconleft: {
        type: String,
        default: "",
    },
    iconright: {
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
    }
});
const emits = defineEmits();
const emitKeydown = (event) => {
    emits('keydown', event); // Emit the keydown event
}
const emitInput = (event) => {
    emits('input', event);
};
</script>
  


