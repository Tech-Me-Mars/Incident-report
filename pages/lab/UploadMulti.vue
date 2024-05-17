<template>
  <a-upload name="file" :file-list="model" :list-type="text" :multiple="true"
      :maxCount="maxCount" :before-upload="beforeUpload"  @remove="handleRemove" >
      <a-button>
          <upload-outlined></upload-outlined>
          เลือกไฟล์
      </a-button>
  </a-upload>
</template>

<script setup>
const model = defineModel()

const errorStatus = computed(() => {
  return props.error ? 'error' : ''; // ถ้ามี error ให้ส่งค่า 'error' มิฉะนั้นส่งค่าว่าง
});

const handleRemove = file => {
  const index = model.value.indexOf(file);
  const newFileList = model.value.slice();
  newFileList.splice(index, 1);
  model.value = newFileList;
};

const beforeUpload = file => {
  if (model.value.length < props.maxCount) {
      model.value = [...(model.value || []), file];
      console.log('keepFileList', model.value);
      return false;
  } else {
      console.log('Exceeds maxCount');
      return false; // Prevent file from being uploaded
  }
};

const emits = defineEmits();
const emitKeydown = (event) => {
  emits('change', event); // Emit the keydown event
}
const handleChange = (info) => {
  let resFileList = [...info.fileList];
  // 2. read from response and show file link
  resFileList = resFileList.map(file => {
      if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
      }
      return file;
  });
  model.value = resFileList;
  emits('change', info);
};

</script>
