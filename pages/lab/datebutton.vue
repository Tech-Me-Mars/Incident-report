<template>
   
        <Calendar v-model="date" class="" view="month"  showIcon iconDisplay="input"  />
   
</template>




<script setup>

import { ref } from "vue";

const date = ref();
</script>