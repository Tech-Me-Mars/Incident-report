<template>
    <span class="text-xs text-red-500">
     {{ errors }}
    </span>
  </template>
  
  <script>
  export default {
    name: "TextValidator",
    props: {
      errors: String,
    },
  };
  </script>