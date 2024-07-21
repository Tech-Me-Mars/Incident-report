<script setup>

import axios from 'axios';
import * as dataApi from "./api/data.js";

const page = ref(1);
const list = ref([]);

const infiniteHandler = async($state) => {
  console.log($state);

  // Debugging: Log the payload and response
  const payload = {
    id: [],
    per_page: 20,
  };

  try {
    const res = await dataApi.getMessage(payload, 5);
    console.log('res.data',res.data.data);
    // Ensure res.data is an array
    if (Array.isArray(res.data.data)) {
      list.value.unshift(...res.data.data.reverse());
      $state.loaded();
    } else {
      console.error("Response data is not an array", res.data.data);
      $state.complete();
    }
  } catch (error) {
    console.error("Error fetching data", error);
    $state.complete();
  }
};
</script>

<template>
  <header>
    <!-- Hacker News header -->
  </header>
  <!-- <infinite-loading @infinite="infiniteHandler" direction="top"></infinite-loading> -->
  
  <div v-for="(item, $index) in list" :key="$index">
    {{ item }}
    <!-- Hacker News item loop -->
  </div>


</template>

<style>
html {
    scroll-behavior: smooth;
}

.scrollbar-w-2::-webkit-scrollbar {
    width: 0.25rem;
    height: 0.25rem;
}

.scrollbar-track-blue-lighter::-webkit-scrollbar-track {
    --bg-opacity: 1;
    background-color: #f7fafc;
    background-color: rgba(247, 250, 252, var(--bg-opacity));
}

.scrollbar-thumb-blue::-webkit-scrollbar-thumb {
    --bg-opacity: 1;
    background-color: #edf2f7;
    background-color: rgba(237, 242, 247, var(--bg-opacity));
}

.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
    border-radius: 0.25rem;
}
</style>