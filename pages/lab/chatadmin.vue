<template>
    <div >
    <button @click="toggleChatbox" class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Chat with Admin Bot
    </button>
  </div>
  <div v-if="isChatboxOpen" class="">
    <div class="bg-white shadow-md rounded-lg max-w-lg w-full">
        <div class="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
            <p class="text-lg font-semibold">Admin Bot</p>
            <button @click="toggleChatbox" class="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
        <div class="p-4 h-80 overflow-y-auto" ref="chatbox">
          <div v-for="message in messages" :key="message.id" :class="message.isUser ? 'text-right' : ''" class="mb-2">
            <p :class="message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700' + ' rounded-lg py-2 px-4 inline-block'">{{ message.text }}</p>
          </div>
        </div>
        <div class="p-4 border-t flex">
            <input v-model="userInput" @keyup.enter="sendMessage" type="text" placeholder="Type a message" class="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <button @click="sendMessage" class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300">Send</button>
        </div>
    </div>
  </div>

</template>


<script setup>
 const isChatboxOpen = ref(false);
    const userInput = ref('');
    const chatbox = ref(null);
    const messages = reactive([
      { id: 1, text: 'hello', isUser: true },
      { id: 2, text: 'This is a response from the chatbot.', isUser: false },
      { id: 3, text: 'this example of chat', isUser: true },
      { id: 4, text: 'This is a response from the chatbot.', isUser: false },
      { id: 5, text: 'design with tailwind', isUser: true },
      { id: 6, text: 'This is a response from the chatbot.', isUser: false }
    ]);

    const toggleChatbox = () => {
      isChatboxOpen.value = !isChatboxOpen.value;
    };

    const sendMessage = () => {
      if (userInput.value.trim() !== '') {
        messages.push({ id: Date.now(), text: userInput.value, isUser: true });
        userInput.value = '';
        respondToUser();
      }
    };

    const respondToUser = () => {
      setTimeout(() => {
        messages.push({ id: Date.now(), text: 'This is a response from the chatbot.', isUser: false });
        nextTick(() => {
          chatbox.value.scrollTop = chatbox.value.scrollHeight;
        });
      }, 500);
    };

    onMounted(() => {
      toggleChatbox();
    });
    </script>