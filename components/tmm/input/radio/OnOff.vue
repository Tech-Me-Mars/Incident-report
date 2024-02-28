<!-- InputSearch.vue -->

<template>
    <div class="flex flex-wrap gap-3">
        <div class="flex items-center">
            <RadioButton v-model="model" inputId="on" name="เปิด" :value="one" />
            <label class="ml-2">เปิด</label>
        </div>
        <div class="flex items-center">
            <RadioButton v-model="model" inputId="off" name="ปิด" :value="zero" />
            <label class="ml-2">ปิด</label>
        </div>
    </div>
</template>
      
<script setup>
const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
});


const model = defineModel()
const one = 1
const zero = 0
const emits = defineEmits();
const emitKeydown = (event) => {
    emits('keydown', event); // Emit the keydown event
}



</script>
      