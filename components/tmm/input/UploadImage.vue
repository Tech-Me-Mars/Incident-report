<template>
    <!-- <a-upload name="file" :file-list="model" :list-type="listType" :multiple="multiple" :max-count="maxCount"
        :before-upload="beforeUpload" @change="handleChange" @remove="handleRemove">


        <a-button>
            <upload-outlined></upload-outlined>
            เลือกไฟล์
        </a-button>
    </a-upload> -->

    <div class="clearfix">
        <a-upload  accept="image/*" v-model:file-list="model" multiple name="file" @change="handleChange" :before-upload="beforeUpload">
            <TmmIcon icon="mdi mdi-image-outline text-gray-500 flex items-center cursor-pointer" style="font-size: 20px;" />
            <template #itemRender="{ file, actions }">
            </template>
        </a-upload>
    </div>
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
    listType: {
        type: String,
        default: "picture-card",   //support for three types: text, picture or picture-card
    }
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
const handleChange = (event) => {
    console.log(event)
    emits('change', event);
};
// *************************************New**********************************
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

const handleCancel = () => {
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