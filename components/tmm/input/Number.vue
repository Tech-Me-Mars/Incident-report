<template>
    <a-input-number :class="`w-full ${className}`" v-model:value="model" :disabled="disabled" :placeholder="placeholder"
    :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
      :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        @input="emitInput" @keydown="emitKeydown" :readonly="readonly">
        <template #prefix v-if="iconleft">
            <i :class="`${iconleft}`"></i>
        </template>
        <template #suffix v-if="iconright">
            <i :class="`${iconright}`"></i>
        </template>
    </a-input-number>
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
  


