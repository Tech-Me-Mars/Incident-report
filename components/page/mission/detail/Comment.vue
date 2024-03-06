<script setup>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
const value = ref('');
const comments = ref([
    {
        author: 'ลุงตู่',
        avatar: 'https://image.springnews.co.th/uploads/images/md/2023/07/NNeVIjbsPLYUbycg9rRo.webp?x-image-process=style/LG-webp',
        content: 'ตอนนี้แก้ปัญญาได้แล้วครับ คาดว่าจะเสร็จภายใน 2-3 วันครับ',
        datetime: '15 ชั่วโมงที่แล้ว',
    },
    {
        author: 'ลุงตู่',
        avatar: 'https://image.springnews.co.th/uploads/images/md/2023/07/NNeVIjbsPLYUbycg9rRo.webp?x-image-process=style/LG-webp',
        content: 'เกิดปัญหานิดหน่อยครับ อาจเกิดความล่าช้าเล็กน้อย',
        datetime: '2 ชั่วโมงที่แล้ว',
    },
]);
const submitting = ref(false);
const handleSubmit = () => {
    if (!value.value) {
        return;
    }
    submitting.value = true;
    setTimeout(() => {
        submitting.value = false;
        comments.value = [
            {
                author: 'ลูงตู่',
                avatar: 'https://image.springnews.co.th/uploads/images/md/2023/07/NNeVIjbsPLYUbycg9rRo.webp?x-image-process=style/LG-webp',
                content: value.value,
                datetime: dayjs().fromNow(),
            },
            ...comments.value,
        ];
        value.value = '';
    }, 1000);
};
const fileArray =ref([])

const listImage = [
    'https://www.tcc.or.th/wp-content/uploads/2022/04/19042022_TCCNews_Accident_website-1200x675.png',
    'https://image.posttoday.com/uploads/images/md/2023/09/K6LgsMkOwMLyKVbF1kIu.webp?x-image-process=style/lg',
    'https://mpics.mgronline.com/pics/Images/566000003905501.JPEG',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/September_26%2C_2007_accident%2C_highway_9%2C_CT%2C_flipped_truck.jpg/1200px-September_26%2C_2007_accident%2C_highway_9%2C_CT%2C_flipped_truck.jpg',
    'https://mpics.mgronline.com/pics/Images/566000003905501.JPEG',
    'https://mpics.mgronline.com/pics/Images/566000003905501.JPEG',
    'https://mpics.mgronline.com/pics/Images/566000003905501.JPEG',
]
const checkType = ref(1);
</script>

<template>
    <div class="p-3">
        <a-list v-if="comments.length" :data-source="comments" item-layout="horizontal">
            <template #renderItem="{ item }">
                <a-list-item class="mb-2 p-0 p">
                    <a-comment class=" card px-2  bg-gray-100 w-full">
                        <template #author><a class="text-black text-sm">{{ item.author }}</a></template>

                        <template #avatar>
                            <TmmAvatar label="ลุงตู่" :src="item.avatar" />
                        </template>
                        <template #content>
                            <p class="text-gray-500 text-xs">
                                {{ item.content }}
                            </p>
                            <div class="overflow-x-auto overflow-y-auto  whitespace-nowrap ">
                                <a-image-preview-group class="">
                                    <a-image v-for="(item, index) in listImage" :key="index" :width="70" :height="70"
                                        class="rounded-lg p-1" :src="item" />
                                </a-image-preview-group>
                            </div>
                        </template>
                        <template #datetime>
                            <span class="text-gray-600">{{ item.datetime }}</span>
                        </template>
                    </a-comment>
                </a-list-item>
            </template>
        </a-list>
    </div>

    <!-- <p class="" v-html="value" style="white-space: pre-wrap; word-wrap: break-word;"></p> -->
    <TmmDisplayUploadImage v-model="fileArray" />
    
    <div class=" bg-white py-2 gap-2">
        <div class="flex justify-center mb-2">
            <TmmInputRadio label="กิจกรรม" :value="1" v-model="checkType" />
            <TmmInputRadio label="ค่าใช้จ่าย" :value="2" v-model="checkType" />
        </div>
        <div class="flex gap-2">
            <TmmInputUploadImage multiple v-model="fileArray" />
            <TmmInputTextarea allow-clear className="rounded-xl bg-gray-100" :autoSize="{ minRows: 1, maxRows: 2 }"
                placeholder="แสดงความคิดเห็น..." v-model="value" :rows="1" />
            <TmmIcon @click="handleSubmit"
                icon="mdi mdi-send text-blue-700 text-2xl flex items-center cursor-pointer" />
        </div>

    </div>
</template>
