<template>
    <a-date-picker v-model:value="model" :class="`block ${className}`" :inputReadOnly="readonly" :size="size" :placeholder="placeholder"
        :disabled="disabled" :format="customDateFormat(model)" valueFormat='YYYY-MM-DD' :status="errorStatus"  />
     
</template>

<script setup>
import { customDateFormat } from '@/helpers/utility';
const model = defineModel()
const selectDate = ref(null);

// Computed property to format selected date
const formatDate = computed(() => {
    if (selectDate.value) {
        const dateObj = new Date(selectDate.value);
        return dateObj; // You can customize the format here
    }
    return null;
});

// Method to update selected date
const updateDate = (value) => {
    selectDate.value = value;
    const dateObj = new Date(selectDate.value);
    dateObj.toString(); // ทำไม?
    emits('update:modelValue', dateObj.toString()); // ส่งค่าในรูปแบบของ string
};

// Computed property to determine status based on error
const errorStatus = computed(() => {
    return props.error ? 'error' : ''; // ถ้ามี error ให้ส่งค่า 'error' มิฉะนั้นส่งค่าว่าง
});

const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
    readonly: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: "",
    },
    minDate: {
        type: Date,
        default: null,
    },
    className: {
        type: String,
        default: "",
    },
    size: {
        type: String,
        default: "default", //large default small
    },
    error: {
        type: String,
        default: "",
    }

});

const emits = defineEmits();
const emitKeydown = (event) => {
    emits('keydown', event); // Emit the keydown event
}
</script>