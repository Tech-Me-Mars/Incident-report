<template>
    <a-upload name="file" :file-list="model" :accept="accept" :list-type="listType" :multiple="multiple" :maxCount="maxCount"
        :before-upload="beforeUpload" @change="handleChange" @remove="handleRemove">
        <a-button>
            <upload-outlined></upload-outlined>
            เลือกไฟล์
        </a-button>
    </a-upload>
</template>
  
<script setup>
const model = defineModel()
const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: "",
    },
    accept: {
        type: String,
        default: "",
    },
    multiple: {
        type: Boolean,
        default: false
    }, maxCount: {
        type: Number,
        default: 99,
    },
    listType:{
        type: String,
        default: "text",   
    }
});

const handleRemove = file => {
    const index = model.value.indexOf(file);
    const newFileList = model.value.slice();
    newFileList.splice(index, 1);
    model.value = newFileList;
};

const beforeUpload = file => {
    model.value = [...(model.value || []), file];
    console.log('keepFileList', model.value)
    return false;
};

const emits = defineEmits();
const emitKeydown = (event) => {
    emits('change', event); // Emit the keydown event
}
const handleChange = (event) => {
    console.log(event)
    emits('change', event);
};

</script>
  


