<template>
    <span class="label-form-error">
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