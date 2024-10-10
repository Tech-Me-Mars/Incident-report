<template>
    <div class="flex flex-col h-screen">
      <!-- Header -->
      <header class="bg-blue-500 text-white p-4 flex items-center justify-center h-[10%]">
        <h1 class="text-xl">Chat Header</h1>
      </header>
  
      <!-- Chat Name Box -->
      <div class="bg-gray-200 p-4 flex items-center justify-center h-[10%]">
        <h2 class="text-lg">Chat Name</h2>
      </div>
  
      <!-- Chat Box (Messages) -->
      <div class="bg-white p-4 h-[70%] overflow-y-auto" id="chat-container">
        <!-- Example chat messages -->
        <div v-for="(message, index) in messages" :key="index" class="mb-2">
          <p class="bg-gray-100 p-2 rounded-md">{{ message }}</p>
        </div>
      </div>
  
      <!-- Footer (Chat Input) -->
      <footer class="bg-gray-300 p-4 h-[10%]">
        <div class="flex">
          <input
            type="text"
            placeholder="Type a message..."
            class="flex-grow p-2 border border-gray-400 rounded-md"
          />
          <button class="ml-2 bg-blue-500 text-white p-2 rounded-md">Send</button>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup>
definePageMeta({
  layout: false
})
  import { ref } from 'vue';
  
  // Example message data
  const messages = ref([
    'Hello!',
    'How are you?',
    'This is a sample message.',
    'More messages...',
    'Even more messages...',
    'A lot of chat messages...',
    // Add more messages to test scrolling
    'Testing scroll...',
    'Keep going...',
    'Almost there...',
    'One more...',
    'Hello!',
    'How are you?',
    'This is a sample message.',
    'More messages...',
    'Even more messages...',
    'A lot of chat messages...',
    // Add more messages to test scrolling
    'Testing scroll...',
    'Keep going...',
    'Almost there...',
    'One more...',
    'Hello!',
    'How are you?',
    'This is a sample message.',
    'More messages...',
    'Even more messages...',
    'A lot of chat messages...',
    // Add more messages to test scrolling
    'Testing scroll...',
    'Keep going...',
    'Almost there...',
    'One more...'
  ]);
  </script>
  
  <style>
    /* คุณสามารถเพิ่ม custom styles ได้ที่นี่ถ้าต้องการ */
  </style>
  