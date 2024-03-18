<template>
    <a-upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      :multiple="true"
      :file-list="fileList"
      @change="handleChange"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        Upload
      </a-button>
    </a-upload>
  </template>
  <script setup>
  import { ref } from 'vue';
  const fileList = ref([
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png',
    },
  ]);
  const handleChange = info => {
    let resFileList = [...info.fileList];
  
    // 1. Limit the number of uploaded files
    //    Only to show two recent uploaded files, and old ones will be replaced by the new
    resFileList = resFileList.slice(-2);
  
    // 2. read from response and show file link
    resFileList = resFileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    fileList.value = resFileList;
  };
  </script>