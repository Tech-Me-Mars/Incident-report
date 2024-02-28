<!-- InputSearch.vue -->

<template>
    <div class="flex flex-wrap gap-3">
        <div class="flex items-center">
            <RadioButton v-model="model" inputId="on" name="ชาย" value="ชาย" />
            <label class="ml-2">ชาย</label>
        </div>
        <div class="flex items-center">
            <RadioButton v-model="model" inputId="off" name="หญิง" value="หญิง" />
            <label class="ml-2">หญิง</label>
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
      