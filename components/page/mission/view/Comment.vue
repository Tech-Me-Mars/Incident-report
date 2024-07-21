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
    <div class="flex items-end bg-white py-2 gap-2">
        <TmmIcon icon="mdi mdi-image-outline text-gray-500 text-2xl flex items-center cursor-pointer" />
        <TmmInputTextarea allow-clear className="rounded-xl bg-gray-100" :autoSize="{ minRows: 1, maxRows: 2 }" placeholder="แสดงความคิดเห็น..."
            v-model="value" :rows="1" />
        <TmmIcon @click="handleSubmit" icon="mdi mdi-send text-blue-700 text-2xl flex items-center cursor-pointer" />
    </div>
</template>
