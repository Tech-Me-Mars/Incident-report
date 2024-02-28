<template>
    <!-- <Calendar v-model="model" showIcon :placeholder="placeholder" :class="`${className}`" :dateFormat="customDateFormat(model)"
        :minDate="minDate" showButtonBar  /> -->
        <a-date-picker  v-model:value="model" :class="`block ${className}`"  :size="size" :placeholder="placeholder" :disabled="disabled" :format="customDateFormat(model)"/>
</template>
  
<script setup>
import { customDateFormat } from '@/helpers/utility';
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
  


