<template>
    <i :class="`${icon} ${rounded ? 'rounded-full' : ''}`"></i>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      required: true,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "sm"
    },
    rounded: {
      type: Boolean,
      default: false
    },
    bgColor: {
      type: String,
      default: ""
    },
    textColor: {
      type: String,
      default: ""
    }
  });
  </script>