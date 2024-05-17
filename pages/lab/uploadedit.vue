<template>

      <a-upload
        v-model:file-list="fileList"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        list-type="picture-card"
        @preview="handlePreview"
        @remove="handleRemove"
        :custom-request="customRequest"
      >
        <div v-if="fileList.length < 8">
          <plus-outlined />
          <div style="margin-top: 8px">Upload</div>
        </div>
      </a-upload>
      <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
  
  </template>
  <script setup>
  import { ref } from 'vue';
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  const previewVisible = ref(false);
  const previewImage = ref('');
  const previewTitle = ref('');
  const fileList = ref([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      customname:"custom",
      url: 'https://api_incident_report.tech-me-mars.com/storage/image_detail/2_1711648407.jpg',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-xxx',
      percent: 50,
      name: 'image.png',
      status: 'uploading',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error',
    },
  ]);
  const handleCancel = () => {
    console.log('ซ่อน')
    previewVisible.value = false;
    previewTitle.value = '';
  };
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    previewImage.value = file.url || file.preview;
    previewVisible.value = true;
    previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
  };
  const handleRemove = (e) =>{
    console.log(e)
  }

  const customRequest = ({ action, file, headers, onSuccess, onError }) => {
    console.log('เข้าส')
  // const formData = new FormData();
  // formData.append('file', file);
  // fetch(action, {
  //   method: 'POST',
  //   headers,
  //   body: formData,
  // })
  //   .then(response => response.json())
  //   .then(result => {
  //     onSuccess(result, file);
  //   })
  //   .catch(error => {
  //     onError(error, file);
  //   });
};
  </script>
  <style scoped>
  /* you can make up upload button and sample style by using stylesheets */
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }
  
  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
  </style>