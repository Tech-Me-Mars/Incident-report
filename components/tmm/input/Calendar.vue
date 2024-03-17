<template>
    <!-- <Calendar v-model="model" showIcon :placeholder="placeholder" :class="`${className}`" :dateFormat="customDateFormat(model)"
        :minDate="minDate" showButtonBar  /> -->
        <a-date-picker  v-model:value="selectDate" :class="`block ${className}`"  :size="size" :placeholder="placeholder" :disabled="disabled" 
        :format="customDateFormat(selectDate)" @change="updateDate"/>
      
</template>
  
<script setup>
import { customDateFormat } from '@/helpers/utility';
// const model = defineModel()
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
        dateObj.toString();
    emits('update:modelValue', formatDate.value);
};


const props = defineProps({
    disabled: {
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
    className:{
        type: String,
        default: "",
    },
    size:{
        type: String,
        default: "default", //large default small
    }

});

const emits = defineEmits();
const emitKeydown = (event) => {
    emits('keydown', event); // Emit the keydown event
}


</script>
  


