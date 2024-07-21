<template>
    <InputText v-model="model" class="w-full p-column-filter" type="text"  :disabled="disabled" :placeholder="placeholder"
      @input="emitUpdateModelValue" @keydown="emitKeydown" />
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
        default: "ค้นหา...",
    },
    iconleft: {
        type: String,
        default: "",
    },
    iconright: {
        type: String,
        default: "",
    },
});

const emits = defineEmits();
const emitKeydown = (event) => {
    emits('keydown', event); // Emit the keydown event
}


</script>
  


