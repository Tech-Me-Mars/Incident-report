<!-- Dropdown.vue -->
<template>
    <a-select
    allowClear
    autoClearSearchValue
      :show-search="search"
      :status="errorStatus"
      :class="` ${className}`"
      v-model:value="model"

      :placeholder="placeholder"
      :options="options"
      :filter-option="filterOption"
      :field-names="{ label: label, value: value }"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    ></a-select>
</template>
  
<script setup>
import { ref, defineProps, defineEmits } from 'vue';
const model = defineModel()
//  [ เขียนวิธี1 รับค่าตามตำแหน่ง ที่define]
// const { filter, autoFilterFocus, options, optionLabel, optionValue, placeholder, class: dropdownClass, customSlot } = defineProps([
//   'filter',
//   'autoFilterFocus',
//   'options',
//   'optionLabel',
//   'optionValue',
//   'placeholder',
//   'class',
//   'customSlot'
// ]);
//    [เขียน วิธี2]
const props = defineProps({
  filter: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: '',
  },
  value: {
    type: [String,Number],
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  className: {
    type: String,
    default: "",
  },
  search:{
    type: Boolean,
    default: true,
  },
  error: {
        type: String,
        default: "",
    }
});
const errorStatus = computed(() => {
    return props.error ? 'error' : ''; // ถ้ามี error ให้ส่งค่า 'error' มิฉะนั้นส่งค่าว่าง
});

const emits = defineEmits();
// const handleChange = value => {
//   console.log(`selected ${value}`);
// };
const handleChange = (event) => {
  emits('change', event);
};
const handleBlur = () => {
  console.log('blur');
};
const handleFocus = () => {
  console.log('focus');
};
const filterOption = (input, option) => {
  return option[props.label].toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

// const handleChange = (event) => {
//   emits('change', event);
// };
</script>
  