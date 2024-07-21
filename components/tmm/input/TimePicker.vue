<template>
<!-- <a-time-picker v-model="model" value-format="HH:mm" format="HH:mm" :class="`block ${className}`" :size="size" :placeholder="placeholder" :disabled="disabled" /> -->
<a-time-picker v-model:value="model" valueFormat="HH:mm" inputReadOnly format="HH:mm" :class="` block ${className}`" :size="size" :placeholder="placeholder" :disabled="disabled"
:status="errorStatus" />
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
    },
    error: {
        type: String,
        default: "",
    },
    readonly:{
        type: Boolean,
        default: false,
    }

});

const errorStatus = computed(() => {
    return props.error ? 'error' : ''; // ถ้ามี error ให้ส่งค่า 'error' มิฉะนั้นส่งค่าว่าง
});

const emits = defineEmits();
const emitKeydown = (event) => {
    emits('keydown', event); // Emit the keydown event
}


</script>
  


