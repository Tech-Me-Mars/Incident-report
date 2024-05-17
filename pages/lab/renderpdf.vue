<script setup>
const pdfSection = ref(null)
</script>
<template>
  <div>
    <div ref="pdfSection">
      Thanks for testing out nuxt-pdf!
    </div>
    <button @click="exportToPDF('my-pdf-file.pdf', pdfSection)">
      print card
    </button>
  </div>
</template>