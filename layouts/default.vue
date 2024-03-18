<template>
  <div class=" bg-zinc-50 pb-14">

    <!-- <Header class="max-w-4xl mx-auto"/> -->
    <div class="max-w-4xl mx-auto bg-white min-h-screen">
      <slot class="" />
      <Navigation />
    </div>
    <!-- <div class="">
    
  </div> -->

  </div>
</template>

<script setup>
import Header from '@/layouts/header.vue'
import Navigation from '@/layouts/buttomnavigation'
</script>

<style>
.p-inputtext {
  height: 2.4rem;
}
</style>