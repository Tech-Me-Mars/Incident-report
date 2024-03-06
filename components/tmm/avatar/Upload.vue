<template>
    <!-- <a-upload name="file" :file-list="model" :list-type="listType" :multiple="multiple" :max-count="maxCount"
        :before-upload="beforeUpload" @change="handleChange" @remove="handleRemove">
        <a-button>
            <upload-outlined></upload-outlined>
            เลือกไฟล์
        </a-button>
    </a-upload> -->
    <a-upload v-model:file-list="model" name="avatar" list-type="picture-card" class="avatar-uploader"
        :show-upload-list="false" :before-upload="beforeUpload" @change="handleChange">
        <img v-if="imageUrl" :src="imageUrl" alt="avatar" class="w-full h-full rounded-xl" />
        <div v-else>
            <loading-outlined v-if="loading"></loading-outlined>
            <!-- <plus-outlined v-else></plus-outlined> -->
            <CameraOutlined v-else></CameraOutlined>
            <div class="ant-upload-text text-xs">เลือกรูปโปรไฟล์</div>
        </div>
    </a-upload>

</template>

<script setup>
import { message } from 'ant-design-vue';
import { fi } from 'date-fns/locale';
const emits = defineEmits();
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
    listType: {
        type: String,
        default: "text",
    }
});

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const loading = ref(false);
const imageUrl = ref('');
const handleChange = info => {
    if (info.file.status === 'uploading') {
        loading.value = true;
        return;
    }
    if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, base64Url => {
            imageUrl.value = base64Url;
            loading.value = false;
        });
    }
    if (info.file.status === 'error') {
        loading.value = false;
        message.error('upload error');
    }
    console.log(event)
    emits('change', event);
};
const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    // console.log('model',model.value)
    console.log('file',file)
    // model.value = file;
    model.value = [...(model.value || []), file];
    // console.log('model.value',model.value[0])
    return isJpgOrPng && isLt2M;
};

// const handleRemove = file => {
//     const index = model.value.indexOf(file);
//     const newFileList = model.value.slice();
//     newFileList.splice(index, 1);
//     model.value = newFileList;
// };


const emitKeydown = (event) => {
    emits('change', event); // Emit the keydown event
}
</script>
<style>
.ant-upload {
    /* border-radius: 9999px !important; */
    border-radius: 0.75rem/* 12px */ !important;
}

.avatar-uploader>.ant-upload {
    width: 128px;
    height: 128px;
}

.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}
</style>