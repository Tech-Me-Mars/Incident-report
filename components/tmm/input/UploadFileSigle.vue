<template>
    <fwb-file-input v-model="model" type="file" :accept="accept" ref="fileInput" 
        placeholder="ระบุเอกสารอ้างอิง(pdf)" />
</template>
  
<script setup>
import { FwbFileInput } from 'flowbite-vue'
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
    accept:{
        type: String,
        default: "",
    }
});

const emits = defineEmits();
const emitKeydown = (event) => {
    emits('change', event); // Emit the keydown event
}


</script>
  


