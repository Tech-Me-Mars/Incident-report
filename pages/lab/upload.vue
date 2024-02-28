<template>
  <div class="clearfix">
    <a-upload :file-list="fileList" :before-upload="beforeUpload" @remove="handleRemove">
      <a-button>
        <upload-outlined></upload-outlined>
        Select File
      </a-button>
    </a-upload>
    <a-button
      type="primary"
      :disabled="fileList.length === 0"
      :loading="uploading"
      style="margin-top: 16px"
      @click="handleUpload"
    >
      {{ uploading ? 'Uploading' : 'Start Upload' }}
    </a-button>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
const fileList = ref([]);
const keepFileList = ref([])
const uploading = ref(false);
const handleRemove = file => {
  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
};
const beforeUpload = file => {
  fileList.value = [...(fileList.value || []), file];
  console.log('beforeUpload')
  keepFileList.value = Array.from(file.fileList);
  console.log('keepFileList',keepFileList.value)
  
  
  return false;
};
const handleUpload = () => {
  const formData = new FormData();
  fileList.value.forEach((file) => {
    console.log(file)
    formData.append("plan_file", file, file.name);
    console.log(formData)
  });
  
  // const formData = new FormData();
  // keepFileList.value.forEach(file => {
  //   formData.append('files[]', file);
  // });
  console.log(formData)
  uploading.value = true;

  // You can use any AJAX library you like

};
</script>