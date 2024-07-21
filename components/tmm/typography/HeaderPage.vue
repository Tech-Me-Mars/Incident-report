<template>
     <div class="">
    <span class="header-menu">{{ headerMenu }}</span>
  </div>
</template>

<script>
export default {
  name: "HeaderPage",
  props: {
    headerMenu: String,
  },
};
</script>