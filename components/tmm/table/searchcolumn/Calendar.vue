<template>
    <Calendar v-model="model" showIcon placeholder="เลือกวันที่" class="w-full"
                :dateFormat="customDateFormat(model)" :minDate="minDate" showButtonBar mask="99/99/9999" />
                <!-- dateFormat="mm/dd/yy" -->
</template>
  
<script setup>
import { formatDate, customDateFormat } from '@/helpers/utility';
const model = defineModel()
const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: "mm/dd/yyyy",
    },
    minDate: {
        type: Date,
        default: null,
    },

});

const emits = defineEmits();
const emitKeydown = (event) => {
    emits('keydown', event); // Emit the keydown event
}


</script>
  


