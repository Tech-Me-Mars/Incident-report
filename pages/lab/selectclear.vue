<template>
  <h2 style="margin-top: 10px">use options (recommend)</h2>
  <a-space>
    <a-select
    allowClear
    autoClearSearchValue
      ref="select"
      v-model:value="value1"
      style="width: 120px"
      :options="options1"
      @focus="focus"
      @change="handleChange"
    ></a-select>
  </a-space>
</template>
<script setup>
import { ref } from 'vue';
const value1 = ref('lucy');
const value2 = ref('lucy');
const value3 = ref('lucy');
const options1 = ref([
  {
    value: 'jack',
    label: 'Jack',
  },
  {
    value: 'lucy',
    label: 'Lucy',
  },
  {
    value: 'disabled',
    label: 'Disabled',
    disabled: true,
  },
  {
    value: 'yiminghe',
    label: 'Yiminghe',
  },
]);
const options2 = ref([
  {
    value: 'lucy',
    label: 'Lucy',
  },
]);
const options3 = ref([
  {
    value: 'lucy',
    label: 'Lucy',
  },
]);
const focus = () => {
  console.log('focus');
};
const handleChange = value => {
  console.log(`selected ${value}`);
};
</script>