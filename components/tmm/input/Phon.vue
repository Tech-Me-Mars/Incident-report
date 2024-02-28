<template>
    <InputGroup>
        <InputGroupAddon class="p-0" v-if="iconleft">
            <i :class="`${iconleft}`"></i>
        </InputGroupAddon>
        <InputMask :class="`${className}`" :mask="mask" v-model="model" :disabled="disabled" :placeholder="placeholder" @input="emitInput"
            @keydown="emitKeydown"  :readonly="readonly" />
        <InputGroupAddon class="p-0" v-if="iconright">
            <i :class="`${iconright}`"></i>
        </InputGroupAddon>
    </InputGroup>
</template>
  
<script setup>
import InputMask from 'primevue/inputmask';
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
        default: "(999) 999-9999",
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
    className:{
        type: String,
        default: "",
    },
    type:{
        type: String,
        default: "text",
    },
    mask:{
        type: String,
        default: "(999) 999-9999",
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
  


