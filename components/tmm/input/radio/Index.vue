<template>
<a-radio-group v-model:value="model">
    <a-radio :value="value">{{ label }}</a-radio>
</a-radio-group>
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
    //     options: {
    //     type: Array,
    //     default: () => [],
    //   },
    readonly: {
        type: Boolean,
        default: false
    },
    className: {
        type: String,
        default: "",
    },
    label: {
        type: String,
        default: "",
    },
    value: {
        type: [String, Number],
        default: undefined,
    },
});
const emits = defineEmits();
const emitKeydown = (event) => {
    emits('keydown', event); // Emit the keydown event
}
const emitInput = (event) => {
    emits('input', event);
};
</script>