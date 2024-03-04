<template>
  <div class="clearfix">
    <a-upload name="file" :file-list="fileList" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" listType="text" multiple :before-upload="beforeUpload" @remove="handleRemove">
      <a-button>
        <upload-outlined></upload-outlined>
        เลือกไฟล์
      </a-button>
    </a-upload>


    <a-button type="primary" :disabled="fileList.length === 0" :loading="uploading" style="margin-top: 16px"
      @click="handleUpload">
      {{ uploading ? 'Uploading' : 'Start Upload' }}
    </a-button>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
const fileList = ref([]);
const uploading = ref(false);
const handleRemove = file => {
  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
};
const beforeUpload = file => {
  fileList.value = [...(fileList.value || []), file];
  console.log('keepFileList', fileList.value)
  return false;
};
const handleUpload = () => {
  const formData = new FormData();
  fileList.value.forEach(file => {
    formData.append("plan_file", file, file.name);
    // formData.append("plan_file[]", file, file.name);
  });
  formData.append("name", 'amm');
  // for (var pair of formData.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }
  console.log([...formData])

  // const formData = new FormData();
  // fileList.value.forEach((file) => {
  //   console.log(file)
  //   formData.append("plan_file", file, file.name);
  //   console.log(formData)
  // });

  console.log(formData)
  // uploading.value = true;

  // You can use any AJAX library you like

};
</script>