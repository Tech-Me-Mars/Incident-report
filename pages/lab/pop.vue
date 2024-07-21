<template>
 <div class="fixed  bottom-0 left-0 w-full bg-white shadow-lg">
    <a-mentions
      v-model:value="value"
      autofocus
      :options="optionsSelect"
      @select="onSelect"
    >
    <template #options="{ option }">
        <a-mentions-option :value="option.value" :label="option.label">
          <template #default="{ label }">
            <span>{{ label }}</span>
            <img v-if="option.avatar" :src="option.avatar" alt="Avatar" class="!w-[5rem]" style="width: 24px; height: 24px; border-radius: 50%;">
          </template>
        </a-mentions-option>
      </template>
    </a-mentions>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})
import { ref } from 'vue';

const value = ref('');
const optionsSelect = [
  {
    value: 'afc163',
    label: 'afc163',
    avatar: 'https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5LBaMoaHTWKxKO1qCNkWtfOAj9crheXln1QOqApIGOoGbESLJAa.jpg' // เพิ่ม avatar ในตัวเลือก
  },
  {
    value: 'zombieJ',
    label: 'zombieJ',
    avatar: 'https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5LBaMoaHTWKxKO1qCNkWtfOAj9crheXln1QOqApIGOoGbESLJAa.jpg' // เพิ่ม avatar ในตัวเลือก
  },
  {
    value: 'yesmeck',
    label: 'yesmeck',
    avatar: 'https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5LBaMoaHTWKxKO1qCNkWtfOAj9crheXln1QOqApIGOoGbESLJAa.jpg' // เพิ่ม avatar ในตัวเลือก
  },
];

const onSelect = (option, prefix) => {
  console.log(`Selected option: ${option.label}`);
};
</script>

<style>
.ant-mentions-dropdown {
  position: fixed !important; /* Fixed position */
  left: 50% !important; /* Center horizontally */
  transform: translateX(-50%) !important; /* Center horizontally */
  bottom: 55px !important; /* Position from the bottom */
  width: 100% !important; /* Set width as needed */
  height: 20rem !important; /* Fixed height */
  /* border: 3px solid #0280bb !important; */
  /* background-color: rgb(255, 255, 255) !important; */
  z-index: 1000 !important; /* Ensure it's above other elements */
}


</style>