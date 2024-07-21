<template>
    <a-input :class="`${className}`" v-model:value="model" :disabled="disabled" :placeholder="placeholder"
        @input="emitInput" @keydown="emitKeydown" :readonly="readonly" :status="errorStatus">
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
    let formattedNumber = event.target.value.replace(/\D/g, '');

    // ตรวจสอบว่าหมายเลขโทรศัพท์ยาวเกินไปหรือไม่
    if (formattedNumber.length > 10) {
        formattedNumber = formattedNumber.slice(0, 10);
    }

    // จัดรูปแบบหมายเลขโทรศัพท์ให้สมบูรณ์ (e.g., (123) 456-7890)
    let formatted = '';
    if (formattedNumber.length > 0) {
        formatted = '(' + formattedNumber.slice(0, 3);
    }
    if (formattedNumber.length > 3) {
        formatted += ') ' + formattedNumber.slice(3, 6);
    }
    if (formattedNumber.length > 6) {
        formatted += '-' + formattedNumber.slice(6, 10);
    }

    model.value = formatted;

    emits('input', event);
};
</script>
