<template>



  </template>
  <script setup>
  const shareUrl = 'https://www.sanook.com/news/9389102/'

  const copyToClipboard = () => {
  navigator.clipboard.writeText(shareUrl).then(() => {
    
  }).catch(err => {
    console.error('Failed to copy: ', err)
  })
}
  </script>
  
  <style scoped>
  .social-share-button--facebook {
    /* ตัวอย่างการกำหนดสไตล์ */
    background-color: #3b5998;
    color: white;
  }
  .social-share-button--line {
    /* ตัวอย่างการกำหนดสไตล์ */
    background-color: #00c300;
    color: white;
  }

  
  </style>
  