<template>
    <div>
        <a-popover v-model:open="visible" title="Title" trigger="click">
    <template #content>
      <a @click="hide">Close</a>
    </template>
    <a-button type="primary">Click me</a-button>
  </a-popover>


      <button class="bg-red-500" @mousedown="mousedown" @mouseup="mouseup" @mouseleave="mouseup">
        Hold to increment
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const visible = ref(true);
const hide = () => {
  visible.value = false;
};


  const count = ref(0);
  let timeout = null;
  
  const increment = () => {
    count.value += 1;
  };
  
  const mousedown = () => {
    timeout = setTimeout(()=>{
        increment()
    }, 1000); // Increment the count after 1 second
  };
  
  const mouseup = () => {
    clearTimeout(timeout);
  };
  </script>
  