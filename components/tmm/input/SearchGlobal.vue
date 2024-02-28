<!-- InputSearch.vue -->

<template>
  <span class="p-input-icon-left">
                <i class="pi pi-search" />
    <InputText v-model="model" :placeholder="placeholder" :disabled="disabled" @input="emitUpdateModelValue" @keydown="emitKeydown" />
  </span>
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
const emitUpdateModelValue = (event) => {
    emits('input', event);

};


</script>
