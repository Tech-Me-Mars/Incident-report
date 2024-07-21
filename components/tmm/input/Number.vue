<template>
    <a-input-number 
        style="width: 100%" 
        :class="`${className}`" 
        v-model:value="model" 
        :disabled="disabled" 
        :status="errorStatus"
        :placeholder="placeholder" 
        :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')" 
        :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        @input="emitInput" 
        @keydown="emitKeydown" 
        :readonly="readonly" 
      
        :step="0.00"
    >
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
    },
    error: {
        type: String,
        default: "",
    }
});

const errorStatus = computed(() => {
    return props.error ? 'error' : ''; // ถ้ามี error ให้ส่งค่า 'error' มิฉะนั้นส่งค่าว่าง
});

const emits = defineEmits();
const emitKeydown = (event) => {
    emits('keydown', event); // Emit the keydown event
}
const emitInput = (event) => {
    emits('input', event);
};
</script>
