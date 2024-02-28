<template>
    <InputGroup>
        <InputGroupAddon class="p-0 px-2">
            <span class="font-bold  text-blue-700">{{ label }}</span>
        </InputGroupAddon>
        <InputText :class="`${className} border-l-0`" v-model="model" :disabled="disabled" :placeholder="placeholder"
            @input="emitInput" @keydown="emitKeydown" :readonly="readonly" />
        <InputGroupAddon class="p-0">
            <i :class="`${iconright}`"></i>
        </InputGroupAddon>
    </InputGroup>
</template>
  
<script setup>
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
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
});
const emits = defineEmits();
const emitKeydown = (event) => {
    emits('keydown', event); // Emit the keydown event
}
const emitInput = (event) => {
    emits('input', event);
};
</script>
  


