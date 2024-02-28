<template>
  <a-select
    ref="select"
    v-model:value="value"
    style="width: 120px"
    :options="options"
    :field-names="{ label: 'name', value: 'id', options: 'children' }"
    @focus="focus"
    @change="handleChange"
  ></a-select>
</template>
<script setup>
import { ref } from 'vue';
const value = ref('lucy');
const options = ref([
  {
    id: 1,
    name: 'Jack',
  },
  {
    id: 2,
    name: 'Lucy',
  },
  {
    id: 2,
    name: 'Disabled',
    disabled: true,
  },
  {
    id: 3,
    name: 'Yiminghe',
  },
]);
const focus = () => {
  console.log('focus');
};
const handleChange = value => {
  console.log(`selected ${value}`);
};
</script>