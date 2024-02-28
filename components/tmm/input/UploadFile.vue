<template>
    <!-- <fwb-file-input v-model="model" type="file" :accept="accept" ref="fileInput" :multiple="multiple"
        :placeholder="placeholder" /> -->
    <a-upload v-model:file-list="model" name="file" :multiple="multiple" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :max-count="maxCount" @change="handleChange"
        >
        <a-button>
            <upload-outlined></upload-outlined>
            Click to Upload
        </a-button>
    </a-upload>
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
    accept: {
        type: String,
        default: "",
    },
    multiple: {
        type: Boolean,
        default: false
    },maxCount:{
        type: Number,
        default: 99,
    }
});

const emits = defineEmits();
const emitKeydown = (event) => {
    emits('change', event); // Emit the keydown event
}
const handleChange = (event) => {
  console.log(event)
  emits('change', event);
};

</script>
  


