<template>
<a-time-picker v-model="model" format="HH:mm" :class="`block ${className}`" :size="size" :placeholder="placeholder" :disabled="disabled" />
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
  


