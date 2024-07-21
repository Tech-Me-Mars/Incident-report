<template>
    <HeaderMainProfile />
    <section class="p-3">
        <HeaderMenu class="flex justify-between">
            <p class="header-title-page">NEWS</p>
        </HeaderMenu>
        <TmmCard class="mb-2 card" v-for="(item, index) in resPosts" :key="index">
            <template #header>
                <DeferredContent v-if="(index + 1) == lastPost" class="" @load="appendDataPost()">
                </DeferredContent>

                <!-- <NuxtLink :to="`/news/post/${item.id}`"> -->
                    <div class="flex gap-2">
                        <div class=" flex items-start gap-2">
                            <TmmAvatar :label="item?.inquiry_employee_fullname" class="!w-[2.5rem]" :size="40"
                                :src="item?.inquiry_employee_avatar">
                            </TmmAvatar>
                        </div>
                        <div class="w-10/12 flex flex-col flex-shrink min-w-0">
                            <p class="font-semibold text-sm">{{ item?.inquiry_employee_fullname }}</p>
                            <TmmLabelSmall class="text-gray-400 text-xs"
                                :label="`${formattedDateBuddha(item?.created_at)}`" />
                        </div>
                    </div>
                <!-- </NuxtLink> -->


            </template>
            <template #body>
                <NuxtLink :to="`/news/post/${item.id}`">
                <p class="font-bold text-sm line-clamp-1 mt-2">{{ item.title }}</p>
            </NuxtLink>
                <p class="leading-normal text-gray-700 pb-3 text-xs">
                    <span v-html="item.detail" :class="{ 'line-clamp-3': !item.showMore }"></span>
                    <span @click="item.showMore = !item.showMore" v-show="!item.showMore"
                        class="mt-4 text-gray-400 focus:outline-none cursor-pointer">...ดูเพิ่มเติม</span>
                </p>
                <a-image class="rounded-lg p-1 !flex !justify-center"
                    :src="item?.report_group_image[0]?.report_image[0]?.image_path" />
            </template>
            <template #footer>
                <div class="py-1 flex items-center justify-between  gap-1 text-gray-400">
                    <div class="flex items-center gap-2">
                        <HeartFilled @click="toggleLike(item.id)"
                            :class="{ '!text-pink-600': item.me_like, 'animate-like': item.me_like }" />
                        <TmmLabelSmall :label="`${item.news_like_sum} คน`" />
                    </div>
                    <span v-if="item?.is_share_public" @click="openShareModal(item.id)" class="text-xs"><van-icon
                            name="share-o" />แชร์</span>
                </div>
                <!-- <div class="py-1 flex items-center gap-1 text-gray-400">
                    <TmmIcon icon="mdi mdi-comment-text-outline" />
                </div> -->


            </template>

        </TmmCard>

        <van-action-sheet v-model:show="showShareModal" title="แชร์ไปยัง">
            <div class="content px-5 py-10">
                <div class="flex flex-row gap-2">
                    <SocialShare network="facebook" :url="shareUrl" :styled="true" :label="false" />
                    <SocialShare network="line" :url="shareUrl" :styled="true" :label="false" />
                    <SocialShare network="twitter" :url="shareUrl" :styled="true" :label="false" />
                    <div class="bg-red-600 text-white px-2 cursor-pointer rounded-md"
                        @click="copyToClipboard(item?.id)">copy
                        url</div>
                </div>
            </div>
        </van-action-sheet>
        <TmmAlertToast :data="alertToast" :error="errorAlert" :dataError="dataError" />
    </section>
</template>

<script setup>
import DeferredContent from 'primevue/deferredcontent';
// import { format } from "date-fns";
import { format, parseISO } from 'date-fns';
import { th } from 'date-fns/locale';

const showMore = ref(false);

const toggleText = () => {
    showMore.value = !showMore.value;
};

function formattedDateBuddha(dateString) {
    const date = parseISO(dateString);
    const buddhistYear = date.getFullYear() + 543;
    const formattedDate = format(date, `d MMMM yyyy HH:mm:ss`, { locale: th });

    // แทนที่ปี ค.ศ. ด้วยปี พ.ศ.
    return formattedDate.replace(date.getFullYear().toString(), buddhistYear.toString());
}

const slidesPerViewMd = 6;
const slidesPerViewNormal = 3;

const slidesPerView = computed(() => {
    return window.innerWidth >= 768 ? slidesPerViewMd : slidesPerViewNormal;
});


//! /////// [Api Variable] /////////
import * as dataApi from './api/data.js'

const isloadingAxi = useState('isloadingAxi')

const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({});


onMounted(() => {
    mqttSub();
    appendDataPost()
    // loadPost()
})


const shareUrl = ref('')
const showShareModal = ref(false);
const openShareModal = async (id) => {
    shareUrl.value = `${window.location.origin}/public/news/${id}`
    showShareModal.value = true;
}


import { message } from 'ant-design-vue';
const copyToClipboard = (id) => {
    showShareModal.value = false;
    navigator.clipboard.writeText(shareUrl.value).then(() => {
        message.success('copy url success');
    }).catch(err => {
        message.error('copy url error');
        console.error('Failed to copy: ', err)
    })
}


const lastPost = ref();
const resPosts = ref([])
const appendDataPost = async () => {
    try {
        const payload = await {
            id: resPosts.value.map(post => post.id), // Map newsPost.id to an array
            per_page: 10
        };
        const res = await dataApi.getNewsLazy(payload)
        resPosts.value = [...resPosts.value, ...res.data.data]
        lastPost.value = resPosts.value.length
    } catch (error) {
        console.error(error);
    }
}

const toggleLike = async (postId) => {
    const post = resPosts.value.find(post => post.id === postId);
    if (!post) {
        console.error(`Post with id ${postId} not found.`);
        return;
    }
    try {
        const res = await dataApi.likeOrDislike({ report_id: postId });
        const { event_like, news_like_sum } = res.data.data;

        post.me_like = event_like === "like";
        post.news_like_sum = news_like_sum;
    } catch (error) {
        console.error(error);
    }
}

import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
const modules = [Pagination]

import { $mqtt } from 'vue-paho-mqtt';
const mqtt_pre = useRuntimeConfig().public.MQTT_PRE;

const mqttSub = async () => {
  $mqtt.subscribe(`${mqtt_pre}/news_update`, (message) => {
    // เมื่อมีการรับข้อมูลจาก mqtt
    const parsedMessage = JSON.parse(message);
    // console.log("parsedMessage", parsedMessage);
    errorAlert.value = false;
    alertToast.value = {
      severity: "success",
      summary: "ทำรายการสำเร็จ",
      detail: parsedMessage.massage,
    };
    // loadJobProcess()
  });
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    display: none;
}

.animate-like {
    animation: likeAnimation 0.5s ease-in-out;
}

@keyframes likeAnimation {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.2);
    }

    100% {
        transform: scale(1);
    }
}

.swiper {
    width: 100%;
    height: 100%;
}

.-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* .swiper-pagination-bullet-active {
    opacity: 1;
    opacity: var(--swiper-pagination-bullet-opacity, 1);
    background: #cc8084!important;
} */
</style>