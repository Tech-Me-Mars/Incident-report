<template>
    <a-list v-if="comments.length" :data-source="comments" item-layout="horizontal">
            <template #renderItem="{ item }">
                <a-list-item class="mb-2 p-0 p">
                    <a-comment class="card px-2  bg-warmgray w-full">
                        <template #author><a class="text-black text-sm">{{ item.author }}</a></template>
                        <template #avatar>
                            <TmmAvatar :label="item.author" :src="item.avatar" />
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
        <div class="bg-white w-full card">
            <TmmInputChat class="" />
        </div>

</template>
<script setup>

const comments = ref([
    {
        author: 'ลุงตู่',
        avatar: 'https://image.springnews.co.th/uploads/images/md/2023/07/NNeVIjbsPLYUbycg9rRo.webp?x-image-process=style/LG-webp',
        content: 'ขอแสดงความเสียใจผู้เสียชีวิตด้วยครับ',
        datetime: '1 ชั่วโมงที่แล้ว',
    },
    {
        author: 'ลุงตู่',
        avatar: 'https://image.springnews.co.th/uploads/images/md/2023/07/NNeVIjbsPLYUbycg9rRo.webp?x-image-process=style/LG-webp',
        content: 'ขอแสดงความเสียใจผู้เสียชีวิตด้วยครับ',
        datetime: '2 ชั่วโมงที่แล้ว',
    },
]);
</script>