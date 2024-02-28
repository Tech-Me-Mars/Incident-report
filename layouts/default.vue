<template>
  <div class="min-h-screen bg-zinc-50 pb-16">
    
    <!-- <Header class="max-w-4xl mx-auto"/> -->
    <div class=" max-w-4xl mx-auto">
    <slot class="" />
  </div>
  <Navigation />
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